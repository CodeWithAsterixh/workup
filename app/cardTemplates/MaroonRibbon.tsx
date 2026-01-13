import React from "react";
import QRCode from "react-qr-code";
import type { Options, Validator, ValidatorRule, ValidatorsMap } from "~/components/Options";
import type { Template } from ".";

// Semantic color keys for Maroon Ribbon theme
export type ColorsMap = Record<
  | "backgroundFront"
  | "ribbonColor"
  | "logoBackground"
  | "textFront"
  | "backgroundBack"
  | "stripeColor"
  | "ribbonBackColor"
  | "textBack"
  | "dividerBack",
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
  tagline:     { maxLength: { value: 40, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  website:     { maxLength: { value: 50, required: false, type: "number" }, isUrl: { value: true, required: false, type: "boolean" } },
};
// Default validators for back props
const defaultBackValidators: ValidatorsMap = {
  fullName: { maxLength: { value: 20, required: true, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  jobTitle: { maxLength: { value: 30, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  phone:    { maxLength: { value: 20, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  email:    { maxLength: { value: 40, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  location: { maxLength: { value: 60, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  website:  { maxLength: { value: 50, required: false, type: "number" }, isUrl: { value: true, required: false, type: "boolean" } },
  qr_value: { maxLength: { value: 100, required: false, type: "number" }, isUrl: { value: true, required: true, type: "boolean" } },
};

// Default semantic colors
const defaultColors: ColorsMap = {
  backgroundFront:  "#3B0A45",
  ribbonColor:      "#CFA18D",
  logoBackground:  "#FFFFFF",
  textFront:       "#FFFFFF",
  backgroundBack:  "#FFFFFF",
  stripeColor:     "#3B0A45",
  ribbonBackColor: "#CFA18D",
  textBack:        "#3B0A45",
  dividerBack:     "#E5E7EB",
};

// Props types
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

// Styles factory
type Styles = Record<
  | "container"
  | "ribbon"
  | "logoArea"
  | "logo"
  | "company"
  | "tagline"
  | "websiteText"
  | "backContainer"
  | "sideStripe"
  | "topRibbon"
  | "infoBlock"
  | "name"
  | "title"
  | "contactItem"
  | "icon"
  | "qrWrapper",
  React.CSSProperties
>;
const createStyles = (cols: ColorsMap): Styles => ({
  container:     { width: '100%', height: '100%', backgroundColor: cols.backgroundFront, position: 'relative', borderRadius: '12px', overflow: 'hidden', fontFamily: 'sans-serif', color: cols.textFront, padding: '24px 16px', boxSizing: 'border-box' },
  ribbon:        { position: 'absolute', top: 'calc(50% + 20px)', left: 0, width: '100%', height: '36px', backgroundColor: cols.ribbonColor, transform: 'translateY(-50%)' },
  logoArea:     { position: 'absolute', top: 'calc(50% - 50px)', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: cols.logoBackground, padding: '12px', borderRadius: '50%', boxShadow: '0 0 8px rgba(0,0,0,0.2)' },
  logo:         { width: '48px', height: '48px', objectFit: 'contain' },
  company:      { marginTop: '72px', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', zIndex: 10, position: 'relative' },
  tagline:      { fontSize: '10px', marginTop: '12px', textAlign: 'center', color: 'rgba(224,207,195,0.7)', zIndex: 10, position: 'relative' },
  websiteText:  { position: 'absolute', bottom: '12px', width: '100%', textAlign: 'center', fontSize: '10px', color: cols.stripeColor },
  backContainer:{ width: '100%', height: '100%', backgroundColor: cols.backgroundBack, position: 'relative', borderRadius: '12px', overflow: 'hidden', fontFamily: 'sans-serif', color: cols.textBack, padding: '16px 16px 56px 56px', boxSizing: 'border-box' },
  sideStripe:   { position: 'absolute', top: 0, bottom: 0, left: 0, width: '40px', backgroundColor: cols.stripeColor, borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' },
  topRibbon:    { position: 'absolute', top: 0, left: '40px', right: 0, height: '24px', backgroundColor: cols.ribbonBackColor, borderBottomRightRadius: '12px' },
  infoBlock:    { position: 'relative', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '10px' },
  name:         { fontSize: '16px', fontWeight: 'bold', margin: 0 },
  title:        { fontSize: '12px', margin: 0, color: cols.dividerBack },
  contactItem:  { display: 'flex', alignItems: 'center', gap: '6px' },
  icon:         { width: '12px', height: '12px' },
  qrWrapper:    { position: 'absolute', bottom: '16px', right: '16px', padding: '8px', borderRadius: '8px', backgroundColor: cols.backgroundBack, boxShadow: '0 0 4px rgba(0,0,0,0.1)' },
});

export function MaroonRibbonFront({ front, options }: Readonly<{ front: FrontProps; options: Options }>) {
  const vals = { ...defaultFrontValidators, ...(options.validators) };
  const cols = { ...defaultColors, ...(options.colors) };
  const styles = createStyles(cols);

  const logo_image  = applyValidators(front.logo_image, vals.logo_image);
  const companyName = applyValidators(front.companyName, vals.companyName);
  const tagline     = applyValidators(front.tagline, vals.tagline);
  const website     = applyValidators(front.website, vals.website);

  return (
    <div style={styles.container}>
      <div style={styles.ribbon} />
      <div style={styles.logoArea}>
        <img src={logo_image} alt="Logo" style={styles.logo} />
      </div>
      <p style={styles.company}>{companyName}</p>
      <p style={styles.tagline}>{tagline}</p>
      <p style={styles.websiteText}>{website}</p>
    </div>
  );
}

export function MaroonRibbonBack({ back, options }: Readonly<{ back: BackProps; options: Options }>) {
  const vals = { ...defaultBackValidators, ...(options.validators) };
  const cols = { ...defaultColors, ...(options.colors) };
  const styles = createStyles(cols);

  const fullName = applyValidators(back.fullName, vals.fullName);
  const jobTitle = applyValidators(back.jobTitle, vals.jobTitle);
  const phone    = applyValidators(back.phone, vals.phone);
  const email    = applyValidators(back.email, vals.email);
  const location = applyValidators(back.location, vals.location);
  const website  = applyValidators(back.website, vals.website);
  const qrValue  = applyValidators(back.qr_value, vals.qr_value);

  return (
    <div style={styles.backContainer}>
      <div style={styles.sideStripe} />
      <div style={styles.topRibbon} />
      <div style={styles.infoBlock}>
        <p style={styles.name}>{fullName}</p>
        <p style={styles.title}>{jobTitle}</p>
        <div style={styles.contactItem}><span style={styles.icon}>📞</span>{phone}</div>
        <div style={styles.contactItem}><span style={styles.icon}>✉️</span>{email}</div>
        <div style={styles.contactItem}><span style={styles.icon}>📍</span>{location}</div>
        <div style={styles.contactItem}><span style={styles.icon}>🌐</span>{website}</div>
      </div>
      <div style={styles.qrWrapper}>
        <QRCode value={qrValue} size={72} fgColor={cols.textBack} />
      </div>
    </div>
  );
}

// Template export
const defaultOptions: Options = { validators: defaultFrontValidators, colors: defaultColors };
export const MaroonRibbon: Template & { options: Options } = {
  front: { component: MaroonRibbonFront, default: defaultMaroonRibbonFront },
  back:  { component: MaroonRibbonBack, default: defaultMaroonRibbonBack },
  options: defaultOptions,
};

export default MaroonRibbon;