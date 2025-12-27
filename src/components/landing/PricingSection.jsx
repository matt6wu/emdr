import React from "react";
import { useTranslation } from "../../i18n";

export default function PricingSection({ enterTool }) {
  const { t } = useTranslation();

  const plans = [
    {
      name: t('landing.pricing.free.name'),
      badge: t('landing.pricing.free.badge'),
      price: t('landing.pricing.free.price'),
      period: t('landing.pricing.free.period'),
      cta: t('landing.pricing.free.cta'),
      features: t('landing.pricing.free.features'),
      highlighted: true,
      gradient: "from-emerald-500 to-teal-500",
      onClick: enterTool
    },
    {
      name: t('landing.pricing.premium.name'),
      badge: t('landing.pricing.premium.badge'),
      price: t('landing.pricing.premium.price'),
      period: t('landing.pricing.premium.period'),
      cta: t('landing.pricing.premium.cta'),
      features: t('landing.pricing.premium.features'),
      highlighted: false,
      gradient: "from-orange-500 to-amber-500",
      onClick: enterTool // In production, this would link to payment
    }
  ];

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t('landing.pricing.title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t('landing.pricing.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 shadow-2xl lg:scale-105'
                  : 'bg-white border-2 border-slate-200 shadow-lg'
              } transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
            >
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${plan.gradient} text-white shadow-lg`}>
                  ⭐ {plan.badge}
                </span>
              </div>

              {/* Plan Name */}
              <div className="text-center mt-4 mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline justify-center gap-2">
                  <span className={`text-5xl font-extrabold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                    {plan.price}
                  </span>
                </div>
                <p className="text-slate-500 mt-2">{plan.period}</p>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className={`w-6 h-6 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-emerald-500' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={plan.onClick}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  plan.highlighted
                    ? `bg-gradient-to-r ${plan.gradient} text-white`
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-lg text-slate-600">
            <span className="font-semibold">{t('landing.pricing.comparison')}</span>
          </p>
          <p className="text-sm text-slate-500">
            {t('landing.pricing.guarantee')}
          </p>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
            <div className="flex items-center gap-2 text-slate-600">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 9.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm6 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM10 13a3 3 0 01-2.83-2h5.66A3 3 0 0110 13z" />
              </svg>
              <span className="text-sm">No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Instant Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
