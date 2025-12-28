import React from "react";
import { useTranslation } from "../../i18n";

export default function StudioDifferenceSection() {
  const { t } = useTranslation();

  const comparisons = [
    {
      icon: "🎛️",
      studioFeature: t('landing.studioDifference.customization.studio'),
      regularEMDR: t('landing.studioDifference.customization.regular'),
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: "🎲",
      studioFeature: t('landing.studioDifference.randomization.studio'),
      regularEMDR: t('landing.studioDifference.randomization.regular'),
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: "🎧",
      studioFeature: t('landing.studioDifference.multiSensory.studio'),
      regularEMDR: t('landing.studioDifference.multiSensory.regular'),
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: "🏠",
      studioFeature: t('landing.studioDifference.accessibility.studio'),
      regularEMDR: t('landing.studioDifference.accessibility.regular'),
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: "💰",
      studioFeature: t('landing.studioDifference.cost.studio'),
      regularEMDR: t('landing.studioDifference.cost.regular'),
      gradient: "from-amber-500 to-yellow-600"
    },
    {
      icon: "🔬",
      studioFeature: t('landing.studioDifference.technology.studio'),
      regularEMDR: t('landing.studioDifference.technology.regular'),
      gradient: "from-cyan-500 to-blue-600"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold shadow-lg">
            <span className="mr-2">✨</span>
            {t('landing.studioDifference.badge')}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t('landing.studioDifference.title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('landing.studioDifference.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {comparisons.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-transparent overflow-hidden"
            >
              {/* Gradient border effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

              {/* Icon */}
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Studio Feature */}
              <div className="mb-4">
                <div className="flex items-start gap-2 mb-2">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center mt-0.5`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold text-transparent bg-clip-text bg-gradient-to-r ${item.gradient} text-sm mb-1`}>
                      REM Restore Studio™
                    </p>
                    <p className="text-slate-800 leading-relaxed">
                      {item.studioFeature}
                    </p>
                  </div>
                </div>
              </div>

              {/* Regular EMDR */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-500 text-sm mb-1">
                      {t('landing.studioDifference.regularLabel')}
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      {item.regularEMDR}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-6 rounded-2xl border-2 border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl shadow-lg">
                🚀
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 text-lg">
                  {t('landing.studioDifference.ctaTitle')}
                </p>
                <p className="text-sm text-slate-600">
                  {t('landing.studioDifference.ctaSubtitle')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
