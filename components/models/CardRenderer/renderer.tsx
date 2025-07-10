// "use client"
// import type { ColorsMap, Validator, ValidatorsMap } from "@/components/Options";
// import React from "react";
// import QRCode from "react-qr-code";
// import type { ElementConfig } from "./types";
// import useCardConfig from "@/hooks/useCard";
// import { SelectedCardItem } from "@/types";


// export function renderer(
//   el: ElementConfig,
//   validators: ValidatorsMap,
//   colors: ColorsMap,
//     select:SelectedCardItem

// ): React.ReactNode {
//     const highlight = select.selected?.id === el.id  ? { outline: '2px dashed #00f' } : {};

//   // 1. pull & validate value
//   const data = el.value
//   let value: any;
//   if (el.dataKey) {
//     const raw = data || "";
//     if (el.validatorKey && validators[el.dataKey] && validators[el.dataKey][el.validatorKey as keyof Validator]) {
//       const rule = validators[el.dataKey][el.validatorKey as keyof Validator];
//       value = raw.slice(0, rule.value as number);
//     } else {
//       value = raw;
//     }
//   }

//   const handleSelect = ()=>{
//     if(select.onSelected){
//       select.onSelected(el)
//     }
//   }

//   // 2. pick primitive
//   let node: React.ReactNode;
//   const styles = { ...el.properties?.styles, ...highlight };
//   switch (el.type) {
//     case "text":
//       node = <div onClick={handleSelect} style={styles}>{value}</div>;
//       break;
//     case "image":
//       node = <img onClick={handleSelect} style={styles} src={value} />;
//       break;
//     case "qr":
//       node = (
//         <QRCode
//           size={el.properties.size || 50}
//           bgColor={el.properties.bgColor || "#FFFFFF"}
//           fgColor={el.properties.fgColor || "#000000"}
//           level={el.properties.level || "L"}
//           style={styles}
//           value={value}
//           onClick={handleSelect} 
//         />
//       );
//       break;
//     case "shape":
//       const base = { ...styles };
//       if (el.shapeType === "circle") base.borderRadius = "50%";
//       node = <div onClick={handleSelect} style={base} />;
//       break;
//     default:
//       node = null;
//   }

//   // 3. render children inside a wrapper positioned at same coordinates
//   if (el.children && el.children.length) {
//     return (
//       <div
//         style={{
//           ...styles,
//           position: styles?.position || "absolute",
//         }}
//         onClick={handleSelect} 
//       >
//         {el.children.map((child, i) => (
//           <React.Fragment key={i}>
//             {renderer(child, validators, colors,select)}
//           </React.Fragment>
//         ))}
//       </div>
//     );
//   }

//   return node;
// }
