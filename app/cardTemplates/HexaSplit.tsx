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

const ACCENT = '#FFA500';
const DARK = '#232323';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    borderRadius: '14px',
    overflow: 'hidden',
    fontFamily: 'Inter, sans-serif',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    display: 'flex',
    flexDirection: 'column' as const,
    background: '#fff',
  },
  splitRow: {
    display: 'flex',
    flex: 1,
    height: '100%',
  },
  left: {
    flex: 1,
    background: DARK,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 16px',
    minWidth: 0,
  },
  right: {
    flex: 1,
    background: ACCENT,
    color: DARK,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 16px',
    minWidth: 0,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: '#fff',
    objectFit: 'contain' as const,
    marginBottom: 16,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  company: {
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
    marginBottom: 6,
    letterSpacing: 0.5,
    textAlign: 'center' as const,
  },
  tagline: {
    fontSize: 12,
    color: '#e9e9e9',
    margin: 0,
    marginBottom: 24,
    textAlign: 'center' as const,
    fontWeight: 400,
  },
  qr: {
    background: '#fff',
    padding: 8,
    borderRadius: 8,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    marginTop: 16,
  },
  // Back styles
  infoBlock: {
    width: '100%',
    maxWidth: 260,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 8,
    color: DARK,
    background: '#fff',
    borderRadius: 10,
    padding: '24px 20px',
    boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
  },
  name: {
    fontSize: 18,
    fontWeight: 700,
    margin: 0,
    color: DARK,
  },
  title: {
    fontSize: 13,
    fontWeight: 500,
    color: ACCENT,
    margin: 0,
    marginBottom: 8,
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 12,
    color: DARK,
    wordBreak: 'break-all' as const,
  },
  icon: {
    fontSize: 13,
    width: 16,
    textAlign: 'center' as const,
  },
};

export function HexaSplitFront(props: FrontProps) {
  const { logo_image, companyName, tagline, qr_value } = { ...defaultHexaSplitFront, ...props };

  return (
    <div style={styles.container}>
      <div style={styles.splitRow}>
        <div style={styles.left}>
          <img src={logo_image} alt="Logo" style={styles.logo} />
          <div>
            <h2 style={styles.company}>{companyName}</h2>
            <div style={styles.tagline}>{tagline}</div>
          </div>
        </div>
        <div style={styles.right}>
          <div style={styles.qr}>
            <QRCode value={qr_value} size={72} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HexaSplitBack(props: BackProps) {
  const { fullName, jobTitle, phone, email, location, website } = { ...defaultHexaSplitBack, ...props };

  return (
    <div style={styles.container}>
      <div style={styles.splitRow}>
        <div style={styles.left}>
          <div style={styles.infoBlock}>
            <div>
              <div style={styles.name}>{fullName}</div>
              <div style={styles.title}>{jobTitle}</div>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.icon}>📞</span>
              {phone}
            </div>
            <div style={styles.contactItem}>
              <span style={styles.icon}>✉️</span>
              {email}
            </div>
            <div style={styles.contactItem}>
              <span style={styles.icon}>📍</span>
              {location}
            </div>
            <div style={styles.contactItem}>
              <span style={styles.icon}>🌐</span>
              {website}
            </div>
          </div>
        </div>
        <div style={styles.right}>
          {/* Optionally, you can add a QR code or a logo here for symmetry */}
        </div>
      </div>
    </div>
  );
}

const HexaSplit = {
  front: { component: HexaSplitFront, default: defaultHexaSplitFront },
  back: { component: HexaSplitBack, default: defaultHexaSplitBack },
};

export default HexaSplit;