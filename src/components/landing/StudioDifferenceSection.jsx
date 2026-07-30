import React from "react";
import { useTranslation } from "../../i18n";
import Icon from "./icons.jsx";

export default function StudioDifferenceSection() {
  const { t } = useTranslation();

  const comparisons = [
    {
      icon: "sliders",
      studioFeature: t('landing.studioDifference.customization.studio'),
      regularEMDR: t('landing.studioDifference.customization.regular')
    },
    {
      icon: "refresh",
      studioFeature: t('landing.studioDifference.randomization.studio'),
      regularEMDR: t('landing.studioDifference.randomization.regular')
    },
    {
      icon: "speaker",
      studioFeature: t('landing.studioDifference.multiSensory.studio'),
      regularEMDR: t('landing.studioDifference.multiSensory.regular')
    },
    {
      icon: "home",
      studioFeature: t('landing.studioDifference.accessibility.studio'),
      regularEMDR: t('landing.studioDifference.accessibility.regular')
    },
    {
      icon: "wallet",
      studioFeature: t('landing.studioDifference.cost.studio'),
      regularEMDR: t('landing.studioDifference.cost.regular')
    },
    {
      icon: "chip",
      studioFeature: t('landing.studioDifference.technology.studio'),
      regularEMDR: t('landing.studioDifference.technology.regular')
    }
  ];

  return (
    <section id="studio-difference" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-medium tracking-widest uppercase text-brand-700 mb-3">
            {t('landing.studioDifference.badge')}
          </p>
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-stone-900 mb-4">
            {t('landing.studioDifference.title')}
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            {t('landing.studioDifference.subtitle')}
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand-50 text-brand-700 mb-5">
                <Icon name={item.icon} className="w-6 h-6" />
              </div>

              {/* Studio Feature */}
              <div className="flex items-start gap-2.5 mb-4">
                <span className="flex-shrink-0 mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-brand-700 text-white">
                  <Icon name="check" className="w-3 h-3" strokeWidth={2.5} />
                </span>
                <div className="flex-1">
                  <p className="font-medium text-brand-700 text-xs tracking-wide uppercase mb-1">
                    REM Restore Studio
                  </p>
                  <p className="text-stone-800 text-sm leading-relaxed">
                    {item.studioFeature}
                  </p>
                </div>
              </div>

              {/* Regular EMDR */}
              <div className="pt-4 mt-auto border-t border-stone-100">
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-stone-200 text-stone-500">
                    <Icon name="minus" className="w-3 h-3" strokeWidth={2.5} />
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-stone-400 text-xs tracking-wide uppercase mb-1">
                      {t('landing.studioDifference.regularLabel')}
                    </p>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      {item.regularEMDR}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
