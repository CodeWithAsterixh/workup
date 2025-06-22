import React from "react";
import type { options, Validator, ValidatorRule, ValidatorsMap } from "~/components/Options";
import type { template } from ".";

// Colors map type: semantic names
export type ColorsMap = Record<
  | "backgroundPrimary"
  | "textPrimary"
  | "accent"
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

// Default validators for front fields
const defaultFrontValidators: ValidatorsMap = {
  logo_image:  { maxLength: { value: 100, required: false, type: "number" }, isUrl: { value: true, required: true, type: "boolean" } },
  companyName: { maxLength: { value: 18, required: true, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  fullName:    { maxLength: { value: 20, required: true, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  jobTitle:    { maxLength: { value: 30, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  phone:       { maxLength: { value: 20, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  email:       { maxLength: { value: 40, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
  website:     { maxLength: { value: 50, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
};

// Default validators for back fields
const defaultBackValidators: ValidatorsMap = {
  logo_image:  defaultFrontValidators.logo_image,
  companyName: defaultFrontValidators.companyName,
  tagline:     { maxLength: { value: 30, required: false, type: "number" }, isUrl: { value: false, required: false, type: "boolean" } },
};

// Default semantic colors
const defaultColors: ColorsMap = {
  backgroundPrimary: "#FFFFFF",
  textPrimary:       "#1A1A1A",
  accent:            "#2563EB",
  divider:           "#E5E7EB",
};

// Front Props
type FrontProps = {
  logo_image: string;
  companyName: string;
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  website: string;
};
// Back Props
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

// Styles factory using semantic colors
const createStyles = (
  cols: ColorsMap
): Record<
  | "container"
  | "headerRow"
  | "logoWrapper"
  | "logoImage"
  | "companyName"
  | "authorSection"
  | "fullName"
  | "jobTitle"
  | "divider"
  | "contactList"
  | "contactItem",
  React.CSSProperties
> => ({
  container:     { backgroundColor: cols.backgroundPrimary, position: "relative", width: "100%", height: "100%", overflow: "hidden", padding: "16px", color: cols.textPrimary, fontFamily: "sans-serif", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  headerRow:     { display: "flex", alignItems: "center", gap: "8px", position: "relative" },
  logoWrapper:   { width: "40px", height: "40px" },
  logoImage:     { width: "100%", height: "100%", objectFit: "contain" },
  companyName:   { fontSize: "18px", fontWeight: "bold", color: cols.accent, marginBottom: "12px" },
  authorSection: { display: "flex", flexDirection: "column", gap: "4px" },
  fullName:      { fontSize: "16px", fontWeight: 600 },
  jobTitle:      { fontSize: "14px", color: cols.textPrimary },
  divider:       { height: "1px", backgroundColor: cols.divider, margin: "8px 0 0 0", border: "none" },
  contactList:   { display: "flex", flexDirection: "column", gap: "2px", fontSize: "12px" },
  contactItem:   { display: "flex", alignItems: "center", gap: "6px" },
});

export function SimpleProfessionalFront({ front, options }: { front: FrontProps; options: options }) {
  const vals = { ...defaultFrontValidators, ...(options.validators || {}) };
  const cols = { ...defaultColors, ...(options.colors || {}) };
  const styles = createStyles(cols);

  // Apply validation
  const logo_image  = applyValidators(front.logo_image, vals.logo_image);
  const companyName = applyValidators(front.companyName, vals.companyName);
  const fullName    = applyValidators(front.fullName, vals.fullName);
  const jobTitle    = applyValidators(front.jobTitle, vals.jobTitle);
  const phone       = applyValidators(front.phone, vals.phone);
  const email       = applyValidators(front.email, vals.email);
  const website     = applyValidators(front.website, vals.website);

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div style={styles.logoWrapper}>
          <img src={logo_image} alt="Company Logo" style={styles.logoImage} />
        </div>
        <h1 style={styles.companyName}>{companyName}</h1>
      </div>
      <div style={styles.authorSection}>
        <h2 style={styles.fullName}>{fullName}</h2>
        <p style={styles.jobTitle}>{jobTitle}</p>
        <hr style={styles.divider} />
        <div style={styles.contactList}>
          <p style={styles.contactItem}>📞 {phone}</p>
          <p style={styles.contactItem}>✉️ {email}</p>
          <p style={styles.contactItem}>🌐 {website}</p>
        </div>
      </div>
    </div>
  );
}

export function SimpleProfessionalBack({ back, options }: { back: BackProps; options: options }) {
  const vals = { ...defaultBackValidators, ...(options.validators || {}) };
  const cols = { ...defaultColors, ...(options.colors || {}) };
  const styles = createStyles(cols);

  const logo_image  = applyValidators(back.logo_image, vals.logo_image);
  const companyName = applyValidators(back.companyName, vals.companyName);
  const tagline     = applyValidators(back.tagline, vals.tagline);

  return (
    <div style={{ ...styles.container, backgroundColor: cols.accent, color: cols.backgroundPrimary, textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
      <div style={styles.logoWrapper}>
        <img src={logo_image} alt="Company Logo" style={styles.logoImage} />
      </div>
      <h1 style={styles.companyName}>{companyName}</h1>
      <p style={{ ...styles.jobTitle, borderTop: `1px solid ${cols.backgroundPrimary}`, paddingTop: '8px', marginTop: '8px' }}>{tagline}</p>
    </div>
  );
}

// Template export
const defaultOptions: options = { validators: defaultFrontValidators, colors: defaultColors };
export const SimpleProfessional: template & { options: options } = {
  front: { component: SimpleProfessionalFront, default: defaultFrontProps },
  back: { component: SimpleProfessionalBack, default: defaultBackProps },
  options: defaultOptions,
};

export default SimpleProfessional;