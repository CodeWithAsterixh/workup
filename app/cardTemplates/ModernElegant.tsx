import React from "react";
import QRCode from "react-qr-code";

type FrontProps = {
  logo_image: string;
  companyName: string;
  slogan: string;
  website: string;
};

type BackProps = {
  profile_image?: string;
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  address: string;
  website: string;
};

export const defaultModernFront: FrontProps = {
  logo_image: "/logo.png",
  companyName: "Company Name",
  slogan: "Slogan Here",
  website: "www.yourwebsite.com",
};

export const defaultModernBack: BackProps = {
  fullName: "Alexander John",
  jobTitle: "Director",
  phone: "+000 2103 8894",
  email: "info@websiteurl.com",
  address: "Your Address Here, 001234",
  profile_image: "/logo.png",
  website: "www.yourwebsite.com",
};

const frontStyles: { [k: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#274492',
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
  },
  logoWrapper: {
    width: '80px',
    height: '80px',
    marginBottom: '12px',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  companyName: {
    color: '#FFFFFF',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
  },
  slogan: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '12px',
    marginTop: '4px',
    marginBottom: '20px',
  },
  website: {
    position: 'absolute',
    bottom: '12px',
    left: '16px',
    color: '#FFFFFF',
    fontSize: '10px',
    textDecoration: 'none',
  },
};

export function ModernElegantFront({ logo_image, companyName, slogan, website }: FrontProps) {
  const props = { ...defaultModernFront, logo_image, companyName, slogan, website };
  return (
    <div style={frontStyles.container}>
      <div style={frontStyles.logoWrapper}>
        <img src={props.logo_image} alt="Logo" style={frontStyles.logoImage} />
      </div>
      <h1 style={frontStyles.companyName}>{props.companyName}</h1>
      <p style={frontStyles.slogan}>{props.slogan}</p>
      <a href={`https://${props.website}`} style={frontStyles.website}>{props.website}</a>
    </div>
  );
}

const backStyles: { [k: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  fullName: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: 0,
  },
  jobTitle: {
    fontSize: '10px',
    color: '#4B5563',
    margin: 0,
  },
  qrWrapper: {
    width:"50px",
    height:"50px",
    padding: '4px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E7EB',
  },
  contacts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '10px',
    color: '#374151',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  footer: {
    textAlign: 'right',
    fontSize: '8px',
    color: '#9CA3AF',
  },
};

export function ModernElegantBack({ profile_image, fullName, jobTitle, phone, email, address, website }: BackProps) {
  const props = { ...defaultModernBack, profile_image, fullName, jobTitle, phone, email, address, website };
  return (
    <div style={backStyles.container}>
      <div style={backStyles.header}>
        <div style={backStyles.nameSection}>
          <h2 style={backStyles.fullName}>{props.fullName}</h2>
          <p style={backStyles.jobTitle}>{props.jobTitle}</p>
        </div>
        <div style={backStyles.qrWrapper}>
        <QRCode style={{
            width: '100%',
            height: '100%',
          }} value={`${props.website}`} />
        </div>
      </div>

      <div style={backStyles.contacts}>
        <p style={backStyles.contactItem}>📞 {props.phone}</p>
        <p style={backStyles.contactItem}>✉️ {props.email}</p>
        <p style={backStyles.contactItem}>📍 {props.address}</p>
      </div>

      <div style={backStyles.footer}>
        {props.website}
      </div>
    </div>
  );
}

const ModernElegant = {
  front: {
    component: ModernElegantFront,
    default: defaultModernFront,
  },
  back: {
    component: ModernElegantBack,
    default: defaultModernBack,
  },
};

export default ModernElegant;
