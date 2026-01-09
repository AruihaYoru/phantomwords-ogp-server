import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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
  
  const url = new URL('https://aruihayoru.github.io/PhantomWords/');

  url.searchParams.set('word', String(params.word || ''));
  url.searchParams.set('define', String(params.define || ''));

  const english = String(params.english || '');
  if (english) {
    url.searchParams.set('english', english);
  }
  
  redirect(url.toString());

  return null;
}