import React from 'react';
import { useTranslation } from '../../i18n';
import CalmPreview from '../CalmPreview';

export default function HeroSection({ enterTool }) {
  const { t } = useTranslation();
  return <section className="rest-hero">
    <div className="rest-hero-inner">
      <div className="rest-hero-copy">
        <p className="rest-eyebrow">A LITTLE ROOM TO REST</p>
        <p className="rest-kicker"><span />{t('landing.hero.kicker')}</p>
        <h1>{t('landing.hero.headline')}</h1>
        <p className="rest-hero-description">{t('landing.hero.subheadline')}</p>
        <div className="rest-hero-actions">
          <button onClick={enterTool} className="rest-primary">{t('landing.hero.ctaPrimary')} <span aria-hidden="true">↗</span></button>
          <button onClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })} className="rest-secondary">{t('landing.hero.ctaSecondary')}</button>
        </div>
        <p className="rest-footnote">{t('landing.hero.noCreditCard')}</p>
      </div>
      <div className="rest-hero-visual">
        <div className="rest-visual-top"><span>REM RESTORE STUDIO</span><span>01 / BILATERAL</span></div>
        <CalmPreview label={t('guided.previewTitle')} caption={t('landing.hero.previewLabel')} />
        <p className="rest-visual-note">{t('guided.previewNote')}</p>
      </div>
    </div>
    <div className="rest-crosslink"><span>{t('guided.breathingPrompt')}</span><a href="https://heal.mattlu.com/breathe">{t('guided.breathingLink')} ↗</a></div>
  </section>;
}
