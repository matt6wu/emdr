import React from "react";
import { useTranslation } from "../../i18n";
import Icon from "./icons.jsx";

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
      highlighted: false,
      onClick: enterTool
    },
    {
      name: t('landing.pricing.premium.name'),
      badge: t('landing.pricing.premium.badge'),
      price: t('landing.pricing.premium.price'),
      period: t('landing.pricing.premium.period'),
      cta: t('landing.pricing.premium.cta'),
      features: t('landing.pricing.premium.features'),
      highlighted: true,
      onClick: enterTool // In production, this would link to payment
    }
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-medium tracking-widest uppercase text-brand-700 mb-3">
            {t('landing.pricing.kicker')}
          </p>
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-stone-900 mb-4">
            {t('landing.pricing.title')}
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            {t('landing.pricing.subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 flex flex-col ${
                plan.highlighted
                  ? 'bg-brand-950 text-white shadow-xl'
                  : 'bg-white border border-stone-200/80 shadow-sm'
              }`}
            >
              {/* Badge */}
              <span
                className={`absolute top-6 right-6 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  plan.highlighted
                    ? 'bg-brand-300/20 text-brand-200 border border-brand-300/30'
                    : 'bg-stone-100 text-stone-600 border border-stone-200'
                }`}
              >
                {plan.badge}
              </span>

              {/* Plan Name & Price */}
              <div className="mb-8">
                <h3 className={`text-lg font-medium mb-4 ${plan.highlighted ? 'text-brand-200' : 'text-stone-600'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl font-semibold tracking-tight ${plan.highlighted ? 'text-white' : 'text-stone-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlighted ? 'text-brand-200/70' : 'text-stone-500'}`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3.5 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      className={`flex-shrink-0 mt-0.5 flex items-center justify-center w-5 h-5 rounded-full ${
                        plan.highlighted ? 'bg-brand-300/20 text-brand-300' : 'bg-brand-50 text-brand-700'
                      }`}
                    >
                      <Icon name="check" className="w-3 h-3" strokeWidth={2.5} />
                    </span>
                    <span className={`text-sm ${plan.highlighted ? 'text-brand-50/90' : 'text-stone-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={plan.onClick}
                className={`mt-auto w-full py-3.5 rounded-full font-medium transition-colors ${
                  plan.highlighted
                    ? 'bg-white text-brand-900 hover:bg-brand-50'
                    : 'bg-stone-900 text-white hover:bg-stone-700'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <p className="mt-12 text-center text-stone-500 text-sm">
          {t('landing.pricing.comparison')}
        </p>
      </div>
    </section>
  );
}
