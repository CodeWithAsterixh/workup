import React from "react";
import QRCode from "react-qr-code";
import type { Options, Validator, ValidatorRule, ValidatorsMap } from "~/components/Options";
import type { Template } from ".";

// Semantic color keys for Modern Elegant theme
type ColorsMap = Record<
  | "backgroundFront"
  | "textFront"
  | "accent"
  | "backgroundBack"
  | "textBack"
  | "divider",
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

// Default validators for front props
const defaultFrontValidators: ValidatorsMap = {
  logo_image:  { maxLength: { value: 100, required: false, type: "number" }, isUrl: { value: true, required: true, type: "boolean" } },
  companyName:{ maxLength: { value: 20, required: true, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  slogan:      { maxLength: { value: 40, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  website:     { maxLength: { value: 50, required: false, type: "number" }, isUrl: { value: true, required: false, type: "boolean" } },
};
// Default validators for back props
const defaultBackValidators: ValidatorsMap = {
  fullName: { maxLength: { value: 20, required: true, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  jobTitle: { maxLength: { value: 30, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  phone:    { maxLength: { value: 20, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  email:    { maxLength: { value: 40, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  address:  { maxLength: { value: 60, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  website:  { maxLength: { value: 50, required: false, type: "number" }, isUrl: { value: true, required: false, type: "boolean" } },
};

// Semantic default colors
const defaultColors: ColorsMap = {
  backgroundFront: "#274492",
  textFront:       "#FFFFFF",
  accent:          "#2563EB",
  backgroundBack:  "#FFFFFF",
  textBack:        "#1A1A1A",
  divider:         "#E5E7EB",
};

// Props types
type FrontProps = {
  logo_image: string;
  companyName: string;
  slogan: string;
  website: string;
};
type BackProps = {
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
  website: "www.yourwebsite.com",
};

// Styles factory
const createStyles = (cols: ColorsMap) => ({
  frontContainer:     { backgroundColor: cols.backgroundFront, width: '100%', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '16px', boxSizing: 'border-box' } as React.CSSProperties,
  logoWrapper:        { width: '80px', height: '80px', marginBottom: '12px' } as React.CSSProperties,
  logoImage:          { width: '100%', height: '100%', objectFit: 'contain' } as React.CSSProperties,
  companyName:        { color: cols.textFront, fontSize: '20px', fontWeight: 'bold', margin: 0 } as React.CSSProperties,
  slogan:             { color: 'rgba(255,255,255,0.7)', fontSize: '12px', margin: '4px 0 20px' } as React.CSSProperties,
  websiteLink:        { position: 'absolute', bottom: '12px', left: '16px', color: cols.textFront, fontSize: '10px', textDecoration: 'none' } as React.CSSProperties,
  backContainer:      { backgroundColor: cols.backgroundBack, width: '100%', height: '100%', position: 'relative', overflow: 'hidden', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' } as React.CSSProperties,
  header:             { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } as React.CSSProperties,
  nameSection:        { display: 'flex', flexDirection: 'column' } as React.CSSProperties,
  fullName:           { fontSize: '16px', fontWeight: 'bold', margin: 0 } as React.CSSProperties,
  jobTitle:           { fontSize: '10px', color: cols.textBack, margin: 0 } as React.CSSProperties,
  qrWrapper:          { width: '50px', height: '50px', padding: '4px', backgroundColor: cols.backgroundBack, border: `1px solid ${cols.divider}` } as React.CSSProperties,
  contacts:           { display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '10px', color: cols.textBack } as React.CSSProperties,
  contactItem:        { display: 'flex', alignItems: 'center', gap: '6px' } as React.CSSProperties,
  footer:             { textAlign: 'right', fontSize: '8px', color: cols.divider } as React.CSSProperties,
});

export function ModernElegantFront({ front, options }: Readonly<{ front: FrontProps; options: Options }>) {
  const vals = { ...defaultFrontValidators, ...(options.validators) };
  const cols = { ...defaultColors, ...(options.colors) };
  const styles = createStyles(cols);

  const logo_image  = applyValidators(front.logo_image, vals.logo_image);
  const companyName = applyValidators(front.companyName, vals.companyName);
  const slogan      = applyValidators(front.slogan, vals.slogan);
  const website     = applyValidators(front.website, vals.website);

  return (
    <div style={styles.frontContainer}>
      <div style={styles.logoWrapper}>
        <img src={logo_image} alt="Logo" style={styles.logoImage} />
      </div>
      <h1 style={styles.companyName}>{companyName}</h1>
      <p style={styles.slogan}>{slogan}</p>
      <a href={`https://${website}`} style={styles.websiteLink}>{website}</a>
    </div>
  );
}

export function ModernElegantBack({ back, options }: Readonly<{ back: BackProps; options: Options }>) {
  const vals = { ...defaultBackValidators, ...(options.validators) };
  const cols = { ...defaultColors, ...(options.colors) };
  const styles = createStyles(cols);

  const fullName = applyValidators(back.fullName, vals.fullName);
  const jobTitle = applyValidators(back.jobTitle, vals.jobTitle);
  const phone    = applyValidators(back.phone, vals.phone);
  const email    = applyValidators(back.email, vals.email);
  const address  = applyValidators(back.address, vals.address);
  const website  = applyValidators(back.website, vals.website);

  return (
    <div style={styles.backContainer}>
      <div style={styles.header}>
        <div style={styles.nameSection}>
          <h2 style={styles.fullName}>{fullName}</h2>
          <p style={styles.jobTitle}>{jobTitle}</p>
        </div>
        <div style={styles.qrWrapper}>
          <QRCode value={`https://${website}`} size={46} fgColor={cols.textBack} />
        </div>
      </div>
      <div style={styles.contacts}>
        <p style={styles.contactItem}>📞 {phone}</p>
        <p style={styles.contactItem}>✉️ {email}</p>
        <p style={styles.contactItem}>📍 {address}</p>
      </div>
      <div style={styles.footer}>{website}</div>
    </div>
  );
}

// Template export
const defaultOptions: Options = { validators: defaultFrontValidators, colors: defaultColors };
export const ModernElegant: Template & { options: Options } = {
  front: { component: ModernElegantFront, default: defaultModernFront },
  back:  { component: ModernElegantBack, default: defaultModernBack },
  options: defaultOptions,
};

export default ModernElegant;