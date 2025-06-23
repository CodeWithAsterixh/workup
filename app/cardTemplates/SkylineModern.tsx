import React from "react";
import QRCode from "react-qr-code";
import type { options, Validator, ValidatorRule, ValidatorsMap } from "~/components/Options";
import type { template } from ".";

// Colors map type: semantic names
export type ColorsMap = Record<
  | "backgroundPrimary"
  | "backgroundSecondary"
  | "textPrimary"
  | "textSecondary"
  | "divider"
  | "color1"
  | "color2"
  | "color3",
  string
>;

// Helper: apply truncation based on validators
const applyValidators = (
  value: string,
  rules: Record<keyof Validator, ValidatorRule>
): string => {
  const maxLen = rules.maxLength.value as number;
  return value.slice(0, maxLen);
};

// Default validators for front fields
const defaultFrontValidators: ValidatorsMap = {
  logo_image:  { maxLength: { value: 100, required: false, type: "number" }, isUrl: { value: true, required: true, type: "boolean" } },
  companyName: { maxLength: { value: 30, required: true, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  tagline:     { maxLength: { value: 60, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  fullName:    { maxLength: { value: 20, required: true, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  jobTitle:    { maxLength: { value: 30, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  phone:       { maxLength: { value: 20, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  email:       { maxLength: { value: 40, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  website:     { maxLength: { value: 50, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  address:     { maxLength: { value: 80, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
};

// Default validators for back fields
const defaultBackValidators: ValidatorsMap = {
  logo_image:  defaultFrontValidators.logo_image,
  companyName: defaultFrontValidators.companyName,
  tagline:     defaultFrontValidators.tagline,
};

// Default semantic colors
const defaultColors: ColorsMap = {
  backgroundPrimary:   "#FFFFFF",
  backgroundSecondary: "#F3F4F6",
  textPrimary:         "#1F2937",
  textSecondary:       "#4B5563",
  divider:             "#E5E7EB",
  color1:              "#10B981",
  color2:              "#F59E0B",
  color3:              "#1E40AF",
};

// Props
interface FrontProps {
  logo_image: string;
  companyName: string;
  tagline: string;
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  website: string;
  address: string;
}
interface BackProps {
  logo_image: string;
  companyName: string;
  tagline: string;
}
export interface defaultFront extends FrontProps {}
export interface defaultBack extends BackProps {}

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

// Styles factory using semantic colors
const createStyles = (
  cols: ColorsMap
): Record<
  | "container"
  | "nameBlock"
  | "fullName"
  | "jobTitle"
  | "contactList"
  | "contactItem"
  | "icons"
  | "logoArea"
  | "logoImage"
  | "tagline"
  | "squaresTopRight"
  | "squaresBottomLeft"
  | "QRWrapper",
  React.CSSProperties
> & { squareStyle: (size: number, color: string) => React.CSSProperties } => {
  const squareStyle = (size: number, color: string): React.CSSProperties => ({
    width: size,
    height: size,
    backgroundColor: color,
  });
  return {
    container:   { width: '100%', height: '100%', backgroundColor: cols.backgroundPrimary, position: 'relative', fontFamily: 'sans-serif', padding: '16px', boxSizing: 'border-box' },
    nameBlock:   { display: 'flex', flexDirection: 'column', gap: '4px' },
    fullName:    { fontSize: '18px', fontWeight: 'bold', color: cols.textPrimary, margin: 0 },
    jobTitle:    { fontSize: '12px', color: cols.textSecondary, margin: 0 },
    contactList: { display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '10px', color: cols.textSecondary, marginTop: '12px' },
    contactItem: { display: 'flex', alignItems: 'center', gap: '6px' },
    icons:       { width: '14px', height: '14px', display: 'inline-block', textAlign: 'center' },
    logoArea:    { position: 'absolute', top: '50%', right: '16px', transform: 'translateY(-50%)', textAlign: 'end', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
    logoImage:   { width: '60px', height: '60px', objectFit: 'contain' },
    tagline:     { fontSize: '8px', color: cols.textSecondary, marginTop: '4px', maxWidth: '150px' },
    squaresTopRight: { position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '4px' },
    squaresBottomLeft: { position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '4px', alignItems:"flex-end" },
    QRWrapper:   { position: 'absolute', bottom: '16px', right: '16px' },
    squareStyle,
  };
};

export function SkylineModernFront({ front, options }: { front: FrontProps; options: options }) {
  const vals = { ...defaultFrontValidators, ...(options.validators || {}) };
  const cols = { ...defaultColors, ...(options.colors || {}) };
  const styles = createStyles(cols);

  // apply validators
  const logo_image  = applyValidators(front.logo_image, vals.logo_image);
  const companyName = applyValidators(front.companyName, vals.companyName);
  const tagline     = applyValidators(front.tagline, vals.tagline);
  const fullName    = applyValidators(front.fullName, vals.fullName);
  const jobTitle    = applyValidators(front.jobTitle, vals.jobTitle);
  const phone       = applyValidators(front.phone, vals.phone);
  const email       = applyValidators(front.email, vals.email);
  const website     = applyValidators(front.website, vals.website);
  const address     = applyValidators(front.address, vals.address);

  return (
    <div style={styles.container}>
      <div style={styles.squaresTopRight}>
        {[8,12,16].map((size,i,arr) => <div key={i} style={styles.squareStyle(size, cols[(`color${arr.length-i}` as keyof typeof cols)])}></div>)}
      </div>
      <div style={styles.nameBlock}>
        <h1 style={styles.fullName}>{fullName}</h1>
        <p style={styles.jobTitle}>{jobTitle}</p>
      </div>
      <div style={styles.contactList}>
        <p style={styles.contactItem}><span style={styles.icons}>📞</span>{phone}</p>
        <p style={styles.contactItem}><span style={styles.icons}>✉️</span>{email}</p>
        {website && <p style={styles.contactItem}><span style={styles.icons}>🌐</span>{website}</p>}
        <p style={styles.contactItem}><span style={styles.icons}>📍</span>{address}</p>
      </div>
      <div style={styles.logoArea}>
        <img src={logo_image} alt="Logo" style={styles.logoImage} />
        <p style={styles.tagline}>{tagline.slice(0, 100)}</p>

      
      </div>
      <div style={styles.squaresBottomLeft}>
        {[16,12,8].map((size,i) => <div key={i} style={styles.squareStyle(size, cols[(`color${i+1}` as keyof typeof cols)])}></div>)}
      </div>
      
    </div>
  );
}

export function SkylineModernBack({ back, options }: { back: BackProps; options: options }) {
  const vals = { ...defaultBackValidators, ...(options.validators || {}) };
  const cols = { ...defaultColors, ...(options.colors || {}) };
  const stylesFactory = createStyles(cols);
  const styles = {
    ...stylesFactory,
    squaresTopLeft: { position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '4px' } as React.CSSProperties,
  };

  const logo_image  = applyValidators(back.logo_image, vals.logo_image);
  const companyName = applyValidators(back.companyName, vals.companyName);
  const tagline     = applyValidators(back.tagline, vals.tagline);
  const initial     = companyName.charAt(0).toUpperCase();

  return (
    <div style={{ ...styles.container, overflow: 'hidden' }}>
      <div style={styles.squaresTopLeft}>
        {[16,12,8].map((size,i) => <div key={i} style={styles.squareStyle(size, cols[(`color${i+1}` as keyof typeof cols)])}></div>)}
      </div>
      <div style={styles.logoArea}>
        <img src={logo_image} alt="Logo" style={styles.logoImage} />
        <p style={styles.tagline}>{tagline}</p>
      </div>
    </div>
  );
}

// Template export
const defaultOptions: options = { validators: defaultFrontValidators, colors: defaultColors };
export const SkylineModern: template & { options: options } = {
  front:   { component: SkylineModernFront, default: defaultSkylineFront },
  back:    { component: SkylineModernBack, default: defaultSkylineBack },
  options: defaultOptions,
};

export default SkylineModern;