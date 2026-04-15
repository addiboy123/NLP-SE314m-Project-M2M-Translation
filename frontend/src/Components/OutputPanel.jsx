import React, { useState } from 'react';
import './OutputPanel.css';

const OutputPanel = ({ text, isLoading, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } 
    catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="output-panel">
      <div className="panel-header">
        <div className="header-left">
          <span className="language-badge">
            {language === 'en' ? 'EN' : 'हिं'}
          </span>
          <span className="panel-title">
            {language === 'en' ? 'Output (English)' : 'इनपुट (हिंदी)'}
          </span>
        </div>
        <div className="header-right">
          {text && (
            <>
              <button 
                className={`copy-button ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
                aria-label="Copy to clipboard"
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="output-content">
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Translating...</p>
          </div>
        ) : text ? (
          <div className="output-text">
            {text}
          </div>
        ) : (
          <div className="empty-state">
            <p className="empty-text">
              Translation will appear here
            </p>
          </div>
        )}
      </div>
      
      <div className="panel-footer">
        <div className="output-stats">
          {(
            <>
              <span>{text.length} characters</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutputPanel;