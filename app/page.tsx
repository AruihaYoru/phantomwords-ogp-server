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
      alert('パラメータ "word" と "define" は必須です。');
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
  
  const handleCopy = (textToCopy) => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setFeedback('コピーしました！');
      setTimeout(() => setFeedback(''), 2000);
    });
  };

  const WarningBox = () => (
    <div style={{
      backgroundColor: '#fffbe5',
      border: '1px solid #ffc107',
      padding: '1rem',
      marginBottom: '1.5rem',
      borderRadius: '4px',
      color: '#664d03'
    }}>
      <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '8px', fontSize: '1.5rem' }}>⚠️</span>
        デバッグ／テスト用ポータル
      </h3>
      <p style={{ margin: 0 }}>
        このページは、OGP画像生成APIの内部テスト用です。入力されたパラメータは直接 <code>/api/og</code> エンドポイントに送信されます。もし誤ってこのページにアクセスした場合は、メインサイトにお戻りください。
      </p>
    </div>
  );

  return (
    <>
      <header className="site-header">
        <div className="header-content">
          <div className="header-top-row">
            <div className="logo">
              <h1>PhantomWords OGP :: デバッガー</h1>
              <p className="subtitle">/api/og エンドポイントテスター</p>
            </div>
            <nav className="header-nav-links">
              <a href="https://aruihayoru.github.io/PhantomWords/" target="_blank" rel="noopener noreferrer">
                メインサイトに戻る
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main id="main-content">
        <WarningBox />

        {/* APIリクエストビルダー */}
        <div className="word-card">
          <div className="word-header">
            <h2 className="word">APIリクエストビルダー</h2>
          </div>
          <div className="definition">
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="word-input" style={{ fontWeight: 'bold' }}>パラメータ: <code>word</code></label>
              <input
                id="word-input"
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="'word' パラメータの値を入力"
                style={{ borderRadius: '4px', width: '100%', marginTop: '0.5rem' }}
              />
              <small style={{ color: 'var(--color-text-light)' }}>エンコード後: <code>{encodeURIComponent(word)}</code></small>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="define-input" style={{ fontWeight: 'bold' }}>パラメータ: <code>define</code></label>
              <textarea
                id="define-input"
                value={define}
                onChange={(e) => setDefine(e.target.value)}
                placeholder="'define' パラメータの値を入力"
                rows={3}
                style={{ borderRadius: '4px', width: '100%', resize: 'vertical', marginTop: '0.5rem' }}
              />
              <small style={{ color: 'var(--color-text-light)' }}>エンコード後: <code>{encodeURIComponent(define)}</code></small>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="english-input" style={{ fontWeight: 'bold' }}>パラメータ: <code>english</code> (オプション)</label>
              <textarea
                id="english-input"
                value={english}
                onChange={(e) => setEnglish(e.target.value)}
                placeholder="'english' パラメータの値を入力"
                rows={2}
                style={{ borderRadius: '4px', width: '100%', resize: 'vertical', marginTop: '0.5rem' }}
              />
              <small style={{ color: 'var(--color-text-light)' }}>エンコード後: <code>{encodeURIComponent(english)}</code></small>
            </div>
            <button id="generate-button" onClick={handleGenerate} style={{ borderRadius: '4px', width: '100%', fontSize: '1.1rem', backgroundColor: 'var(--color-accent)', color: 'white' }}>
              実行して画像を生成
            </button>
          </div>
        </div>

        {/* 生成結果 */}
        {imageUrl && (
          <div className="word-card">
            <div className="word-header">
              <h2 className="word">生成結果</h2>
            </div>
            <div className="definition">
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="api-url-output" style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>生成されたAPIエンドポイントURL</label>
                <input 
                  id="api-url-output" 
                  type="text" 
                  value={imageUrl} 
                  readOnly 
                  style={{ borderRadius: '4px', width: '100%', backgroundColor: '#f8f9fa' }} 
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>画像プレビュー</label>
                <img src={imageUrl} alt="生成されたOGP画像" style={{ width: '100%', borderRadius: '4px', border: '1px solid var(--color-border)', minHeight: '100px', backgroundColor: '#eee' }} />
              </div>

              <div>
                <label htmlFor="share-url-output" style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>共有用ページのURL</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input 
                    id="share-url-output" 
                    type="text" 
                    value={shareUrl} 
                    readOnly 
                    style={{ borderRadius: '4px', width: '100%', backgroundColor: '#f8f9fa', flex: 1 }} 
                  />
                  <button className="share-button" title="URLをコピー" onClick={() => handleCopy(shareUrl)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-160v-480 480Z"/></svg>
                  </button>
                  {feedback && <div className="share-feedback" style={{ right: '50px' }}>{feedback}</div>}
                </div>
              </div>

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