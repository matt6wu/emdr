// Cloudflare Pages Function: POST /api/activate
// 激活码通过 Pages 项目的 CODES 环境变量注入（逗号/空白分隔），不进入公开仓库

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });

export async function onRequest({ request, env }) {
  if (request.method !== "POST") {
    return json({ ok: false, error: "method_not_allowed" }, 405);
  }

  let body = null;
  try {
    body = await request.json();
  } catch {
    body = null;
  }

  const code = String(body?.code || "").trim().toUpperCase();
  if (!code) {
    return json({ ok: false, error: "missing_code" }, 400);
  }

  const codes = new Set(
    String(env.CODES || "")
      .split(/[\s,]+/)
      .map((v) => v.trim().toUpperCase())
      .filter(Boolean)
  );

  return json({ ok: codes.has(code) });
}
