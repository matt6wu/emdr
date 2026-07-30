import React from "react";
import { useTranslation } from "../../i18n";
import Icon from "./icons.jsx";

export default function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: "eye",
      title: t('landing.features.visual.title'),
      description: t('landing.features.visual.desc'),
      badge: t('landing.features.visual.badge'),
      isFree: true
    },
    {
      icon: "speaker",
      title: t('landing.features.audio.title'),
      description: t('landing.features.audio.desc'),
      badge: t('landing.features.audio.badge'),
      isFree: true
    },
    {
      icon: "globe",
      title: t('landing.features.multilingual.title'),
      description: t('landing.features.multilingual.desc'),
      badge: t('landing.features.multilingual.badge'),
      isFree: true
    },
    {
      icon: "sliders",
      title: t('landing.features.advanced.title'),
      description: t('landing.features.advanced.desc'),
      badge: t('landing.features.advanced.badge'),
      isFree: false
    },
    {
      icon: "refresh",
      title: t('landing.features.randomize.title'),
      description: t('landing.features.randomize.desc'),
      badge: t('landing.features.randomize.badge'),
      isFree: false
    },
    {
      icon: "device",
      title: t('landing.features.responsive.title'),
      description: t('landing.features.responsive.desc'),
      badge: t('landing.features.responsive.badge'),
      isFree: true
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-medium tracking-widest uppercase text-brand-700 mb-3">
            {t('landing.features.kicker')}
          </p>
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-stone-900 mb-4">
            {t('landing.features.title')}
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            {t('landing.features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-7 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Badge */}
              <span
                className={`absolute top-5 right-5 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  feature.isFree
                    ? 'bg-brand-50 text-brand-700 border border-brand-100'
                    : 'bg-amber-50 text-amber-700 border border-amber-100'
                }`}
              >
                {feature.badge}
              </span>

              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 ${
                  feature.isFree ? 'bg-brand-50 text-brand-700' : 'bg-amber-50 text-amber-600'
                }`}
              >
                <Icon name={feature.icon} className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-semibold text-stone-900 mb-2 pr-16">
                {feature.title}
              </h3>

              <p className="text-stone-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
