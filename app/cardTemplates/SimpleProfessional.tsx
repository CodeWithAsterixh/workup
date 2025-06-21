import React from "react";

type FrontProps = {
  logo_image: string;
  companyName: string;
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

export const defaultFrontProps: FrontProps = {
  logo_image: "/logo.png",
  companyName: "ACME Corp",
  fullName: "John Doe",
  jobTitle: "Senior Software Engineer",
  phone: "+1 (555) 123-4567",
  email: "john.doe@acmecorp.com",
  website: "www.acmecorp.com",
};

export const defaultBackProps: BackProps = {
  logo_image: "/logo.png",
  companyName: "ACME Corp",
  tagline: "Innovating Tomorrow, Today",
};

const frontStyles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#FFFFFF',
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    padding: '16px',
    color: '#1A1A1A',
    fontFamily: 'sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    position:"relative"
  },
  logoWrapper: {
    width: '40px',
    height: '40px',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  companyName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: "12px"
  },
  authorSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  fullName: {
    fontSize: '16px',
    fontWeight: 600,
  },
  jobTitle: {
    fontSize: '14px',
    color: '#4B5563',
  },
  divider: {
    height: '1px',
    backgroundColor: '#E5E7EB',
    margin: '8px 0 0 0',
    border: 'none',
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    fontSize: '12px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
};

export function SimpleProfessionalFront({
  logo_image,
  companyName,
  fullName,
  jobTitle,
  phone,
  email,
  website,
}: FrontProps) {
  const props = { ...defaultFrontProps, logo_image, companyName, fullName, jobTitle, phone, email, website };

  return (
    <div style={frontStyles.container}>
      <div style={frontStyles.headerRow}>
        <div style={frontStyles.logoWrapper}>
          <img
            src={props.logo_image}
            alt="Company Logo"
            style={frontStyles.logoImage}
          />
        </div>
        <h1 style={frontStyles.companyName}>{props.companyName}</h1>
      </div>

      <div style={frontStyles.authorSection}>
        <h2 style={frontStyles.fullName}>{props.fullName}</h2>
        <p style={frontStyles.jobTitle}>{props.jobTitle}</p>
        <hr style={frontStyles.divider} />
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
    backgroundColor: '#2563EB',
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    padding: '16px',
    color: '#FFFFFF',
    fontFamily: 'sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  logoWrapper: {
    width: '64px',
    height: '64px',
    marginBottom: '12px',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  companyName: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
  },
  tagline: {
    fontSize: '14px',
    fontWeight: 300,
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    paddingTop: '8px',
    marginTop: '8px',
  }
};

export function SimpleProfessionalBack({
  logo_image,
  companyName,
  tagline,
}: BackProps) {
  const props = { ...defaultBackProps, logo_image, companyName, tagline };

  return (
    <div style={backStyles.container}>
      <div style={backStyles.logoWrapper}>
        <img
          src={props.logo_image}
          alt="Company Logo"
          style={backStyles.logoImage}
        />
      </div>
      <h1 style={backStyles.companyName}>{props.companyName}</h1>
      <p style={backStyles.tagline}>{props.tagline}</p>
    </div>
  );
}

const SimpleProfessional = {
  front: {
    component: SimpleProfessionalFront,
    default: defaultFrontProps,
  },
  back: {
    component: SimpleProfessionalBack,
    default: defaultBackProps,
  },
};

export default SimpleProfessional;
