import React from "react";
import { useTranslation } from "../../i18n";
import Icon from "./icons.jsx";

export default function EducationSection() {
  const { t } = useTranslation();

  const cards = [
    {
      icon: "book",
      title: t('landing.education.whatTitle'),
      description: t('landing.education.whatDesc')
    },
    {
      icon: "arrows",
      title: t('landing.education.howTitle'),
      description: t('landing.education.howDesc')
    },
    {
      icon: "heart",
      title: t('landing.education.whoTitle'),
      description: t('landing.education.whoDesc')
    }
  ];

  return (
    <section id="education" className="py-20 lg:py-28 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-medium tracking-widest uppercase text-brand-700 mb-3">
            {t('landing.education.kicker')}
          </p>
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-stone-900">
            {t('landing.education.title')}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 text-brand-700 mb-6">
                <Icon name={card.icon} className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                {card.title}
              </h3>

              <p className="text-stone-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
