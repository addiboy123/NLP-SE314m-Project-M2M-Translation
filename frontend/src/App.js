import React, { useState } from 'react';
import './App.css'; 
import Header from './Header';
import Footer from './Footer';
import TranslatorContainer from './Components/TranslatorContainer';

function App() {
  return (
    <div className="app">
      <Header title="Translator" />
      <main className="main-content">
        <TranslatorContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;