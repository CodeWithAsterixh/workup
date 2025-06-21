import React from "react";
import QRCode from "react-qr-code";

type FrontProps = {
  logo_image: string;
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  website: string;
};

type BackProps = {
  logo_image: string;
  tagline: string;
  qr_value: string;
};

export const defaultNeonNexusFront: FrontProps = {
  logo_image: "/logo.png",
  fullName: "Jane Doe",
  jobTitle: "Creative Director",
  phone: "123-456-7890",
  email: "jane.doe@example.com",
  website: "www.example.com",
};

export const defaultNeonNexusBack: BackProps = {
  logo_image: "/logo.png",
  tagline: "Innovate the Future",
  qr_value: "https://www.example.com",
};
const blob = (top: string, left: string, size: number, color: string) => ({
    position: 'absolute',
    top,
    left,
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: '50%',
    filter: 'blur(20px)',
    opacity: 0.3,
  })
const frontStyles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    padding: '16px',
    boxSizing: 'border-box',
    background: 'linear-gradient(to bottom, #001133, #000000)',
    fontFamily: 'sans-serif',
    color: '#FFFFFF',
    overflow: 'hidden',
  },
  
  patternOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 10px)',
    pointerEvents: 'none',
  },
  name: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
  },
  title: {
    fontSize: '12px',
    margin: '4px 0 16px',
    color: '#CCCCCC',
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '10px',
    marginTop: 'auto',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  icon: {
    width: '12px',
    height: '12px',
  },
  logo: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '50px',
    height: '50px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 0 5px rgba(0,255,255,0.8))',
  },
};

export function NeonNexusFront(props: FrontProps) {
  const p = { ...defaultNeonNexusFront, ...props };
  return (
    <div style={frontStyles.container}>
      {/* Dynamic neon blobs */}
      <div style={blob('10%', '20%', 120, 'rgba(0,255,255,0.5)') as React.CSSProperties} />
      <div style={blob('60%', '10%', 180, 'rgba(255,0,255,0.5)') as React.CSSProperties} />
      <div style={blob('30%', '70%', 140, 'rgba(0,255,0,0.5)') as React.CSSProperties} />
      {/* Geometric pattern overlay */}
      <div style={frontStyles.patternOverlay} />
      {/* Logo */}
      <img src={p.logo_image} alt="Logo" style={frontStyles.logo} />
      {/* Name and Title */}
      <h1 style={frontStyles.name}>{p.fullName}</h1>
      <p style={frontStyles.title}>{p.jobTitle}</p>
      {/* Contact Info */}
      <div style={frontStyles.contactList}>
        <div style={frontStyles.contactItem}><span style={frontStyles.icon}>📞</span>{p.phone}</div>
        <div style={frontStyles.contactItem}><span style={frontStyles.icon}>✉️</span>{p.email}</div>
        <div style={frontStyles.contactItem}><span style={frontStyles.icon}>🌐</span>{p.website}</div>
      </div>
    </div>
  );
}

const backStyles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    padding: '16px',
    boxSizing: 'border-box',
    background: 'radial-gradient(circle at center, #001133, #000000)',
    fontFamily: 'sans-serif',
    color: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5))',
  },
  tagline: {
    fontStyle: 'italic',
    margin: '8px 0 16px',
    fontSize: '10px',
    color: '#CCCCCC',
  },
  qrWrapper: {
    padding: '8px',
    backgroundColor: '#000000',
    borderRadius: '8px',
  },
};

export function NeonNexusBack(props: BackProps) {
  const p = { ...defaultNeonNexusBack, ...props };
  return (
    <div style={backStyles.container}>
      <img src={p.logo_image} alt="Logo" style={backStyles.logo} />
      <p style={backStyles.tagline}>{p.tagline}</p>
      <div style={backStyles.qrWrapper}>
        <QRCode value={p.qr_value} size={72} />
      </div>
    </div>
  );
}

const NeonNexus = {
  front: {
    component: NeonNexusFront,
    default: defaultNeonNexusFront,
  },
  back: {
    component: NeonNexusBack,
    default: defaultNeonNexusBack,
  },
};

export default NeonNexus;
