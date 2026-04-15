import React, { useState, useEffect } from 'react';
import LanguageTabs from './LanguageTab';
import FlipButton from './FlipButton';
import InputPanel from './InputPanel';
import OutputPanel from './OutputPanel';
import './TranslatorContainer.css'; 

const TranslatorContainer = () => {
  const [sourceLang, setSourceLang] = useState('en'); 
  const [targetLang, setTargetLang] = useState('hi'); 
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const translateText = async (text, from, to) => {
    if (!text.trim()) {
      setOutputText('');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (from === 'en' && to === 'hi') {
        const mockHindi = {
          'hello': 'नमस्ते',
          'how are you': 'आप कैसे हैं',
          'good morning': 'सुप्रभात',
          'good night': 'शुभ रात्रि',
          'thank you': 'धन्यवाद',
          'welcome': 'स्वागत है'
        };
        return mockHindi[text.toLowerCase()] || `[Hindi: ${text}]`;
      } else {
        const mockEnglish = {
          'नमस्ते': 'Hello',
          'आप कैसे हैं': 'How are you',
          'सुप्रभात': 'Good morning',
          'शुभ रात्रि': 'Good night',
          'धन्यवाद': 'Thank you',
          'स्वागत है': 'Welcome'
        };
        return mockEnglish[text] || `[English: ${text}]`;
      }
      
    } 
    catch (err) {
      setError('Translation failed. Please try again.');
      return '';
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (inputText) {
        translateText(inputText, sourceLang, targetLang).then(result => {
          setOutputText(result);
          setIsLoading(false);
        });
      } else {
        setOutputText('');
        setIsLoading(false);
      }
    }, 500); 

    return () => clearTimeout(delay);
  }, [inputText, sourceLang, targetLang]);

  const handleFlip = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    setInputText(outputText);
    setOutputText(inputText);
    setError('');
  };

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError('');
  };

  return (
    <div className="translator-container">
      <LanguageTabs 
        sourceLang={sourceLang}
        targetLang={targetLang}
      />
      
      <div className="translation-area">
        <div className="panel-wrapper left-panel">
          <InputPanel 
            value={inputText}
            onChange={handleInputChange}
            language={sourceLang}
            onClear={handleClear}
          />
        </div>
        
        <div className="flip-button-overlay">
          <FlipButton onFlip={handleFlip} />
        </div>
        
        <div className="panel-wrapper right-panel">
          <OutputPanel 
            text={outputText}
            isLoading={isLoading}
            language={targetLang}
          />
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default TranslatorContainer;