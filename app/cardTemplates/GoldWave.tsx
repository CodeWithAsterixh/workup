import React from "react";
import QRCode from "react-qr-code";
import type { options, Validator, ValidatorRule, ValidatorsMap } from "~/components/Options";
import type { template } from ".";

// Semantic color keys for Gold Wave theme
export type ColorsMap = Record<
  | "backgroundFront"
  | "waveColor"
  | "textFront"
  | "backgroundBack"
  | "panelBack"
  | "textBack"
  | "accentBack",
  string
>;

// Helper: truncate based on validators
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
  brandName:  { maxLength: { value: 20, required: true, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  tagline:    { maxLength: { value: 40, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  qr_value:   { maxLength: { value: 100, required: false, type: "number" }, isUrl: { value: true, required: true, type: "boolean" } },
};

// Default validators for back props
const defaultBackValidators: ValidatorsMap = {
  fullName: { maxLength: { value: 20, required: true, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  jobTitle: { maxLength: { value: 30, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  address:  { maxLength: { value: 60, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  phone:    { maxLength: { value: 20, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  email:    { maxLength: { value: 40, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  website:  { maxLength: { value: 50, required: false, type: "number" }, isUrl: { value: true, required: false, type: "boolean" } },
};

// Default semantic colors
const defaultColors: ColorsMap = {
  backgroundFront: "#FFD700",
  waveColor:       "#000000",
  textFront:       "#FFFFFF",
  backgroundBack:  "#000000",
  panelBack:       "#FFD700",
  textBack:        "#FFFFFF",
  accentBack:      "#E0CFC3",
};

// Props types
type FrontProps = {
  logo_image: string;
  brandName: string;
  tagline: string;
  qr_value: string;
};
type BackProps = {
  fullName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  website: string;
};

export const defaultGoldWaveFront: FrontProps = {
  logo_image: "/logo.png",
  brandName:  "Brand Name",
  tagline:    "Tagline Space",
  qr_value:   "https://www.example.com",
};
export const defaultGoldWaveBack: BackProps = {
  fullName: "Your Name",
  jobTitle: "Graphic Designer",
  address:  "123 Dummy, Lorem Ipsum",
  phone:    "+00 1234 1234 1234",
  email:    "youremail@domain.com",
  website:  "www.yourwebsite.com",
};

// Styles factory
type Styles = Record<
  | "frontContainer"
  | "wave"
  | "logo"
  | "brand"
  | "tagline"
  | "qrWrapper"
  | "backContainer"
  | "panel"
  | "infoColumn"
  | "infoItem"
  | "icon"
  | "name"
  | "title",
  React.CSSProperties
>;
const createStyles = (cols: ColorsMap): Styles => ({
  frontContainer: { width: '100%', height: '100%', position: 'relative', fontFamily: 'sans-serif', overflow: 'hidden', borderRadius: 12, background: cols.backgroundFront } as React.CSSProperties,
  wave:           { position: 'absolute', bottom: 0, left: 0, width: '120%', height: '60%', background: cols.waveColor, clipPath: 'ellipse(50% 100% at 50% 0)', zIndex: 0 } as React.CSSProperties,
  logo:           { width: 48, height: 48, objectFit: 'contain', display: 'block', margin: '10px auto 16px', zIndex: 10 } as React.CSSProperties,
  brand:          { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: cols.textFront, position: 'relative', zIndex: 10, margin: 0 } as React.CSSProperties,
  tagline:        { fontSize: 10, textAlign: 'center', color: cols.textFront, position: 'relative', zIndex: 10, margin: 0 } as React.CSSProperties,
  qrWrapper:      {borderRadius:12, background: cols.backgroundFront, padding: 8, width:"100%", display:"flex", justifyContent:"center", boxShadow: '0 1px 4px rgba(0,0,0,0.06)', margin: '16px auto', position: 'relative', zIndex: 10 } as React.CSSProperties,
  backContainer: { width: '100%', height: '100%', position: 'relative', fontFamily: 'sans-serif', overflow: 'hidden', borderRadius: 12, background: cols.backgroundBack, color: cols.textBack, boxSizing: 'border-box', padding: 16 } as React.CSSProperties,
  panel:          { width: '60%', height: '100%', background: cols.panelBack, position: 'absolute', top: 0, left: 0, borderRadius: '0% 100% 40% 0% / 100% 100% 40% 0%' } as React.CSSProperties,
  infoColumn:     { display: 'flex', flexDirection: 'column', gap: 8, color: cols.textBack, padding: '16px 32px', position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, borderRadius: '0% 100% 40% 0% / 100% 100% 40% 0%' } as React.CSSProperties,
  infoItem:      { display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, wordBreak: 'break-all' } as React.CSSProperties,
  icon:          { width: 12, height: 12 } as React.CSSProperties,
  name:          { fontSize: 18, fontWeight: 'bold', margin: 0, color: cols.textBack } as React.CSSProperties,
  title:         { fontSize: 12, margin: 0, color: cols.textBack } as React.CSSProperties,
});

export function GoldWaveFront({ front, options }: { front: FrontProps; options: options }) {
  const vals = { ...defaultFrontValidators, ...(options.validators || {}) };
  const cols = { ...defaultColors, ...(options.colors || {}) };
  const styles = createStyles(cols);

  const logo_image = applyValidators(front.logo_image, vals.logo_image);
  const brandName  = applyValidators(front.brandName, vals.brandName);
  const tagline    = applyValidators(front.tagline, vals.tagline);
  const qrValue    = applyValidators(front.qr_value, vals.qr_value);

  return (
    <div style={styles.frontContainer}>
      <div style={styles.wave} />
      <img src={logo_image} alt="Logo" style={styles.logo} />
      <h1 style={styles.brand}>{brandName}</h1>
      <p style={styles.tagline}>{tagline}</p>
      <div style={styles.qrWrapper}>
        <QRCode value={qrValue} size={50} fgColor={cols.backgroundFront} />
      </div>
    </div>
  );
}

export function GoldWaveBack({ back, options }: { back: BackProps; options: options }) {
  const vals = { ...defaultBackValidators, ...(options.validators || {}) };
  const cols = { ...defaultColors, ...(options.colors || {}) };
  const styles = createStyles(cols);

  const fullName = applyValidators(back.fullName, vals.fullName);
  const jobTitle = applyValidators(back.jobTitle, vals.jobTitle);
  const address  = applyValidators(back.address, vals.address);
  const phone    = applyValidators(back.phone, vals.phone);
  const email    = applyValidators(back.email, vals.email);
  const website  = applyValidators(back.website, vals.website);

  return (
    <div style={styles.backContainer}>
      <div style={styles.panel} />
      <div style={styles.infoColumn}>
        <p style={styles.name}>{fullName}</p>
        <p style={styles.title}>{jobTitle}</p>
        <div style={styles.infoItem}><span style={styles.icon}>📍</span>{address}</div>
        <div style={styles.infoItem}><span style={styles.icon}>📞</span>{phone}</div>
        <div style={styles.infoItem}><span style={styles.icon}>✉️</span>{email}</div>
        <div style={styles.infoItem}><span style={styles.icon}>🌐</span>{website}</div>
      </div>
    </div>
  );
}

// Template export
const defaultOptions: options = { validators: defaultFrontValidators, colors: defaultColors };
export const GoldWave: template & { options: options } = {
  front: { component: GoldWaveFront, default: defaultGoldWaveFront },
  back:  { component: GoldWaveBack, default: defaultGoldWaveBack },
  options: defaultOptions,
};

export default GoldWave;