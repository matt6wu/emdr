import React from "react";
import { useTranslation } from "../../i18n";

export default function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: "👁️",
      title: t('landing.features.visual.title'),
      description: t('landing.features.visual.desc'),
      badge: t('landing.features.visual.badge'),
      isFree: true,
      color: "blue"
    },
    {
      icon: "🎧",
      title: t('landing.features.audio.title'),
      description: t('landing.features.audio.desc'),
      badge: t('landing.features.audio.badge'),
      isFree: true,
      color: "purple"
    },
    {
      icon: "🌍",
      title: t('landing.features.multilingual.title'),
      description: t('landing.features.multilingual.desc'),
      badge: t('landing.features.multilingual.badge'),
      isFree: true,
      color: "emerald"
    },
    {
      icon: "⚙️",
      title: t('landing.features.advanced.title'),
      description: t('landing.features.advanced.desc'),
      badge: t('landing.features.advanced.badge'),
      isFree: false,
      color: "orange"
    },
    {
      icon: "🎲",
      title: t('landing.features.randomize.title'),
      description: t('landing.features.randomize.desc'),
      badge: t('landing.features.randomize.badge'),
      isFree: false,
      color: "pink"
    },
    {
      icon: "📱",
      title: t('landing.features.responsive.title'),
      description: t('landing.features.responsive.desc'),
      badge: t('landing.features.responsive.badge'),
      isFree: true,
      color: "teal"
    }
  ];

  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    emerald: "from-emerald-500 to-emerald-600",
    orange: "from-orange-500 to-orange-600",
    pink: "from-pink-500 to-pink-600",
    teal: "from-teal-500 to-teal-600"
  };

  return (
    <section id="features" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t('landing.features.title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('landing.features.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border-2 border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Badge */}
              <div className="absolute top-4 right-4">
                {feature.isFree ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md">
                    ✓ {feature.badge}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md">
                    ⭐ {feature.badge}
                  </span>
                )}
              </div>

              {/* Icon with gradient background */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClasses[feature.color]} text-white text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 pr-20">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover accent line */}
              <div className={`mt-6 h-1 w-0 group-hover:w-16 bg-gradient-to-r ${colorClasses[feature.color]} rounded-full transition-all duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-4">
            {t('landing.features.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></span>
              Free Features
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500"></span>
              Premium Features
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
