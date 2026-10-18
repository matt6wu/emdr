import React from 'react';

export default function CalmPreview({ label, caption, animated = true }) {
  return <div className={`calm-preview ${animated ? 'calm-preview-animated' : ''}`} aria-hidden="true">
    <div className="calm-orbit calm-orbit-outer" />
    <div className="calm-orbit calm-orbit-inner" />
    <div className="calm-sphere" />
    <div className="calm-track"><span className="calm-track-dot" /></div>
    <div className="calm-preview-label">{label}</div>
    {caption && <div className="calm-preview-caption">{caption}</div>}
  </div>;
}
