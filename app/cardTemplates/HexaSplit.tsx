import React from 'react';
import QRCode from 'react-qr-code';

type FrontProps = {
  logo_image: string;
  companyName: string;
  tagline: string;
  qr_value: string;
};

type BackProps = {
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  location: string;
  website: string;
};

// Clip path for hexagon shape
const HEX_CLIP = 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)';

// Default prop values
export const defaultHexaSplitFront: FrontProps = {
  logo_image: '/logo.png',
  companyName: 'Company Name',
  tagline: 'Tagline Here',
  qr_value: 'https://www.example.com',
};

export const defaultHexaSplitBack: BackProps = {
  fullName: 'Dicky Prayuda',
  jobTitle: 'Graphic Designer',
  phone: '+00 1234 56789',
  email: 'info@example.com',
  location: 'Address here, City, 1234',
  website: 'Yourwebsite.com',
};

// Reusable style generators
const halfStyle = (side: 'left' | 'right', front: boolean): React.CSSProperties => ({
  position: 'absolute',
  top: 0,
  [side]: 0,
  width: '50%',
  height: '100%',
  backgroundColor: front
    ? side === 'left'
      ? '#000'
      : '#FFA500'
    : side === 'left'
    ? '#FFA500'
    : '#000',
});

const sideTabStyle = (side: 'left' | 'right', front: boolean): React.CSSProperties => ({
  position: 'absolute',
  top: '40%',
  [side]: 0,
  width: '24px',
  height: '80px',
  backgroundColor: front
    ? side === 'left'
      ? '#FFA500'
      : '#000'
    : side === 'left'
    ? '#000'
    : '#FFA500',
  borderRadius: side === 'left' ? '0 12px 12px 0' : '12px 0 0 12px',
});

const styles = {
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    fontFamily: 'sans-serif',
    overflow: 'hidden',
    borderRadius: '12px',
  } as React.CSSProperties,

  qrWrapper: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    backgroundColor: '#fff',
    padding: '8px',
    borderRadius: '8px',
  } as React.CSSProperties,

  hexagonOuter: {
    position: 'absolute',
    top: '50%',
    width: '120px',
    height: '104px',
    transform: 'translateY(-50%)',
    backgroundColor: '#FFA500',
    clipPath: HEX_CLIP,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties,

  hexagonInner: {
    width: '100px',
    height: '86px',
    backgroundColor: '#000',
    clipPath: HEX_CLIP,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    textAlign: 'center',
    padding: '8px',
  } as React.CSSProperties,

  company: { margin: 0, fontSize: '14px', fontWeight: 'bold' } as React.CSSProperties,
  tagline: { margin: 0, fontSize: '8px', color: '#CCC' } as React.CSSProperties,
  infoBlock: {
    position: 'absolute',
    top: '20%',
    right: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    fontSize: '10px',
    color: '#fff',
  } as React.CSSProperties,
  name: { margin: 0, fontSize: '16px', fontWeight: 'bold' } as React.CSSProperties,
  title: { margin: 0, fontSize: '12px', color: '#CCC' } as React.CSSProperties,
  contactItem: { display: 'flex', alignItems: 'center', gap: '6px' } as React.CSSProperties,
  icon: { width: '12px', height: '12px' } as React.CSSProperties,
};

// Front component
export function HexaSplitFront(props: FrontProps) {
  const { logo_image, companyName, tagline, qr_value } = { ...defaultHexaSplitFront, ...props };

  return (
    <div style={styles.container}>
      {/* Half backgrounds */}
      <div style={halfStyle('left', true)} />
      <div style={halfStyle('right', true)} />

      {/* Side tabs */}
      <div style={sideTabStyle('left', true)} />
      <div style={sideTabStyle('right', true)} />

      {/* QR Code */}
      <div style={styles.qrWrapper}>
        <QRCode value={qr_value} size={72} />
      </div>

      {/* Hexagon badge */}
      <div style={{ ...styles.hexagonOuter, right: '16px' }}>
        <div style={styles.hexagonInner}>
          <img src={logo_image} alt="Logo" style={{ width: '32px', height: '32px', marginBottom: '4px' }} />
          <p style={styles.company}>{companyName}</p>
          <p style={styles.tagline}>{tagline}</p>
        </div>
      </div>
    </div>
  );
}

// Back component
export function HexaSplitBack(props: BackProps) {
  const { fullName, jobTitle, phone, email, location, website } = { ...defaultHexaSplitBack, ...props };

  return (
    <div style={{ ...styles.container, backgroundColor: '#FFF' }}>
      <div style={halfStyle('left', false)} />
      <div style={halfStyle('right', false)} />
      <div style={sideTabStyle('left', false)} />
      <div style={sideTabStyle('right', false)} />

      {/* Hexagon accent */}
      <div style={{ ...styles.hexagonOuter, left: '16px', backgroundColor: '#000' }}>
        <div style={{ ...styles.hexagonInner, backgroundColor: '#FFA500' }} />
      </div>

      {/* Contact info */}
      <div style={styles.infoBlock}>
        <p style={styles.name}>{fullName}</p>
        <p style={styles.title}>{jobTitle}</p>
        <div style={styles.contactItem}><span style={styles.icon}>📞</span>{phone}</div>
        <div style={styles.contactItem}><span style={styles.icon}>✉️</span>{email}</div>
        <div style={styles.contactItem}><span style={styles.icon}>📍</span>{location}</div>
        <div style={styles.contactItem}><span style={styles.icon}>🌐</span>{website}</div>
      </div>
    </div>
  );
}

const HexaSplit = {
  front: { component: HexaSplitFront, default: defaultHexaSplitFront },
  back: { component: HexaSplitBack, default: defaultHexaSplitBack },
};

export default HexaSplit;