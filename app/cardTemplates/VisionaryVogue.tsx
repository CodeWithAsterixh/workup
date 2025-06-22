import React from "react";

type FrontProps = {
  companyName: string;
  title: string;
  socialHandle: string;
  website: string;
  email: string;
  phone: string;
};

type BackProps = {
  companyName: string;
  title: string;
};

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

const frontStyles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    fontFamily: 'serif',
  },
  topPanel: {
    backgroundColor: '#2F3E35',
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFFFFF',
    position: 'relative',
    padding: '16px',
  },
  bottomPanel: {
    backgroundColor: '#C7C2B2',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5px 16px 10px 16px',
    fontSize: '10px',
    color: '#2F3E35',
    position:"relative"
  },
  divider: {
    width: '1px',
    height: '24px',
    backgroundColor: '#2F3E35',
    margin: '0 8px'
  },
  socialGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  infoGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
};

export function VisionaryVogueFront({
  companyName,
  title,
  socialHandle,
  website,
  email,
  phone,
}: FrontProps) {
  const props = { ...defaultVisionaryFront, companyName, title, socialHandle, website, email, phone };
  return (
    <div style={frontStyles.container}>
      <div style={frontStyles.topPanel}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>{props.companyName}</h1>
        <p style={{ margin: 0, fontSize: '12px' }}>{props.title}</p>
      </div>
      <div style={frontStyles.bottomPanel}>
        <div style={frontStyles.socialGroup}>
          <span>📌</span>
          <span>💬</span>
          <span>📷</span>
          <span>🌐</span>
          <span>{props.socialHandle}</span>
        </div>
        <div style={frontStyles.divider}></div>
        <div style={frontStyles.infoGroup}>
          <span>{props.website}</span>
          <span>{props.email}</span>
          <span>{props.phone}</span>
        </div>
      </div>
    </div>
  );
}

const backStyles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2F3E35',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    fontFamily: 'serif',
  },
  watermark: {
    position: 'absolute',
    fontSize: '120px',
    color: 'rgba(255,255,255,0.1)',
  },
  textGroup: {
    position: 'relative',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  companyName: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
  },
  title: {
    margin: 0,
    fontSize: '10px',
    fontStyle: 'italic',
  },
};

export function VisionaryVogueBack({ companyName, title }: BackProps) {
  const props = { ...defaultVisionaryBack, companyName, title };
  // take first letter as watermark
  const initial = props.companyName.charAt(0).toUpperCase();
  return (
    <div style={backStyles.container}>
      <div style={backStyles.watermark}>{initial}</div>
      <div style={backStyles.textGroup}>
        <h1 style={backStyles.companyName}>{props.companyName}</h1>
        <p style={backStyles.title}>{props.title}</p>
      </div>
    </div>
  );
}

const VisionaryVogue = {
  front: {
    component: VisionaryVogueFront,
    default: defaultVisionaryFront,
  },
  back: {
    component: VisionaryVogueBack,
    default: defaultVisionaryBack,
  },
};

export default VisionaryVogue;
