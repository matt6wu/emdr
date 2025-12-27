import React from "react";
import { useTranslation } from "../../i18n";

export default function EducationSection() {
  const { t } = useTranslation();

  const cards = [
    {
      icon: "🧠",
      title: t('landing.education.whatTitle'),
      description: t('landing.education.whatDesc'),
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "⚡",
      title: t('landing.education.howTitle'),
      description: t('landing.education.howDesc'),
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "💚",
      title: t('landing.education.whoTitle'),
      description: t('landing.education.whoDesc'),
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section id="education" className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t('landing.education.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-transparent hover:-translate-y-2"
            >
              {/* Gradient border effect on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`}></div>

              {/* Icon */}
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed">
                {card.description}
              </p>

              {/* Bottom accent */}
              <div className={`mt-6 h-1 w-16 bg-gradient-to-r ${card.gradient} rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Bottom info */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            {t('landing.education.whoDesc').includes('WHO') && (
              <span className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-blue-700 font-medium">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                WHO & Major Health Organizations Recognized
              </span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
