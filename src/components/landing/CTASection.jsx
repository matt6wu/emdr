import React from 'react';
import { useTranslation } from '../../i18n';

export default function CTASection({ enterTool }) {
  const { t } = useTranslation();
  return <section className="rest-cta">
    <div className="rest-eyebrow">TAKE YOUR TIME</div>
    <h2>{t('landing.cta.title')}</h2>
    <p>{t('landing.cta.subtitle')}</p>
    <button onClick={enterTool} className="rest-primary">{t('landing.cta.button')} <span aria-hidden="true">↗</span></button>
    <small>{t('landing.cta.note')}</small>
  </section>;
}
