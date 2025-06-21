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

export const defaultGoldenBarFront: FrontProps = {
  logo_image: "/logo.png",
  companyName: "Your Logo",
  tagline: "Tagline Here",
  website: "Yourwebsite.com",
};

export const defaultGoldenBarBack: BackProps = {
  fullName: "Dicky Prayuda",
  jobTitle: "Graphic Designer",
  phone: "+00 1234 56789",
  email: "info@example.com",
  location: "Address here, City, 1234",
  website: "Yourwebsite.com",
  qr_value: "https://www.yourwebsite.com",
};

const frontStyles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1B2A41',
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    fontFamily: 'sans-serif',
    color: '#FFFFFF',
  },
  topSection: {
    padding: '24px 16px 0',
    textAlign: 'center',
  },
  logo: {
    width: '40px',
    height: '40px',
    objectFit: 'contain',
    marginBottom: '8px',
  },
  company: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: 0,
  },
  tagline: {
    fontSize: '10px',
    margin: '4px 0',
    color: '#CCCCCC',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80%',
    height: '36px',
    backgroundColor: '#D4AF37',
    borderTopLeftRadius: '18px',
    borderTopRightRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  website: {
    fontSize: '10px',
    color: '#1B2A41',
    marginTop: -10,
  },
};

export function GoldenBarFront(props: FrontProps) {
  const p = { ...defaultGoldenBarFront, ...props };
  return (
    <div style={frontStyles.container}>
      <div style={frontStyles.topSection}>
        <img src={p.logo_image} alt="Logo" style={frontStyles.logo} />
        <p style={frontStyles.company}>{p.companyName}</p>
        <p style={frontStyles.tagline}>{p.tagline}</p>
      </div>
      <div style={frontStyles.bottomBar}>
        <p style={frontStyles.website}>{p.website}</p>
      </div>
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
    color: '#1B2A41',
  },
  sideBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '40px',
    backgroundColor: '#1B2A41',
  },
  goldBar: {
    position: 'absolute',
    top: 0,
    left: '40px',
    right: 0,
    height: '32px',
    backgroundColor: '#D4AF37',
  },
  infoBlock: {
    position: 'relative',
    margin: '48px 16px 16px 56px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    fontSize: '10px',
  },
  name: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: 0,
    color: '#1B2A41',
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
    background: '#FFFFFF',
    padding: '8px',
    borderRadius: '8px',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
  },
};

export function GoldenBarBack(props: BackProps) {
  const p = { ...defaultGoldenBarBack, ...props };
  return (
    <div style={backStyles.container}>
      <div style={backStyles.sideBar} />
      <div style={backStyles.goldBar} />
      <div style={backStyles.infoBlock}>
        <p style={backStyles.name}>{p.fullName}</p>
        <p style={backStyles.title}>{p.jobTitle}</p>
        <div style={backStyles.contactItem}><span style={backStyles.icon}>📞</span>{p.phone}</div>
        <div style={backStyles.contactItem}><span style={backStyles.icon}>✉️</span>{p.email}</div>
        <div style={backStyles.contactItem}><span style={backStyles.icon}>📍</span>{p.location}</div>
        <div style={backStyles.contactItem}><span style={backStyles.icon}>🌐</span>{p.website}</div>
      </div>
      <div style={backStyles.qrWrapper}>
        <QRCode value={p.qr_value} size={80} />
      </div>
    </div>
  );
}

const GoldenBar = {
  front: {
    component: GoldenBarFront,
    default: defaultGoldenBarFront,
  },
  back: {
    component: GoldenBarBack,
    default: defaultGoldenBarBack,
  },
};

export default GoldenBar;
