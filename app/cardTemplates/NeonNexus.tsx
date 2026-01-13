import React from "react";
import QRCode from "react-qr-code";
import type { Options, Validator, ValidatorRule, ValidatorsMap } from "~/components/Options";
import type { Template } from ".";

// Colors map type: semantic names for neon theme
export type ColorsMap = Record<
  | "backgroundGradientStart"
  | "backgroundGradientEnd"
  | "textPrimary"
  | "accent"
  | "blobCyan"
  | "blobMagenta"
  | "blobGreen",
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

// Default validators
const defaultFrontValidators: ValidatorsMap = {
  logo_image: { maxLength: { value: 100, required: false, type: "number" }, isUrl: { value: true, required: true, type: "boolean" } },
  fullName:   { maxLength: { value: 20, required: true, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  jobTitle:   { maxLength: { value: 30, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  phone:      { maxLength: { value: 20, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  email:      { maxLength: { value: 40, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  website:    { maxLength: { value: 50, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
};
const defaultBackValidators: ValidatorsMap = {
  logo_image: defaultFrontValidators.logo_image,
  tagline:    { maxLength: { value: 60, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  qr_value:   { maxLength: { value: 100, required: false, type: "number" }, isUrl: { value: true, required: true, type: "boolean" } },
};

// Default semantic colors
const defaultColors: ColorsMap = {
  backgroundGradientStart: "#001133",
  backgroundGradientEnd:   "#000000",
  textPrimary:            "#FFFFFF",
  accent:                 "#00FFFF",
  blobCyan:               "rgba(0,255,255,0.5)",
  blobMagenta:            "rgba(255,0,255,0.5)",
  blobGreen:              "rgba(0,255,0,0.5)",
};

// Props types
interface FrontProps {
  logo_image: string;
  fullName:   string;
  jobTitle:   string;
  phone:      string;
  email:      string;
  website:    string;
}
interface BackProps {
  logo_image: string;
  tagline:    string;
  qr_value:   string;
}

export const defaultNeonNexusFront: FrontProps = {
  logo_image: "/logo.png",
  fullName:   "Jane Doe",
  jobTitle:   "Creative Director",
  phone:      "123-456-7890",
  email:      "jane.doe@example.com",
  website:    "www.example.com",
};
export const defaultNeonNexusBack: BackProps = {
  logo_image: "/logo.png",
  tagline:    "Innovate the Future",
  qr_value:   "https://www.example.com",
};

// Styles factory
type Styles = Record<
  | "container"
  | "patternOverlay"
  | "name"
  | "title"
  | "contactList"
  | "contactItem"
  | "icon"
  | "logo"
  | "blob"
  | "qrWrapper",
  React.CSSProperties
> & { blob: (top: string, left: string, size: number, color: string) => React.CSSProperties };
const createStyles = (cols: ColorsMap): Styles => ({
  container: {
    width: '100%', height: '100%', position: 'relative', padding: '16px', boxSizing: 'border-box',
    background: `linear-gradient(to bottom, ${cols.backgroundGradientStart}, ${cols.backgroundGradientEnd})`,
    fontFamily: 'sans-serif', color: cols.textPrimary, overflow: 'hidden',
  },
  patternOverlay: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
    backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 10px)',
    pointerEvents: 'none',
  },
  name:        { fontSize: '20px', fontWeight: 'bold', margin: 0 },
  title:       { fontSize: '12px', margin: '4px 0 16px', color: cols.textPrimary },
  contactList: { display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '10px', marginTop: 'auto' },
  contactItem: { display: 'flex', alignItems: 'center', gap: '6px' },
  icon:        { width: '12px', height: '12px' },
  logo:        { position: 'absolute', top: '16px', right: '16px', width: '50px', height: '50px', objectFit: 'contain', filter: 'drop-shadow(0 0 5px '+cols.accent+')' },
  qrWrapper:   { padding: '8px', backgroundColor: cols.backgroundGradientEnd, borderRadius: '8px' },
  blob: (top, left, size, color) => ({ position: 'absolute', top, left, width: size, height: size, backgroundColor: color, borderRadius: '50%', filter: 'blur(20px)', opacity: 0.3 }),
});

export function NeonNexusFront({ front, options }: Readonly<{ front: FrontProps; options: Options }>) {
  const vals = { ...defaultFrontValidators, ...(options.validators) };
  const cols = { ...defaultColors, ...(options.colors) };
  const styles = createStyles(cols);

  // apply validators
  const logo_image = applyValidators(front.logo_image, vals.logo_image);
  const fullName   = applyValidators(front.fullName, vals.fullName);
  const jobTitle   = applyValidators(front.jobTitle, vals.jobTitle);
  const phone      = applyValidators(front.phone, vals.phone);
  const email      = applyValidators(front.email, vals.email);
  const website    = applyValidators(front.website, vals.website);

  return (
    <div style={styles.container}>
      {/* Neon blobs */}
      <div style={styles.blob('10%','20%',120,cols.blobCyan)} />
      <div style={styles.blob('60%','10%',180,cols.blobMagenta)} />
      <div style={styles.blob('30%','70%',140,cols.blobGreen)} />
      {/* Pattern overlay */}
      <div style={styles.patternOverlay} />
      {/* Logo */}
      <img src={logo_image} alt="Logo" style={styles.logo} />
      {/* Text */}
      <h1 style={styles.name}>{fullName}</h1>
      <p style={styles.title}>{jobTitle}</p>
      {/* Contact */}
      <div style={styles.contactList}>
        <div style={styles.contactItem}><span style={styles.icon}>📞</span>{phone}</div>
        <div style={styles.contactItem}><span style={styles.icon}>✉️</span>{email}</div>
        <div style={styles.contactItem}><span style={styles.icon}>🌐</span>{website}</div>
      </div>
    </div>
  );
}

export function NeonNexusBack({ back, options }: Readonly<{ back: BackProps; options: Options }>) {
  const vals = { ...defaultBackValidators, ...(options.validators) };
  const cols = { ...defaultColors, ...(options.colors) };
  const styles = createStyles(cols);

  const logo_image = applyValidators(back.logo_image, vals.logo_image);
  const tagline    = applyValidators(back.tagline, vals.tagline);
  const qrValue    = applyValidators(back.qr_value, vals.qr_value);

  return (
    <div style={styles.container}>
      <img src={logo_image} alt="Logo" style={styles.logo} />
      <p style={styles.title}>{tagline}</p>
      <div style={styles.qrWrapper}><QRCode value={qrValue} size={72} fgColor={cols.textPrimary} /></div>
    </div>
  );
}

// Template export
const defaultOptions: Options = { validators: defaultFrontValidators, colors: defaultColors };
export const NeonNexus: Template & { options: Options } = {
  front: { component: NeonNexusFront, default: defaultNeonNexusFront },
  back:  { component: NeonNexusBack, default: defaultNeonNexusBack },
  options: defaultOptions,
};

export default NeonNexus;