import React from "react";
import { useTranslation } from "../../i18n";

export default function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonials = [
    {
      quote: t('landing.testimonials.testimonial1.quote'),
      name: t('landing.testimonials.testimonial1.name'),
      location: t('landing.testimonials.testimonial1.location'),
      avatar: "🇺🇸",
      rating: 5,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      quote: t('landing.testimonials.testimonial2.quote'),
      name: t('landing.testimonials.testimonial2.name'),
      location: t('landing.testimonials.testimonial2.location'),
      avatar: "🇨🇳",
      rating: 5,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      quote: t('landing.testimonials.testimonial3.quote'),
      name: t('landing.testimonials.testimonial3.name'),
      location: t('landing.testimonials.testimonial3.location'),
      avatar: "🇬🇧",
      rating: 5,
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  const StarRating = ({ rating }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-slate-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t('landing.testimonials.title')}
          </h2>
          <p className="text-xl text-slate-600">
            {t('landing.testimonials.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border-2 border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Gradient accent on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

              {/* Quote Icon */}
              <div className="relative mb-6">
                <svg className="w-12 h-12 text-slate-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Rating */}
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* Quote */}
              <blockquote className="relative text-slate-700 leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                {/* Avatar */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                  {testimonial.avatar}
                </div>

                {/* Name and Location */}
                <div>
                  <div className="font-semibold text-slate-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-500">
                    {testimonial.location}
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.gradient} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-full border border-slate-200">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-white flex items-center justify-center text-sm">
                🇺🇸
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-white flex items-center justify-center text-sm">
                🇨🇳
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 border-2 border-white flex items-center justify-center text-sm">
                🇬🇧
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 border-2 border-white flex items-center justify-center text-sm">
                🌍
              </div>
            </div>
            <span className="text-slate-600 font-medium">
              Trusted by users worldwide
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
