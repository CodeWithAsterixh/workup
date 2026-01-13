import React from "react";
import QRCode from "react-qr-code";
import type { Options, Validator, ValidatorRule, ValidatorsMap } from "~/components/Options";
import type { Template } from ".";

// Semantic color keys for Golden Bar theme
export type ColorsMap = Record<
  | "backgroundFront"
  | "barColor"
  | "textFront"
  | "backgroundBack"
  | "sideBarColor"
  | "barBackColor"
  | "textBack"
  | "accentBack",
  string
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
  companyName:{ maxLength: { value: 20, required: true, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  tagline:    { maxLength: { value: 40, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  website:    { maxLength: { value: 50, required: false, type: "number" }, isUrl: { value: true, required: false, type: "boolean" } },
};
// Default validators for back props
const defaultBackValidators: ValidatorsMap = {
  fullName: { maxLength: { value: 20, required: true, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  jobTitle: { maxLength: { value: 30, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  phone:    { maxLength: { value: 20, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  email:    { maxLength: { value: 40, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  location: { maxLength: { value: 60, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  website:  { maxLength: { value: 50, required: false, type: "number" }, isUrl: { value: true,  required: false, type: "boolean" } },
  qr_value: { maxLength: { value: 100, required: false, type: "number" }, isUrl: { value: true,  required: true,  type: "boolean" } },
};

// Default semantic colors
const defaultColors: ColorsMap = {
  backgroundFront: "#1B2A41",
  barColor:        "#D4AF37",
  textFront:       "#FFFFFF",
  backgroundBack:  "#FFFFFF",
  sideBarColor:    "#1B2A41",
  barBackColor:    "#D4AF37",
  textBack:        "#1B2A41",
  accentBack:      "#666666",
};

// Props
interface FrontProps {
  logo_image: string;
  companyName: string;
  tagline: string;
  website: string;
}
interface BackProps {
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  location: string;
  website: string;
  qr_value: string;
}

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
  qr_value:
    "https://www.yourwebsite.com",
};

// Styles factory
type Styles = Record<
  | "frontContainer"
  | "topSection"
  | "logo"
  | "company"
  | "tagline"
  | "bottomBar"
  | "websiteText"
  | "backContainer"
  | "sideBar"
  | "bar"
  | "infoBlock"
  | "name"
  | "title"
  | "contactItem"
  | "icon"
  | "qrWrapper",
  React.CSSProperties
>;
const createStyles = (cols: ColorsMap): Styles => ({
  frontContainer: { width: '100%', height: '100%', backgroundColor: cols.backgroundFront, position: 'relative', borderRadius: 12, overflow: 'hidden', fontFamily: 'sans-serif', color: cols.textFront } as React.CSSProperties,
  topSection:     { padding: '24px 16px 0', textAlign: 'center' } as React.CSSProperties,
  logo:           { width: '40px', height: '40px', objectFit: 'contain', marginBottom: 8 } as React.CSSProperties,
  company:        { fontSize: '16px', fontWeight: 'bold', margin: 0 } as React.CSSProperties,
  tagline:        { fontSize: '10px', margin: '4px 0', color: 'rgba(255,255,255,0.7)' } as React.CSSProperties,
  bottomBar:      { position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '80%', height: '36px', backgroundColor: cols.barColor, borderTopLeftRadius: 18, borderTopRightRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' } as React.CSSProperties,
  websiteText:    { fontSize: '10px', color: cols.backgroundFront, marginTop: -10 } as React.CSSProperties,
  backContainer: { width: '100%', height: '100%', backgroundColor: cols.backgroundBack, position: 'relative', borderRadius: 12, overflow: 'hidden', fontFamily: 'sans-serif', color: cols.textBack } as React.CSSProperties,
  sideBar:        { position: 'absolute', top: 0, bottom: 0, left: 0, width: '40px', backgroundColor: cols.sideBarColor } as React.CSSProperties,
  bar:            { position: 'absolute', top: 0, left: '40px', right: 0, height: '32px', backgroundColor: cols.barBackColor } as React.CSSProperties,
  infoBlock:      { position: 'relative', margin: '48px 16px 16px 56px', display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10 } as React.CSSProperties,
  name:           { fontSize: 16, fontWeight: 'bold', margin: 0, color: cols.textBack } as React.CSSProperties,
  title:          { fontSize: 12, margin: 0, color: cols.accentBack } as React.CSSProperties,
  contactItem:    { display: 'flex', alignItems: 'center', gap: 6 } as React.CSSProperties,
  icon:           { width: '12px', height: '12px' } as React.CSSProperties,
  qrWrapper:      { position: 'absolute', bottom: 16, right: 16, background: cols.backgroundBack, padding: 8, borderRadius: 8, boxShadow: '0 0 5px rgba(0,0,0,0.1)' } as React.CSSProperties,
});

export function GoldenBarFront({ front, options }: Readonly<{ front: FrontProps; options: Options }>) {
  const vals = { ...defaultFrontValidators, ...(options.validators) };
  const cols = { ...defaultColors, ...(options.colors) };
  const styles = createStyles(cols);

  const logo_image = applyValidators(front.logo_image, vals.logo_image);
  const companyName = applyValidators(front.companyName, vals.companyName);
  const tagline = applyValidators(front.tagline, vals.tagline);
  const website = applyValidators(front.website, vals.website);

  return (
    <div style={styles.frontContainer}>
      <div style={styles.topSection}>
        <img src={logo_image} alt="Logo" style={styles.logo} />
        <p style={styles.company}>{companyName}</p>
        <p style={styles.tagline}>{tagline}</p>
      </div>
      <div style={styles.bottomBar}>
        <p style={styles.websiteText}>{website}</p>
      </div>
    </div>
  );
}

export function GoldenBarBack({ back, options }: Readonly<{ back: BackProps; options: Options }>) {
  const vals = { ...defaultBackValidators, ...(options.validators) };
  const cols = { ...defaultColors, ...(options.colors) };
  const styles = createStyles(cols);

  const fullName = applyValidators(back.fullName, vals.fullName);
  const jobTitle = applyValidators(back.jobTitle, vals.jobTitle);
  const phone = applyValidators(back.phone, vals.phone);
  const email = applyValidators(back.email, vals.email);
  const location = applyValidators(back.location, vals.location);
  const website = applyValidators(back.website, vals.website);
  const qrValue = applyValidators(back.qr_value, vals.qr_value);

  return (
    <div style={styles.backContainer}>
      <div style={styles.sideBar} />
      <div style={styles.bar} />
      <div style={styles.infoBlock}>
        <p style={styles.name}>{fullName}</p>
        <p style={styles.title}>{jobTitle}</p>
        <div style={styles.contactItem}><span style={styles.icon}>📞</span>{phone}</div>
        <div style={styles.contactItem}><span style={styles.icon}>✉️</span>{email}</div>
        <div style={styles.contactItem}><span style={styles.icon}>📍</span>{location}</div>
        <div style={styles.contactItem}><span style={styles.icon}>🌐</span>{website}</div>
      </div>
      <div style={styles.qrWrapper}>
        <QRCode value={qrValue} size={80} fgColor={cols.sideBarColor} />
      </div>
    </div>
  );
}

// Template export
const defaultOptions: Options = { validators: defaultFrontValidators, colors: defaultColors };
export const GoldenBar: Template & { options: Options } = {
  front: { component: GoldenBarFront, default: defaultGoldenBarFront },
  back:  { component: GoldenBarBack, default: defaultGoldenBarBack },
  options: defaultOptions,
};

export default GoldenBar;