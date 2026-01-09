import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const word = searchParams.get('word');
  const define = searchParams.get('define');
  const english = searchParams.get('english');

  if (!word || !define) {
    return new Response('Error: `word` と `define` パラメータを指定してください', { status: 400 });
  }

  const fontData = await fetch(
    new URL('https://github.com/googlefonts/noto-cjk/raw/main/Sans/OTF/Japanese/NotoSansCJKjp-Bold.otf')
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          padding: '80px',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontSize: 90,
            fontWeight: 700,
            fontFamily: '"Noto Sans JP"',
            color: '#2c3e50',
            marginBottom: 50,
            paddingBottom: 20,
            borderBottom: '8px solid #3498db',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          {word}
        </div>
        <div
          style={{
            fontSize: 45,
            fontFamily: '"Noto Sans JP"',
            color: '#2c3e50',
            textAlign: 'center',
            lineHeight: 1.6,
            maxWidth: '90%',
          }}
        >
          {define}
        </div>

        {english && (
          <div
            style={{
              fontSize: 30,
              fontFamily: '"Noto Sans JP"',
              color: '#7f8c8d',
              fontStyle: 'italic',
              textAlign: 'center',
              lineHeight: 1.5,
              marginTop: 30,
              maxWidth: '85%',
            }}
          >
            {english}
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 60,
            fontSize: 24,
            fontFamily: '"Noto Sans JP"',
            color: '#7f8c8d',
          }}
        >
          aruihayoru.github.io/PhantomWords
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans JP',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}