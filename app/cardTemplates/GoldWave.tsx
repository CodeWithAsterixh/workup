import React from 'react';
import QRCode from 'react-qr-code';

type FrontProps = {
  logo_image: string;
  brandName: string;
  tagline: string;
};

type BackProps = {
  fullName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  website: string;
};

// Default properties
export const defaultGoldWaveFront: FrontProps = {
  logo_image: '/logo.png',
  brandName: 'Brand Name',
  tagline: 'Tagline Space',
};

export const defaultGoldWaveBack: BackProps = {
  fullName: 'Your Name',
  jobTitle: 'Graphic Designer',
  address: '123 Dummy, Lorem Ipsum',
  phone: '+00 1234 1234 1234',
  email: 'youremail@domain.com',
  website: 'www.yourwebsite.com',
};

// Shared styles
const styles = {
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    fontFamily: 'sans-serif',
    overflow: 'hidden',
    borderRadius: '12px',
  } as React.CSSProperties,
  gradientGold: {
    background: 'linear-gradient(135deg, #FFD700, #FFC107)',
  } as React.CSSProperties,
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '120%',
    height: '60%',
    backgroundColor: '#000',
    zIndex:"0",
    clipPath: 'ellipse(50% 100% at 50% 0)',
  } as React.CSSProperties,
  logo: {
    width: '48px',
    height: '48px',
    objectFit: 'contain',
    display: 'block',
    margin: '0 auto 16px',
  } as React.CSSProperties,
  brand: {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    zIndex:"10",
    position:"relative",
    margin: 0,
  } as React.CSSProperties,
  tagline: {
    fontSize: '10px',
    textAlign: 'center',
    color: '#000',
    margin: 0,
  } as React.CSSProperties,
  infoColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '10px',
    color: '#fff',
    padding: '16px',
  } as React.CSSProperties,
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  } as React.CSSProperties,
  icon: {
    width: '12px',
    height: '12px',
  } as React.CSSProperties,
};

// Front component
export function GoldWaveFront(props: FrontProps) {
  const { logo_image, brandName, tagline } = { ...defaultGoldWaveFront, ...props };
  return (
    <div style={{ ...styles.container, ...styles.gradientGold }}>
      {/* Black wave at bottom */}
      <div style={styles.wave} />

      {/* Logo + text */}
      <img src={logo_image} alt="Logo" style={styles.logo} />
      <p style={styles.brand}>{brandName}</p>
      <p style={styles.tagline}>{tagline}</p>
    </div>
  );
}

// Back component
export function GoldWaveBack(props: BackProps) {
  const { fullName, jobTitle, address, phone, email, website } = { ...defaultGoldWaveBack, ...props };
  return (
    <div style={{ ...styles.container, backgroundColor: '#000' }}>
      {/* Left black panel overlay for icons */}
      <div style={{ width: '40%', height: '100%', backgroundColor: '#000', position: 'absolute', top: 0, left: 0 }} />

      {/* Info on left */}
      <div style={{ ...styles.infoColumn, position: 'absolute', top: 0, left: 0, width: '40%' }}>
        <div style={styles.infoItem}><span style={styles.icon}>📍</span>{address}</div>
        <div style={styles.infoItem}><span style={styles.icon}>📞</span>{phone}</div>
        <div style={styles.infoItem}><span style={styles.icon}>✉️</span>{email}</div>
        <div style={styles.infoItem}><span style={styles.icon}>🌐</span>{website}</div>
      </div>

      {/* Name & title on right */}
      <div style={{ position: 'absolute', top: '30%', right: '10%', color: '#FFD700', textAlign: 'right' }}>
        <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{fullName}</p>
        <p style={{ margin: 0, fontSize: '12px' }}>{jobTitle}</p>
      </div>
    </div>
  );
}

// Export structure
const GoldWave = {
  front: { component: GoldWaveFront, default: defaultGoldWaveFront },
  back: { component: GoldWaveBack, default: defaultGoldWaveBack },
};

export default GoldWave;
