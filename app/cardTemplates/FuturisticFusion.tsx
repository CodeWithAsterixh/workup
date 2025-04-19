import React from "react";

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
  companyName: string;
  tagline: string;
};

export const defaultFuturisticFront: FrontProps = {
  logo_image: "/logo.png",
  fullName: "Avery Nova",
  jobTitle: "Chief Technologist",
  phone: "+1 (800) 555-0199",
  email: "avery.nova@fusiontech.com",
  website: "fusiontech.com",
};

export const defaultFuturisticBack: BackProps = {
  logo_image: "/logo.png",
  companyName: "Fusion Tech",
  tagline: "Shaping Tomorrow, Today",
};
const neonCircle = (size: number, x: string, y: string): React.CSSProperties => ({
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: '50%',
    boxShadow: `0 0 ${size / 4}px rgba(58,192,255,0.6)`,
    border: '2px solid rgba(58,192,255,0.4)',
    top: y,
    left: x,
  })

const frontStyles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#0D0F13',
    color: '#E0E6FF',
    width: '100%',
    height: '100%',
    position: 'relative',
    fontFamily: 'sans-serif',
    overflow: 'hidden',
    padding: '24px',
    boxSizing: 'border-box',
  },
  logo: {
    position: 'absolute',
    top: '24px',
    left: '24px',
    width: '48px',
    height: '48px',
    objectFit: 'contain',
  },
  hexagonPattern: {
    position: 'absolute',
    top: '0',
    right: '-20%',
    width: '200%',
    height: '200%',
    backgroundImage: 'repeating-linear-gradient(60deg, rgba(14,17,23,0.2) 0, rgba(14,17,23,0.2) 1px, transparent 1px, transparent 20px)',
    transform: 'rotate(30deg)',
  },
  infoBlock: {
    position: 'absolute',
    bottom: '24px',
    left: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  name: {
    fontSize: '18px',
    fontWeight: 700,
    margin: 0,
  },
  title: {
    fontSize: '12px',
    fontWeight: 400,
    color: '#8A95B1',
    margin: 0,
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '10px',
    color: '#A3ABC8',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
};

export function FuturisticFusionFront({ logo_image, fullName, jobTitle, phone, email, website }: FrontProps) {
  const props = { ...defaultFuturisticFront, logo_image, fullName, jobTitle, phone, email, website };
  return (
    <div style={frontStyles.container}>
      <div style={frontStyles.hexagonPattern} />
      <img src={props.logo_image} alt="Logo" style={frontStyles.logo} />
      <div style={neonCircle(120, '60%', '20%')} />
      <div style={neonCircle(80, '10%', '70%')} />
      <div style={frontStyles.infoBlock}>
        <h1 style={frontStyles.name}>{props.fullName}</h1>
        <p style={frontStyles.title}>{props.jobTitle}</p>
        <div style={frontStyles.contactList}>
          <p style={frontStyles.contactItem}>📞 {props.phone}</p>
          <p style={frontStyles.contactItem}>✉️ {props.email}</p>
          <p style={frontStyles.contactItem}>🌐 {props.website}</p>
        </div>
      </div>
    </div>
  );
}

const backStyles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#0D0F13',
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    padding: '24px',
    boxSizing: 'border-box',
    fontFamily: 'sans-serif',
    color: '#E0E6FF',
  },
  gridLines: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(#1C2028 1px, transparent 1px), linear-gradient(90deg, #1C2028 1px, transparent 1px)',
    backgroundSize: '20px 20px',
    opacity: 0.2,
  },
  centerBlock: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  companyName: {
    fontSize: '20px',
    fontWeight: 700,
    margin: 0,
  },
  tagline: {
    fontSize: '10px',
    color: '#8A95B1',
    margin: '8px 0 0',
  },
};

export function FuturisticFusionBack({ logo_image, companyName, tagline }: BackProps) {
  const props = { ...defaultFuturisticBack, logo_image, companyName, tagline };
  return (
    <div style={backStyles.container}>
      <div style={backStyles.gridLines} />
      <div style={backStyles.centerBlock}>
        <img src={props.logo_image} alt="Logo" style={{ width: '64px', height: '64px', marginBottom: '8px' }} />
        <h1 style={backStyles.companyName}>{props.companyName}</h1>
        <p style={backStyles.tagline}>{props.tagline}</p>
      </div>
    </div>
  );
}

const FuturisticFusion = {
  front: {
    component: FuturisticFusionFront,
    default: defaultFuturisticFront,
  },
  back: {
    component: FuturisticFusionBack,
    default: defaultFuturisticBack,
  },
};

export default FuturisticFusion;
