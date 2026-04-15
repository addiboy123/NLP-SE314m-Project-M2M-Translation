import React from 'react';
import './LanguageTab.css';

const LanguageTab = ({ sourceLang, targetLang }) => {
  const getLanguageName = (code) => {
    return code === 'en' ? 'ENGLISH' : 'हिंदी';
  };

  return (
    <div className="language-tabs">
      <div className="tabs-container">

        <div className={`tab source-tab ${sourceLang === 'en' ? 'active-en' : 'active-hi'}`}>
          <span className="tab-label">From</span>
          <span className="tab-language">{getLanguageName(sourceLang)}</span>
        </div>
        
        <div className="tab-arrow">→</div>
        
        <div className={`tab target-tab ${targetLang === 'hi' ? 'active-hi' : 'active-en'}`}>
          <span className="tab-label">To</span>
          <span className="tab-language">{getLanguageName(targetLang)}</span>
        </div>
        
      </div>
    </div>
  );
};

export default LanguageTab;