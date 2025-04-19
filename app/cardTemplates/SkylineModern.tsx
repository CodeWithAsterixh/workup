import React from "react";
import QRCode from "react-qr-code";

type FrontProps = {
  logo_image: string;
  companyName: string;
  tagline: string;
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  website: string;
  address: string;
};

type BackProps = {
  logo_image: string;
  companyName: string;
  tagline: string;
};

export const defaultSkylineFront: FrontProps = {
  logo_image: "/logo.png",
  companyName: "Skyline Inc.",
  tagline: "Tagline goes here",
  fullName: "James Doe",
  jobTitle: "Director",
  phone: "123-456-7890",
  email: "youremail@domain.com",
  website: "www.example.com",
  address: "Your Street Address, City, State",
};

export const defaultSkylineBack: BackProps = {
  logo_image: "/logo.png",
  companyName: "Skyline Inc.",
  tagline: "Tagline goes here",
};

const squareStyle = (size: number, color: string): React.CSSProperties => ({
  width: size,
  height: size,
  backgroundColor: color,
});

const frontStyles: { [k: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    fontFamily: 'sans-serif',
    padding: '16px',
    boxSizing: 'border-box',
  },
  nameBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  fullName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1F2937',
    margin: 0,
  },
  jobTitle: {
    fontSize: '12px',
    color: '#4B5563',
    margin: 0,
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '10px',
    color: '#374151',
    marginTop: '12px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  icons: {
    width: '14px',
    height: '14px',
    display: 'inline-block',
    textAlign: 'center',
  },
  logoArea: {
    position: 'absolute',
    top: '50%',
    right: '16px',
    transform: 'translateY(-50%)',
    textAlign: 'center',
  },
  logoImage: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
  },
  tagline: {
    fontSize: '8px',
    color: '#6B7280',
    marginTop: '4px',
  },
  squaresTopRight: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    display: 'flex',
    gap: '4px',
  },
  squaresBottomLeft: {
    position: 'absolute',
    bottom: '16px',
    left: '16px',
    display: 'flex',
    gap: '4px',
  },
};

export function SkylineModernFront({
  logo_image,
  companyName,
  tagline,
  fullName,
  jobTitle,
  phone,
  email,
  website,
  address,
}: FrontProps) {
  const props = { ...defaultSkylineFront, logo_image, companyName, tagline, fullName, jobTitle, phone, email, website, address };
  return (
    <div style={frontStyles.container}>
      <div style={frontStyles.squaresTopRight}>
        <div style={squareStyle(8, '#10B981')}></div>
        <div style={squareStyle(12, '#F59E0B')}></div>
        <div style={squareStyle(16, '#1E40AF')}></div>
      </div>

      <div style={frontStyles.nameBlock}>
        <h1 style={frontStyles.fullName}>{props.fullName}</h1>
        <p style={frontStyles.jobTitle}>{props.jobTitle}</p>
      </div>

      <div style={frontStyles.contactList}>
        <p style={frontStyles.contactItem}><span style={frontStyles.icons}>📞</span>{props.phone}</p>
        <p style={frontStyles.contactItem}><span style={frontStyles.icons}>✉️</span>{props.email}</p>
        <p style={frontStyles.contactItem}><span style={frontStyles.icons}>🌐</span>{props.website}</p>
        <p style={frontStyles.contactItem}><span style={frontStyles.icons}>📍</span>{props.address}</p>
      </div>

      <div style={frontStyles.logoArea}>
        <img src={props.logo_image} alt="Logo" style={frontStyles.logoImage} />
        <p style={frontStyles.tagline}>{props.tagline}</p>
      </div>

      <div style={frontStyles.squaresBottomLeft}>
        <div style={squareStyle(12, '#F59E0B')}></div>
        <div style={squareStyle(16, '#1E40AF')}></div>
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
    fontFamily: 'sans-serif',
    overflow: 'hidden',
  },
  squaresTopLeft: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    display: 'flex',
    gap: '4px',
  },
  logoArea: {
    position: 'absolute',
    bottom: '16px',
    right: '16px',
    textAlign: 'center',
  },
  logoImage: {
    width: '50px',
    height: '50px',
    objectFit: 'contain',
  },
  tagline: {
    fontSize: '8px',
    color: '#6B7280',
    marginTop: '4px',
  },
};

export function SkylineModernBack({ logo_image, companyName, tagline }: BackProps) {
  const props = { ...defaultSkylineBack, logo_image, companyName, tagline };
  return (
    <div style={backStyles.container}>
      <div style={backStyles.squaresTopLeft}>
        <div style={squareStyle(16, '#1E40AF')}></div>
        <div style={squareStyle(12, '#F59E0B')}></div>
        <div style={squareStyle(8, '#10B981')}></div>
      </div>

      <div style={backStyles.logoArea}>
        <img src={props.logo_image} alt="Logo" style={backStyles.logoImage} />
        <p style={backStyles.tagline}>{props.tagline}</p>
      </div>
    </div>
  );
}

const SkylineModern = {
  front: {
    component: SkylineModernFront,
    default: defaultSkylineFront,
  },
  back: {
    component: SkylineModernBack,
    default: defaultSkylineBack,
  },
};

export default SkylineModern;
