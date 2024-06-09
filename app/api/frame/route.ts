import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();

  // Log the incoming request body
  // console.log('Request body:', JSON.stringify(body));

  try {
    const { isValid, message } = await getFrameMessage(body, {
      neynarApiKey: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
      // allowFramegear: true, // Enable Framegear for testing
    });

    // Log the response from getFrameMessage
    // console.log('Frame message response:', JSON.stringify({ isValid, message }));

    if (!isValid) {
      return new NextResponse('Message not valid', { status: 500 });
    }

    const fid = message.interactor.fid;
    const channelAddress = '0x8a2e9ee84aaaa7f542accb937130fffab4762668';

    if (message?.button === 1) {
      // Check status button
      const response = await fetch(
        `https://alfafrens.com/api/v0/isUserByFidSubscribedToChannel?channelAddress=${channelAddress}&fid=${fid}`,
      );
      const data = await response.json();

      if (data.isSubscribed) {
        return new NextResponse(
          getFrameHtmlResponse({
            buttons: [
              {
                action: 'link',
                label: 'Subscribe to cmplx',
                target:
                  'https://www.alfafrens.com/channel/0x8a2e9ee84aaaa7f542accb937130fffab4762668',
              },
            ],
            image: {
              src: `${NEXT_PUBLIC_URL}/verified.png`,
            },
            postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
          }),
        );
      } else {
        return new NextResponse(
          getFrameHtmlResponse({
            buttons: [
              {
                action: 'link',
                label: 'Subscribe to cmplx',
                target:
                  'https://www.alfafrens.com/channel/0x8a2e9ee84aaaa7f542accb937130fffab4762668',
              },
            ],
            image: {
              src: `${NEXT_PUBLIC_URL}/not_verified.png`,
            },
            postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
          }),
        );
      }
    }

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'State: 0',
          },
          {
            action: 'link',
            label: 'OnchainKit',
            target: 'https://onchainkit.xyz',
          },
        ],
        image: {
          src: `${NEXT_PUBLIC_URL}/park-1.png`,
        },
        postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
      }),
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
