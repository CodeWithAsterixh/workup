import React from "react";
import type { Options, Validator, ValidatorRule, ValidatorsMap } from "~/components/Options";
import type { Template } from ".";




// Colors map type: semantic names
export type ColorsMap = Record<
  | "backgroundPrimary"
  | "backgroundSecondary"
  | "textPrimary"
  | "textSecondary"
  | "divider",
  string
>;



// Default validators for every field
const defaultValidators: ValidatorsMap = {
  companyName: {
    maxLength: { value: 20, required: true, type: "number" },
    isUrl: { value: false, required: false, type: "boolean" },
  },
  title: {
    maxLength: { value: 30, required: true, type: "number" },
    isUrl: { value: false, required: false, type: "boolean" },
  },
  socialHandle: {
    maxLength: { value: 15, required: false, type: "number" },
    isUrl: { value: false, required: false, type: "boolean" },
  },
  website: {
    maxLength: { value: 50, required: false, type: "number" },
    isUrl: { value: true, required: false, type: "boolean" },
  },
  email: {
    maxLength: { value: 40, required: false, type: "number" },
    isUrl: { value: false, required: false, type: "boolean" },
  },
  phone: {
    maxLength: { value: 20, required: false, type: "number" },
    isUrl: { value: false, required: false, type: "boolean" },
  },
};

// Default semantic colors
const defaultColors: ColorsMap = {
  backgroundPrimary: "#2F3E35",
  backgroundSecondary: "#C7C2B2",
  textPrimary: "#FFFFFF",
  textSecondary: "#2F3E35",
  divider: "#2F3E35",
};

// Front Props
type FrontProps = {
  companyName: string;
  title: string;
  socialHandle: string;
  website: string;
  email: string;
  phone: string;
};

// Back Props
type BackProps = {
  companyName: string;
  title: string;
};

// Default front/back
export const defaultVisionaryFront: FrontProps = {
  companyName: "VISIONARY VOGUE",
  title: "TITLE",
  socialHandle: "@socialmediahandles",
  website: "www.website.com",
  email: "mywork@gmail.com",
  phone: "123-456-789",
};
export const defaultVisionaryBack: BackProps = {
  companyName: "VISIONARY VOGUE",
  title: "TITLE",
};

// Helper: apply truncation based on validators
const applyValidators = (
  value: string,
  rules: Record<keyof Validator, ValidatorRule>
) => {
  const maxLen = rules.maxLength.value as number;
  return value.slice(0, maxLen);
};

// Front component
export function VisionaryVogueFront({
  front,
  options,
}: Readonly<{
  front: FrontProps;
  options: Options;
}>) {
  const vals = { ...defaultValidators, ...(options.validators) };
  const cols = { ...defaultColors, ...(options.colors) };

  // Apply validation to every text field
  const companyName = applyValidators(front.companyName, vals.companyName);
  const title = applyValidators(front.title, vals.title);
  const socialHandle = applyValidators(front.socialHandle, vals.socialHandle);
  const website = applyValidators(front.website, vals.website);
  const email = applyValidators(front.email, vals.email);
  const phone = applyValidators(front.phone, vals.phone);

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      fontFamily: "serif",
      backgroundColor: cols.backgroundPrimary,
    },
    topPanel: {
      flex: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: cols.textPrimary,
      padding: "16px",
    },
    bottomPanel: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "5px 16px 10px 16px",
      fontSize: "10px",
      color: cols.textSecondary,
      backgroundColor: cols.backgroundSecondary,
    },
    divider: {
      width: "1px",
      height: "24px",
      backgroundColor: cols.divider,
      margin: "0 8px",
    },
    socialGroup: { display: "flex", alignItems: "center", gap: "8px" },
    infoGroup: { display: "flex", flexDirection: "column", gap: "2px" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.topPanel}>
        <h1 style={{ margin: 0, fontSize: "20px" }}>{companyName}</h1>
        <p style={{ margin: 0, fontSize: "12px" }}>{title}</p>
      </div>
      <div style={styles.bottomPanel}>
        <div style={styles.socialGroup}>
          <span>📌</span>
          <span>💬</span>
          <span>📷</span>
          <span>🌐</span>
          <span>{socialHandle}</span>
        </div>
        <div style={styles.divider}></div>
        <div style={styles.infoGroup}>
          <span>{website}</span>
          <span>{email}</span>
          <span>{phone}</span>
        </div>
      </div>
    </div>
  );
}

// Back component
export function VisionaryVogueBack({
  back,
  options,
}: Readonly<{
  back: BackProps;
  options: Options;
}>) {
  const vals = { ...defaultValidators, ...(options.validators) };
  const cols = { ...defaultColors, ...(options.colors) };

  const companyName = applyValidators(back.companyName, vals.companyName);
  const title = applyValidators(back.title, vals.title);
  const initial = companyName.charAt(0).toUpperCase();

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      width: "100%",
      height: "100%",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      fontFamily: "serif",
      backgroundColor: cols.backgroundPrimary,
    },
    watermark: {
      position: "absolute",
      fontSize: "120px",
      color: "rgba(255,255,255,0.1)",
    },
    textGroup: {
      position: "relative",
      textAlign: "center",
      color: cols.textPrimary,
    },
    companyName: { margin: 0, fontSize: "18px", fontWeight: "bold" },
    title: { margin: 0, fontSize: "10px", fontStyle: "italic" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.watermark}>{initial}</div>
      <div style={styles.textGroup}>
        <h1 style={styles.companyName}>{companyName}</h1>
        <p style={styles.title}>{title}</p>
      </div>
    </div>
  );
}

// Template export
const defaultOptions: Options = {
  validators: defaultValidators,
  colors: defaultColors,
};
export const VisionaryVogue: Template & { options: Options } = {
  front: { component: VisionaryVogueFront, default: defaultVisionaryFront },
  back: { component: VisionaryVogueBack, default: defaultVisionaryBack },
  options: defaultOptions,
};
export default VisionaryVogue;
