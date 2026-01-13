import React from 'react';
import QRCode from 'react-qr-code';
import type { Options, Validator, ValidatorRule, ValidatorsMap } from '~/components/Options';
import type { Template } from '.';

// Semantic color keys for HexaSplit theme
type ColorsMap = Record<
  | 'background'
  | 'splitDark'
  | 'splitLight'
  | 'textDark'
  | 'textLight'
  | 'accent'
  | 'divider',
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
  logo_image: { maxLength: { value: 100, required: false, type: 'number' }, isUrl: { value: true, required: true, type: 'boolean' } },
  companyName: { maxLength: { value: 20, required: true, type: 'number' }, isUrl: { value: false, required: false, type: 'boolean' } },
  tagline: { maxLength: { value: 40, required: false, type: 'number' }, isUrl: { value: false, required: false, type: 'boolean' } },
  qr_value: { maxLength: { value: 100, required: false, type: 'number' }, isUrl: { value: true, required: true, type: 'boolean' } },
};

// Default validators for back props
const defaultBackValidators: ValidatorsMap = {
  fullName: { maxLength: { value: 20, required: true, type: 'number' }, isUrl: { value: false, required: false, type: 'boolean' } },
  jobTitle: { maxLength: { value: 30, required: false, type: 'number' }, isUrl: { value: false, required: false, type: 'boolean' } },
  phone: { maxLength: { value: 20, required: false, type: 'number' }, isUrl: { value: false, required: false, type: 'boolean' } },
  email: { maxLength: { value: 40, required: false, type: 'number' }, isUrl: { value: false, required: false, type: 'boolean' } },
  location: { maxLength: { value: 60, required: false, type: 'number' }, isUrl: { value: false, required: false, type: 'boolean' } },
  website: { maxLength: { value: 50, required: false, type: 'number' }, isUrl: { value: true, required: false, type: 'boolean' } },
};

// Default semantic colors
const defaultColors: ColorsMap = {
  background: '#FFFFFF',
  splitDark: '#232323',
  splitLight: '#FFA500',
  textDark: '#232323',
  textLight: '#FFFFFF',
  accent: '#FFA500',
  divider: '#E5E5E5',
};

// Props types
type FrontProps = {
  logo_image: string;
  companyName: string;
  tagline: string;
  qr_value: string;
};
type BackProps = {
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  location: string;
  website: string;
};

export const defaultHexaSplitFront: FrontProps = {
  logo_image: '/logo.png',
  companyName: 'Company Name',
  tagline: 'Tagline Here',
  qr_value: 'https://www.example.com',
};
export const defaultHexaSplitBack: BackProps = {
  fullName: 'Dicky Prayuda',
  jobTitle: 'Graphic Designer',
  phone: '+00 1234 56789',
  email: 'info@example.com',
  location: 'Address here, City, 1234',
  website: 'Yourwebsite.com',
};

// Styles factory
const createStyles = (cols: ColorsMap) => ({
  container: { width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden', fontFamily: 'Inter, sans-serif', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', background: cols.background } as React.CSSProperties,
  splitRow: { display: 'flex', flex: 1, height: '100%' } as React.CSSProperties,
  left: { flex: 1, background: cols.splitDark, color: cols.textLight, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, minWidth: 0 } as React.CSSProperties,
  right: { flex: 1, background: cols.splitLight, color: cols.textDark, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, minWidth: 0 } as React.CSSProperties,
  logo: { width: 56, height: 56, borderRadius: '50%', background: cols.background, objectFit: 'contain', marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' } as React.CSSProperties,
  company: { fontSize: 16, fontWeight: 700, margin: 0, marginBottom: 0, letterSpacing: 0.5, textAlign: 'center' } as React.CSSProperties,
  tagline: { fontSize: 12, color: cols.divider, margin: 0, textAlign: 'center', fontWeight: 400 } as React.CSSProperties,
  qrWrapper: { background: cols.background, padding: 8, borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginTop: 16 } as React.CSSProperties,
  infoBlock: { width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 8, color: cols.textDark, background: cols.background, padding: 24, boxShadow: '0 1px 8px rgba(0,0,0,0.04)' } as React.CSSProperties,
  name: { fontSize: 18, fontWeight: 700, margin: 0 } as React.CSSProperties,
  title: { fontSize: 13, fontWeight: 500, color: cols.accent, margin: 0, marginBottom: 8 } as React.CSSProperties,
  contactItem: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: cols.textDark, wordBreak: 'break-all' } as React.CSSProperties,
  icon: { fontSize: 13, width: 16, textAlign: 'center' } as React.CSSProperties,
});

export function HexaSplitFront({ front, options }: Readonly<{ front: FrontProps; options: Options }>) {
  const vals = { ...defaultFrontValidators, ...(options.validators) };
  const cols = { ...defaultColors, ...(options.colors) };
  const styles = createStyles(cols);

  const logo_image = applyValidators(front.logo_image, vals.logo_image);
  const companyName = applyValidators(front.companyName, vals.companyName);
  const tagline = applyValidators(front.tagline, vals.tagline);
  const qrValue = applyValidators(front.qr_value, vals.qr_value);

  return (
    <div style={styles.container}>
      <div style={styles.splitRow}>
        <div style={styles.left}>
          <img src={logo_image} alt="Logo" style={styles.logo} />
          <h2 style={styles.company}>{companyName}</h2>
          <p style={styles.tagline}>{tagline}</p>
        </div>
        <div style={styles.right}>
          <div style={styles.qrWrapper}>
            <QRCode value={qrValue} size={72} fgColor={cols.splitDark} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HexaSplitBack({ back, options }: Readonly<{ back: BackProps; options: Options }>) {
  const vals = { ...defaultBackValidators, ...(options.validators) };
  const cols = { ...defaultColors, ...(options.colors) };
  const styles = createStyles(cols);

  const fullName = applyValidators(back.fullName, vals.fullName);
  const jobTitle = applyValidators(back.jobTitle, vals.jobTitle);
  const phone = applyValidators(back.phone, vals.phone);
  const email = applyValidators(back.email, vals.email);
  const location = applyValidators(back.location, vals.location);
  const website = applyValidators(back.website, vals.website);

  return (
    <div style={styles.container}>
      <div style={styles.splitRow}>
        <div style={{ ...styles.left, minWidth: 300 }}>
          <div style={styles.infoBlock}>
            <h2 style={styles.name}>{fullName}</h2>
            <div style={styles.title}>{jobTitle}</div>
            <div style={styles.contactItem}><span style={styles.icon}>📞</span>{phone}</div>
            <div style={styles.contactItem}><span style={styles.icon}>✉️</span>{email}</div>
            <div style={styles.contactItem}><span style={styles.icon}>📍</span>{location}</div>
            <div style={styles.contactItem}><span style={styles.icon}>🌐</span>{website}</div>
          </div>
        </div>
        <div style={styles.right}> {/* Space for symmetry or QR */} </div>
      </div>
    </div>
  );
}

// Template export
const defaultOptions: Options = { validators: defaultFrontValidators, colors: defaultColors };
export const HexaSplit: Template & { options: Options } = {
  front: { component: HexaSplitFront, default: defaultHexaSplitFront },
  back: { component: HexaSplitBack, default: defaultHexaSplitBack },
  options: defaultOptions,
};

export default HexaSplit;