import type { Metadata } from 'next';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined } | Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;

  const word = String(params.word || '単語なし');
  const define = String(params.define || '定義なし');
  const english = String(params.english || '');

  const imageUrlParams = new URLSearchParams();
  imageUrlParams.set('word', word);
  imageUrlParams.set('define', define);
  if (english) {
    imageUrlParams.set('english', english);
  }
  
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  const imageUrl = `${baseUrl}/api/og?${imageUrlParams.toString()}`;

  return {
    title: `Phantom Words: ${word}`,
    description: define,
    openGraph: {
      title: `Phantom Words: ${word}`,
      description: define,
      images: [imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Phantom Words: ${word}`,
      description: define,
      images: [imageUrl],
    }
  };
}

export default async function SharePage({ searchParams }: Props) {
  const params = await searchParams;

  const word = String(params.word || '単語なし');
  const define = String(params.define || '定義なし');
  const english = String(params.english || '');

  const redirectUrl = new URL('https://aruihayoru.github.io/PhantomWords/');
  redirectUrl.searchParams.set('word', word);
  redirectUrl.searchParams.set('define', define);
  if (english) {
    redirectUrl.searchParams.set('english', english);
  }

  return (
    <main style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      padding: '2rem',
      boxSizing: 'border-box',
      fontFamily: 'sans-serif',
      color: '#2c3e50',
    }}>

      <div style={{
        fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
        fontWeight: 700,
        color: '#2c3e50',
        marginBottom: '2.5rem',
        paddingBottom: '1rem',
        borderBottom: '6px solid #3498db',
        textAlign: 'center',
        lineHeight: 1.2,
      }}>
        {word}
      </div>

      <div style={{
        fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
        color: '#2c3e50',
        textAlign: 'center',
        lineHeight: 1.6,
        maxWidth: '900px',
        marginBottom: '1.5rem',
      }}>
        {define}
      </div>

      {english && (
        <div style={{
          fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
          color: '#7f8c8d',
          fontStyle: 'italic',
          textAlign: 'center',
          lineHeight: 1.5,
          maxWidth: '850px',
          marginBottom: '2rem',
        }}>
          {english}
        </div>
      )}

      <a
        href={redirectUrl.toString()}
        style={{
          display: 'inline-block',
          marginTop: '2rem',
          padding: '1rem 2.5rem',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#ffffff',
          backgroundColor: '#3498db',
          textDecoration: 'none',
          borderRadius: '8px',
          transition: 'transform 0.2s ease, background-color 0.2s ease',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        }}
      >
        PhantomWordsでこの単語を見る
      </a>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '30px',
        fontSize: '0.9rem',
        color: '#7f8c8d',
      }}>
        aruihayoru.github.io/PhantomWords
      </div>
    </main>
  );
}