import React from "react";
import QRCode from "react-qr-code";
import type { options, Validator, ValidatorRule, ValidatorsMap } from "~/components/Options";
import type { template } from ".";

// Semantic color keys for Futuristic Fusion theme
export type ColorsMap = Record<
  | "background"
  | "patternColor"
  | "neonCircleCyan"
  | "neonCircleMagenta"
  | "textPrimary"
  | "textSecondary"
  | "logoColor", string
>;

// Truncate values using validators
const applyValidators = (
  value: string,
  rules: Record<keyof Validator, ValidatorRule>
): string => {
  const maxLen = rules.maxLength.value as number;
  return value.slice(0, maxLen);
};

// Default validators for front props
const defaultFrontValidators: ValidatorsMap = {
  logo_image: { maxLength: { value: 100, required: false, type: "number" }, isUrl: { value: true, required: true, type: "boolean" } },
  fullName:   { maxLength: { value: 20, required: true, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  jobTitle:   { maxLength: { value: 30, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  phone:      { maxLength: { value: 20, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  email:      { maxLength: { value: 40, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  website:    { maxLength: { value: 50, required: false, type: "number" }, isUrl: { value: true, required: false, type: "boolean" } },
};
// Default validators for back props
const defaultBackValidators: ValidatorsMap = {
  logo_image: { ...defaultFrontValidators.logo_image },
  companyName:{ maxLength: { value: 20, required: true, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  tagline:    { maxLength: { value: 40, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
};

// Default semantic colors
const defaultColors: ColorsMap = {
  background:      "#0D0F13",
  patternColor:    "rgba(14,17,23,0.2)",
  neonCircleCyan:  "rgba(40,40,190,0.5)",
  neonCircleMagenta: "rgba(190,40,190,0.5)",
  textPrimary:     "#E0E6FF",
  textSecondary:   "#8A95B1",
  logoColor:       "#E0E6FF",
};

// Props types
interface FrontProps {
  logo_image: string;
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  website: string;
}
interface BackProps {
  logo_image: string;
  companyName: string;
  tagline: string;
}

export const defaultFuturisticFront: FrontProps = {
  logo_image: "/logo.png",
  fullName:   "Avery Nova",
  jobTitle:   "Chief Technologist",
  phone:      "+1 (800) 555-0199",
  email:      "avery.nova@fusiontech.com",
  website:    "fusiontech.com",
};
export const defaultFuturisticBack: BackProps = {
  logo_image: "/logo.png",
  companyName:"Fusion Tech",
  tagline:   "Shaping Tomorrow, Today",
};

// Styles factory including neon blobs and grid
const createStyles = (cols: ColorsMap) => ({
  container: {
    background: cols.background,
    color: cols.textPrimary,
    width: '100%', height: '100%', position: 'relative', fontFamily: 'sans-serif', overflow: 'hidden', padding: 24, boxSizing: 'border-box'
  } as React.CSSProperties,
  pattern: {
    position: 'absolute', top: 0, right: '-20%', width: '200%', height: '200%',
    backgroundImage: `repeating-linear-gradient(60deg, ${cols.patternColor} 0, ${cols.patternColor} 1px, transparent 1px, transparent 20px)`,
    transform: 'rotate(30deg)'
  } as React.CSSProperties,
  logo: {
    position: 'absolute', top: 24, left: 24, width: 48, height: 48, objectFit: 'contain', filter: `drop-shadow(0 0 5px ${cols.logoColor})`
  } as React.CSSProperties,
  neonBlob: (size: number, x: string, y: string): React.CSSProperties => ({
    position: 'absolute', width: size, height: size, borderRadius: '50%', top: y, left: x,
    background: `radial-gradient(circle, ${cols.neonCircleCyan} 0%, rgba(0,0,0,0) 40%, ${cols.neonCircleCyan} 0.2 70%, transparent 100%)`
  }),
  neonBlob2: (size: number, x: string, y: string): React.CSSProperties => ({
    position: 'absolute', width: size, height: size, borderRadius: '50%', top: y, left: x,
    background: `radial-gradient(circle, ${cols.neonCircleMagenta} 0%, rgba(0,0,0,0) 40%, ${cols.neonCircleMagenta} 0.2 70%, transparent 100%)`
  }),
  infoBlock: {
    position: 'absolute', bottom: 24, left: 24, display: 'flex', flexDirection: 'column', gap: 8
  } as React.CSSProperties,
  name:    { fontSize: 18, fontWeight: 700, margin: 0 } as React.CSSProperties,
  title:   { fontSize: 12, color: cols.textSecondary, margin: 0 } as React.CSSProperties,
  contact: { display: 'flex', flexDirection: 'column', gap: 4, fontSize: 10, color: cols.textSecondary } as React.CSSProperties,
  contactItem: { display: 'flex', alignItems: 'center', gap: 6 } as React.CSSProperties,

  backContainer: { background: cols.background, width: '100%', height: '100%', position: 'relative', overflow: 'hidden', padding: 24, boxSizing: 'border-box' } as React.CSSProperties,
  grid: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `linear-gradient(#1C2028 1px, transparent 1px), linear-gradient(90deg, #1C2028 1px, transparent 1px)`, backgroundSize: '20px 20px', opacity: 0.2 } as React.CSSProperties,
  center: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' } as React.CSSProperties,
  company: { fontSize: 20, fontWeight: 700, margin: 0 } as React.CSSProperties,
  tagline: { fontSize: 10, color: cols.textSecondary, margin: '8px 0 0' } as React.CSSProperties,
});

export function FuturisticFusionFront({ front, options }: { front: FrontProps; options: options }) {
  const vals = { ...defaultFrontValidators, ...(options.validators || {}) };
  const cols = { ...defaultColors, ...(options.colors || {}) };
  const styles = createStyles(cols);

  const logo_image = applyValidators(front.logo_image, vals.logo_image);
  const fullName = applyValidators(front.fullName, vals.fullName);
  const jobTitle = applyValidators(front.jobTitle, vals.jobTitle);
  const phone = applyValidators(front.phone, vals.phone);
  const email = applyValidators(front.email, vals.email);
  const website = applyValidators(front.website, vals.website);

  return (
    <div style={styles.container}>
      <div style={styles.pattern} />
      <img src={logo_image} alt="Logo" style={styles.logo} />
      <div style={styles.neonBlob(120, '60%', '20%')} />
      <div style={styles.neonBlob2(80, '10%', '70%')} />
      <div style={styles.infoBlock}>
        <h1 style={styles.name}>{fullName}</h1>
        <p style={styles.title}>{jobTitle}</p>
        <div style={styles.contact}>
          <p style={styles.contactItem}>📞 {phone}</p>
          <p style={styles.contactItem}>✉️ {email}</p>
          <p style={styles.contactItem}>🌐 {website}</p>
        </div>
      </div>
    </div>
  );
}

export function FuturisticFusionBack({ back, options }: { back: BackProps; options: options }) {
  const vals = { ...defaultBackValidators, ...(options.validators || {}) };
  const cols = { ...defaultColors, ...(options.colors || {}) };
  const styles = createStyles(cols);

  const logo_image = applyValidators(back.logo_image, vals.logo_image);
  const companyName = applyValidators(back.companyName, vals.companyName);
  const tagline = applyValidators(back.tagline, vals.tagline);

  return (
    <div style={styles.backContainer}>
      <div style={styles.grid} />
      <div style={styles.center}>
        <img src={logo_image} alt="Logo" style={{ width: 64, height: 64, marginBottom: 8 }} />
        <h1 style={styles.company}>{companyName}</h1>
        <p style={styles.tagline}>{tagline}</p>
      </div>
    </div>
  );
}

// Template export
const defaultOptions: options = { validators: defaultFrontValidators, colors: defaultColors };
export const FuturisticFusion: template & { options: options } = {
  front: { component: FuturisticFusionFront, default: defaultFuturisticFront },
  back:  { component: FuturisticFusionBack, default: defaultFuturisticBack },
  options: defaultOptions,
};

export default FuturisticFusion;