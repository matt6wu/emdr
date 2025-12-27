import { DEFAULT_CODES } from "./codes.js";

const buildCodeSet = (env) => {
  const set = new Set(DEFAULT_CODES);
  const extra = env?.CODES || "";
  if (!extra) return set;
  extra
    .split(/[\s,]+/)
    .map((v) => v.trim().toUpperCase())
    .filter(Boolean)
    .forEach((code) => set.add(code));
  return set;
};

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...headers
    }
  });

const withCors = (res) => {
  const headers = new Headers(res.headers);
  headers.set("access-control-allow-origin", "*");
  headers.set("access-control-allow-methods", "POST, OPTIONS");
  headers.set("access-control-allow-headers", "content-type");
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return withCors(new Response(null, { status: 204 }));
    }

    const url = new URL(request.url);
    if (url.pathname !== "/api/activate") {
      return withCors(json({ ok: false, error: "not_found" }, 404));
    }

    if (request.method !== "POST") {
      return withCors(json({ ok: false, error: "method_not_allowed" }, 405));
    }

    let body = null;
    try {
      body = await request.json();
    } catch {
      body = null;
    }

    const rawCode = String(body?.code || "");
    const code = rawCode.trim().toUpperCase();

    if (!code) {
      return withCors(json({ ok: false, error: "missing_code" }, 400));
    }

    const codeSet = buildCodeSet(env);
    const ok = codeSet.has(code);

    return withCors(json({ ok }));
  }
};
