import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'Easy VIP Transfer Bodrum';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #0a0a0a, #000000)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle at 50% 50%, #E5D3B3 0%, transparent 50%)',
          }}
        />

        {/* LOGO TEXT */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 100,
              fontFamily: 'serif',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to right, #ffffff, #E5D3B3)',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            EASY VIP
          </div>
          
          <div
            style={{
              fontSize: 40,
              fontFamily: 'sans-serif',
              fontWeight: 300,
              letterSpacing: '0.4em',
              color: '#888888',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            Transfer
          </div>
        </div>

        {/* BOTTOM METADATA */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            padding: '0 80px',
            color: '#666666',
            fontSize: 24,
            fontFamily: 'sans-serif',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <span>Bodrum</span>
          <span>•</span>
          <span>Yalıkavak</span>
          <span>•</span>
          <span>Milas (BJV)</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
