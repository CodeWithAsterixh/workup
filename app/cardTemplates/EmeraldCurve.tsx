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
  address: string;
  qr_value: string;
};

export const defaultEmeraldCurveFront: FrontProps = {
  logo_image: "/logo.png",
  companyName: "Your Company",
  tagline: "Your tagline here",
  website: "www.yourwebsite.com",
};

export const defaultEmeraldCurveBack: BackProps = {
  fullName: "John Smith",
  jobTitle: "Software Developer",
  phone: "+123 123 1234",
  email: "info@yourwebsite.com",
  address: "120 Lorem Street, City, Country",
  qr_value: "https://www.yourwebsite.com",
};

const frontStyles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1A1A1A',
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    fontFamily: 'sans-serif',
    color: '#FFFFFF',
  },
  curve: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '60%',
    height: '100%',
    backgroundColor: '#00B050',
    borderTopLeftRadius: '200px',
    borderBottomLeftRadius: '200px',
  },
  logoArea: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logo: {
    width: '40px',
    height: '40px',
    objectFit: 'contain',
  },
  company: {
    fontSize: '14px',
    fontWeight: 'bold',
    margin: 0,
    maxWidth: "100px"
  },
  tagline: {
    fontSize: '8px',
    margin: 0,
    color: '#CCCCCC',
    maxWidth: "100px"
  },
  website: {
    position: 'absolute',
    bottom: '16px',
    left: '16px',
    fontSize: '10px',
    color: '#CCCCCC',
    margin: 0,
  },
};

export function EmeraldCurveFront(props: FrontProps) {
  const p = { ...defaultEmeraldCurveFront, ...props };
  return (
    <div style={frontStyles.container}>
      <div style={frontStyles.curve} />
      <div style={frontStyles.logoArea}>
        <img src={p.logo_image} alt="Logo" style={frontStyles.logo} />
        <div>
          <p style={frontStyles.company}>{p.companyName}</p>
          <p style={frontStyles.tagline}>{p.tagline}</p>
        </div>
      </div>
      <p style={frontStyles.website}>{p.website}</p>
    </div>
  );
}

const backStyles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1A1A1A',
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    fontFamily: 'sans-serif',
    color: '#FFFFFF',
    padding: '16px',
    boxSizing: 'border-box',
  },
  curve: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '60%',
    height: '100%',
    backgroundColor: '#00B050',
    borderTopRightRadius: '200px',
    borderBottomRightRadius: '200px',
  },
  infoBlock: {
    position: 'relative',
    zIndex: 1,
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
    color: '#CCCCCC',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  qrWrapper: {
    position: 'absolute',
    bottom: '16px',
    right: '16px',
    background: '#000000',
    padding: '8px',
    borderRadius: '8px',
    zIndex: 1,
  },
  icon: {
    width: '12px',
    height: '12px',
  },
};

export function EmeraldCurveBack(props: BackProps) {
  const p = { ...defaultEmeraldCurveBack, ...props };
  return (
    <div style={backStyles.container}>
      <div style={backStyles.curve} />
      <div style={backStyles.infoBlock}>
        <p style={backStyles.name}>{p.fullName}</p>
        <p style={backStyles.title}>{p.jobTitle}</p>
        <div style={backStyles.contactItem}><span style={backStyles.icon}>📞</span>{p.phone}</div>
        <div style={backStyles.contactItem}><span style={backStyles.icon}>✉️</span>{p.email}</div>
        <div style={backStyles.contactItem}><span style={backStyles.icon}>📍</span>{p.address}</div>
      </div>
      <div style={backStyles.qrWrapper}>
        <QRCode value={p.qr_value} size={80} />
      </div>
    </div>
  );
}

const EmeraldCurve = {
  front: {
    component: EmeraldCurveFront,
    default: defaultEmeraldCurveFront,
  },
  back: {
    component: EmeraldCurveBack,
    default: defaultEmeraldCurveBack,
  },
};

export default EmeraldCurve;
