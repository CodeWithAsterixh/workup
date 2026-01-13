import React from "react";
import QRCode from "react-qr-code";
import type { Options, Validator, ValidatorRule, ValidatorsMap } from "~/components/Options";

export type ColorsMap = Record<
  | "background"
  | "curveColor"
  | "textPrimary"
  | "textSecondary"
  | "qrBackground",
  string
>;

const applyValidators = (
  value: string,
  rules: Record<keyof Validator, ValidatorRule>
): string => {
  const maxLen = rules.maxLength.value as number;
  return value.slice(0, maxLen);
};

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
  address: string;
  qr_value: string;
}

export const defaultEmeraldCurveFront: FrontProps = {
  logo_image: "/logo.png",
  companyName: "Your Company",
  tagline: "Your tagline here",
  website: "www.yourwebsite.com",
};

export const defaultEmeraldCurveBack: BackProps = {
  fullName: "John Smith",
  jobTitle: "Software Developer",
  phone: "+123 123 1234",
  email: "info@yourwebsite.com",
  address: "120 Lorem Street, City, Country",
  qr_value: "https://www.yourwebsite.com",
};

const defaultFrontValidators: ValidatorsMap = {
  logo_image: { maxLength: { value: 100, required: false, type: "number" }, isUrl: { value: true, required: true, type: "boolean" } },
  companyName: { maxLength: { value: 20, required: true, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  tagline: { maxLength: { value: 40, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  website: { maxLength: { value: 50, required: false, type: "number" }, isUrl: { value: true, required: false, type: "boolean" } },
};

const defaultBackValidators: ValidatorsMap = {
  fullName: defaultFrontValidators.companyName,
  jobTitle: defaultFrontValidators.tagline,
  phone: { maxLength: { value: 20, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  email: { maxLength: { value: 40, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  address: { maxLength: { value: 60, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  qr_value: { maxLength: { value: 100, required: true, type: "number" }, isUrl: { value: true, required: true, type: "boolean" } },
};

const defaultColors: ColorsMap = {
  background: "#1A1A1A",
  curveColor: "#00B050",
  textPrimary: "#FFFFFF",
  textSecondary: "#CCCCCC",
  qrBackground: "#000000",
};

const createStyles = (cols: ColorsMap) => ({
  container: {
    width: '100%', height: '100%', backgroundColor: cols.background,
    position: 'relative', borderRadius: '12px', overflow: 'hidden',
    fontFamily: 'sans-serif', color: cols.textPrimary, padding: 16, boxSizing: 'border-box'
  } as React.CSSProperties,
  curveRight: {
    position: 'absolute', top: 0, right: 0, width: '60%', height: '100%',
    backgroundColor: cols.curveColor,
    borderTopLeftRadius: 200, borderBottomLeftRadius: 200
  } as React.CSSProperties,
  curveLeft: {
    position: 'absolute', bottom: 0, left: 0, width: '60%', height: '100%',
    backgroundColor: cols.curveColor,
    borderTopRightRadius: 200, borderBottomRightRadius: 200
  } as React.CSSProperties,
  logoArea: {
    position: 'absolute', top: 16, left: 16, display: 'flex', alignItems: 'center', gap: 8
  } as React.CSSProperties,
  logo: {
    width: 40, height: 40, objectFit: 'contain'
  } as React.CSSProperties,
  textBlock: {
    maxWidth: 100
  } as React.CSSProperties,
  company: {
    fontSize: 14, fontWeight: 'bold', margin: 0
  } as React.CSSProperties,
  tagline: {
    fontSize: 8, color: cols.textSecondary, margin: 0
  } as React.CSSProperties,
  website: {
    position: 'absolute', bottom: 16, left: 16, fontSize: 10, color: cols.textSecondary, margin: 0
  } as React.CSSProperties,
  infoBlock: {
    position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10
  } as React.CSSProperties,
  name: { fontSize: 16, fontWeight: 'bold', margin: 0 } as React.CSSProperties,
  title: { fontSize: 12, margin: 0, color: cols.textSecondary } as React.CSSProperties,
  contactItem: { display: 'flex', alignItems: 'center', gap: 6 } as React.CSSProperties,
  qrWrapper: {
    position: 'absolute', bottom: 16, right: 16, background: cols.qrBackground,
    padding: 8, borderRadius: 8, zIndex: 1
  } as React.CSSProperties,
});

export function EmeraldCurveFront({ front, options }: Readonly<{ front: FrontProps; options: Options }>) {
  const vals = { ...defaultFrontValidators, ...(options.validators) };
  const cols = { ...defaultColors, ...(options.colors) };
  const styles = createStyles(cols);

  const logo_image = applyValidators(front.logo_image, vals.logo_image);
  const companyName = applyValidators(front.companyName, vals.companyName);
  const tagline = applyValidators(front.tagline, vals.tagline);
  const website = applyValidators(front.website, vals.website);

  return (
    <div style={styles.container}>
      <div style={styles.curveRight} />
      <div style={styles.logoArea}>
        <img src={logo_image} alt="Logo" style={styles.logo} />
        <div style={styles.textBlock}>
          <p style={styles.company}>{companyName}</p>
          <p style={styles.tagline}>{tagline}</p>
        </div>
      </div>
      <p style={styles.website}>{website}</p>
    </div>
  );
}

export function EmeraldCurveBack({ back, options }: Readonly<{ back: BackProps; options: Options }>) {
  const vals = { ...defaultBackValidators, ...options.validators };
  const cols = { ...defaultColors, ...(options.colors) };
  const styles = createStyles(cols);

  const fullName = applyValidators(back.fullName, vals.fullName);
  const jobTitle = applyValidators(back.jobTitle, vals.jobTitle);
  const phone = applyValidators(back.phone, vals.phone);
  const email = applyValidators(back.email, vals.email);
  const address = applyValidators(back.address, vals.address);
  const qr_value = applyValidators(back.qr_value, vals.qr_value);

  return (
    <div style={styles.container}>
      <div style={styles.curveLeft} />
      <div style={styles.infoBlock}>
        <p style={styles.name}>{fullName}</p>
        <p style={styles.title}>{jobTitle}</p>
        <div style={styles.contactItem}><span>📞</span>{phone}</div>
        <div style={styles.contactItem}><span>✉️</span>{email}</div>
        <div style={styles.contactItem}><span>📍</span>{address}</div>
      </div>
      <div style={styles.qrWrapper}>
        <QRCode value={qr_value} size={80} fgColor={cols.textPrimary} />
      </div>
    </div>
  );
}

const defaultOptions: Options = { validators: { ...defaultFrontValidators, ...defaultBackValidators }, colors: defaultColors };
export const EmeraldCurve = {
  front: { component: EmeraldCurveFront, default: defaultEmeraldCurveFront },
  back: { component: EmeraldCurveBack, default: defaultEmeraldCurveBack },
  options: defaultOptions
};

export default EmeraldCurve;
