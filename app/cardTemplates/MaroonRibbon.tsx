import React from "react";
import QRCode from "react-qr-code";

type FrontProps = {
  logo_image: string;
  companyName: string;
  tagline: string;
  website: string;
};

type BackProps = {
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  location: string;
  website: string;
  qr_value: string;
};

export const defaultMaroonRibbonFront: FrontProps = {
  logo_image: "/logo.png",
  companyName: "Your Company",
  tagline: "Delivering Excellence",
  website: "www.yourwebsite.com",
};

export const defaultMaroonRibbonBack: BackProps = {
  fullName: "Alex Johnson",
  jobTitle: "Product Manager",
  phone: "+01 234 567 890",
  email: "alex.johnson@yourwebsite.com",
  location: "123 Business Rd, City, Country",
  website: "www.yourwebsite.com",
  qr_value: "https://www.yourwebsite.com",
};

const frontStyles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#3B0A45',
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    fontFamily: 'sans-serif',
    color: '#FFFFFF',
    padding: '24px 16px',
    boxSizing: 'border-box',
  },
  ribbon: {
    position: 'absolute',
    top: 'calc(50% + 20px)',
    left: 0,
    width: '100%',
    height: '36px',
    backgroundColor: '#CFA18D',
    transform: 'translateY(-50%)',
  },
  logoArea: {
    position: 'absolute',
    top: 'calc(50% - 50px)',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFFFFF',
    padding: '12px',
    borderRadius: '50%',
    boxShadow: '0 0 8px rgba(0,0,0,0.2)',
  },
  logo: {
    width: '48px',
    height: '48px',
    objectFit: 'contain',
  },
  company: {
    marginTop: '72px',
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex:10,
    position:"relative"
  },
  tagline: {
    fontSize: '10px',
    marginTop: '12px',
    textAlign: 'center',
    color: '#E0CFC3',
    zIndex:10,
    position:"relative"
  },
  websiteText: {
    position: 'absolute',
    bottom: '12px',
    width: '100%',
    textAlign: 'center',
    fontSize: '10px',
    color: '#3B0A45',
  },
};

export function MaroonRibbonFront(props: FrontProps) {
  const p = { ...defaultMaroonRibbonFront, ...props };
  return (
    <div style={frontStyles.container}>
      <div style={frontStyles.ribbon} />
      <div style={frontStyles.logoArea}>
        <img src={p.logo_image} alt="Logo" style={frontStyles.logo} />
      </div>
      <p style={frontStyles.company}>{p.companyName}</p>
      <p style={frontStyles.tagline}>{p.tagline}</p>
      <p style={frontStyles.websiteText}>{p.website}</p>
    </div>
  );
}

const backStyles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    fontFamily: 'sans-serif',
    color: '#3B0A45',
    padding: '16px 16px 56px 56px',
    boxSizing: 'border-box',
  },
  sideStripe: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '40px',
    backgroundColor: '#3B0A45',
    borderTopLeftRadius: '12px',
    borderBottomLeftRadius: '12px',
  },
  topRibbon: {
    position: 'absolute',
    top: 0,
    left: '40px',
    right: 0,
    height: '24px',
    backgroundColor: '#CFA18D',
    borderBottomRightRadius: '12px',
  },
  infoBlock: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    fontSize: '10px',
  },
  name: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: 0,
  },
  title: {
    fontSize: '12px',
    margin: 0,
    color: '#666666',
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
  qrWrapper: {
    position: 'absolute',
    bottom: '16px',
    right: '16px',
    padding: '8px',
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 4px rgba(0,0,0,0.1)',
  },
};

export function MaroonRibbonBack(props: BackProps) {
  const p = { ...defaultMaroonRibbonBack, ...props };
  return (
    <div style={backStyles.container}>
      <div style={backStyles.sideStripe} />
      <div style={backStyles.topRibbon} />
      <div style={backStyles.infoBlock}>
        <p style={backStyles.name}>{p.fullName}</p>
        <p style={backStyles.title}>{p.jobTitle}</p>
        <div style={backStyles.contactItem}><span style={backStyles.icon}>📞</span>{p.phone}</div>
        <div style={backStyles.contactItem}><span style={backStyles.icon}>✉️</span>{p.email}</div>
        <div style={backStyles.contactItem}><span style={backStyles.icon}>📍</span>{p.location}</div>
        <div style={backStyles.contactItem}><span style={backStyles.icon}>🌐</span>{p.website}</div>
      </div>
      <div style={backStyles.qrWrapper}>
        <QRCode value={p.qr_value} size={72} />
      </div>
    </div>
  );
}

const MaroonRibbon = {
  front: {
    component: MaroonRibbonFront,
    default: defaultMaroonRibbonFront,
  },
  back: {
    component: MaroonRibbonBack,
    default: defaultMaroonRibbonBack,
  },
};

export default MaroonRibbon;
