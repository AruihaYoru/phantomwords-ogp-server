"use client";

import { useState } from 'react';

export default function HomePage() {
  const [word, setWord] = useState('Shippinuendo');
  const [define, setDefine] = useState('税金を課す；査定する。税金；査定。');
  const [english, setEnglish] = useState('To lay a tax upon; to assess. A tax; an assessment.');
  const [imageUrl, setImageUrl] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleGenerate = () => {
    if (!word || !define) {
      alert('単語と定義の両方を入力してください。');
      return;
    }
    const encodedWord = encodeURIComponent(word);
    const encodedDefine = encodeURIComponent(define);
    
    let apiUrl = `/api/og?word=${encodedWord}&define=${encodedDefine}`;
    if (english) {
      apiUrl += `&english=${encodeURIComponent(english)}`;
    }
    setImageUrl(apiUrl);

    let pageUrl = `${window.location.origin}/share?word=${encodedWord}&define=${encodedDefine}`;
    if (english) {
      pageUrl += `&english=${encodeURIComponent(english)}`;
    }
    setShareUrl(pageUrl);
  };
  
  const handleCopy = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setFeedback('コピーしました！');
      setTimeout(() => setFeedback(''), 2000);
    });
  };

  return (
    <>
      <header className="site-header">
        <div className="header-content">
          <div className="header-top-row">
            <div className="logo">
              <h1>PhantomWords OGP Generator</h1>
              <p className="subtitle">PhantomWords debug</p>
            </div>
            <nav className="header-nav-links">
              <a href="https://aruihayoru.github.io/PhantomWords/" target="_blank" rel="noopener noreferrer">
                PhantomWords
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main id="main-content">
        <div className="word-card">
          <div className="word-header">
            <h2 className="word">Debug</h2>
          </div>
		  <p>もしあなたが意図せずこのページに来てしまった場合、今すぐ元のページに戻ってください。ここはデバッグ／テスト用ポータルです。</p>
          <div className="definition">
            <div style={{ marginBottom: '1rem' }}>
              <input
                id="search-input"
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Words enter here...."
                style={{ borderRadius: '4px', width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <textarea
                id="search-input"
                value={define}
                onChange={(e) => setDefine(e.target.value)}
                placeholder="Define enter here...."
                rows={3}
                style={{ borderRadius: '4px', width: '100%', resize: 'vertical' }}
              />
            </div>
            <div>
              <label htmlFor="english-input" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                原文 (Original Text) - オプション
              </label>
              <textarea
                id="english-input"
                value={english}
                onChange={(e) => setEnglish(e.target.value)}
                placeholder="げんぶん enter here..."
                rows={2}
                style={{ borderRadius: '4px', width: '100%', resize: 'vertical' }}
              />
            </div>
            <button id="search-button" onClick={handleGenerate} style={{ borderRadius: '4px', width: '100%', marginTop: '1rem', fontSize: '1.1rem' }}>
              OGP画像を生成
            </button>
          </div>
        </div>

        {imageUrl && (
          <div className="word-card">
            <div className="word-header">
              <h2 className="word">シェア</h2>
              <div style={{ position: 'relative' }}>
                <button className="share-button" title="コピー" onClick={handleCopy}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 22q-1.25 0-2.125-.875T15 19q0-.175.025-.363t.075-.337L7.2 13.4q-.425.35-.95.55T5 14q-1.25 0-2.125-.875T2 11q0-1.25.875-2.125T5 8q1.05 0 1.9.6L14.8 3.7q-.05-.15-.075-.337T14.7 3q0-1.25.875-2.125T17.7 0q1.25 0 2.125.875T20.7 3q0 1.25-.875 2.125T17.7 6q-1.05 0-1.9-.6L8 10.3q.05.15.075.338T8.1 11q0 .175-.025.363t-.075.337l7.9 4.9q.85-.6 1.9-.6q1.25 0 2.125.875T20.7 19q0 1.25-.875 2.125T17.7 22Z"/></svg>
                </button>
                {feedback && <div className="share-feedback">{feedback}</div>}
              </div>
            </div>
            <div className="definition">
              <img src={imageUrl} alt="" style={{ width: '100%', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
              <p style={{ marginTop: '1.5rem' }}><strong>シェア用URL:</strong></p>
              <input 
                id="search-input" 
                type="text" 
                value={shareUrl} 
                readOnly 
                style={{ borderRadius: '4px', width: '100%', backgroundColor: '#f8f9fa' }} 
              />
            </div>
          </div>
        )}
      </main>

      <footer className="site-footer">
        <p><a href="https://github.com/AruihaYoru/phantomwords-ogp-server" target="_blank" rel="noopener noreferrer">GitHub Repository</a></p>
      </footer>
    </>
  );
}