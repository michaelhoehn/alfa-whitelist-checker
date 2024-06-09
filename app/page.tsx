import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Check airdrop status',
    },
    {
      action: 'link',
      label: 'Subscribe to cmplx',
      target: 'https://www.alfafrens.com/channel/0x8a2e9ee84aaaa7f542accb937130fffab4762668',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/main.png`,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'cmplx alfafrens',
  description: "check to see if you're on the list",
  openGraph: {
    title: 'cmplx alfafrens',
    description: "check to see if you're on the list",
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>cmplx.eth</h1>
    </>
  );
}
