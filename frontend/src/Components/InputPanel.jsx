import React from 'react';
import './InputPanel.css';

const InputPanel = ({ value, onChange, language, onClear }) => {
  const getPlaceholder = () => {
    return language === 'en' 
      ? 'Enter text in English...'
      : 'हिंदी में लिखें...';
  };

  const getCharacterCount = () => {
    return value.length;
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="input-panel">
      <div className="panel-header">
        <div className="header-left">
          <span className="language-badge">
            {language === 'en' ? 'EN' : 'हिं'}
          </span>
          <span className="panel-title">
            {language === 'en' ? 'Input (English)' : 'इनपुट (हिंदी)'}
          </span>
        </div>
        <div className="header-right">
          <button 
            className="clear-button"
            onClick={handleClear}
            disabled={!value}
            aria-label="Clear text"
          >
            ✕ Clear
          </button>
        </div>
      </div>
      
      <textarea
        className="input-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={getPlaceholder()}
        rows={8}
      />
      
      <div className="panel-footer">
        <div className="character-count">
          {getCharacterCount()} characters
        </div>
      </div>
    </div>
  );
};

export default InputPanel;