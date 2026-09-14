import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'AURA Luxury Resorts & Bespoke Escapes';
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
          background: '#09090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fef08a',
          border: '1px solid rgba(251, 191, 36, 0.2)',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 'bold', letterSpacing: '0.2em', color: '#fbbf24' }}>
          A U R A
        </div>
        <div style={{ fontSize: 24, marginTop: 20, color: '#e4e4e7', letterSpacing: '0.1em' }}>
          LUXURY RESORTS & BESPOKE ESCAPES
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
