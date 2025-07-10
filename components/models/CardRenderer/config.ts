// import { options, ValidatorsMap } from "@/components/Options";
// import type { CardConfig, ElementConfig } from "./types";
// import generateUniqueId from "@/lib/generateUniqueId";




// // Colors map type: semantic names
// export type ColorsMap = Record<
//   | "backgroundPrimary"
//   | "backgroundSecondary"
//   | "textPrimary"
//   | "textSecondary"
//   | "divider",
//   string
// >;



// // Default validators for every field
// const defaultValidators: ValidatorsMap = {
//   companyName: {
//     maxLength: { value: 20, required: true, type: "number" },
//     isUrl: { value: false, required: false, type: "boolean" },
//   },
//   title: {
//     maxLength: { value: 30, required: true, type: "number" },
//     isUrl: { value: false, required: false, type: "boolean" },
//   },
//   socialHandle: {
//     maxLength: { value: 15, required: false, type: "number" },
//     isUrl: { value: false, required: false, type: "boolean" },
//   },
//   website: {
//     maxLength: { value: 50, required: false, type: "number" },
//     isUrl: { value: true, required: false, type: "boolean" },
//   },
//   email: {
//     maxLength: { value: 40, required: false, type: "number" },
//     isUrl: { value: false, required: false, type: "boolean" },
//   },
//   phone: {
//     maxLength: { value: 20, required: false, type: "number" },
//     isUrl: { value: false, required: false, type: "boolean" },
//   },
// };

// // Default semantic colors
// const defaultColors: ColorsMap = {
//   backgroundPrimary: "#2F3E35",
//   backgroundSecondary: "#C7C2B2",
//   textPrimary: "#FFFFFF",
//   textSecondary: "#2F3E35",
//   divider: "#2F3E35",
// };

// export const defaultOptions: options = {
//   validators: defaultValidators,
//   colors: defaultColors,
// };
// export const visionaryVogueConfigWithoutId: CardConfig = {
//   colors: defaultOptions.colors,
//   validators: defaultOptions.validators,

//   front: {
//     backgroundColorKey: "backgroundPrimary",
//     elements: [
//       // Top panel container (we don’t need an explicit shape — background handled by face)
//       // Company Name
//       {
//         type: "text",
//         dataKey: "companyName",
//         value: "Visionary Vogue",
//         validatorKey: "maxLength",
//         properties: {
//           styles: {
//             position: "absolute",
//             top: 16,
//             left: "50%",
//             transform: "translateX(-50%)",
//             margin: 0,
//             fontSize: 20,
//             fontWeight: "bold",
//             color: "var(--textPrimary)",
//           },
//         },
//       },
//       // Title
//       {
//         type: "text",
//         dataKey: "title",
//         validatorKey: "maxLength",
//         properties: {
//           styles: {
//             position: "absolute",
//             top: 40,
//             left: "50%",
//             transform: "translateX(-50%)",
//             margin: 0,
//             fontSize: 12,
//             color: "var(--textPrimary)",
//           },
//         },
//       },
//       // Social icons + handle (we'll just render the handle as text)
//       {
//         type: "text",
//         dataKey: "socialHandle",
//         validatorKey: "maxLength",
//         properties: {
//           styles: {
//             position: "absolute",
//             bottom: 16,
//             left: 16,
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             color: "var(--textSecondary)",
//             fontSize: 10,
//           },
//         },
//       },
//       // Divider (as a shape)
//       {
//         type: "shape",
//         dataKey: "companyName",      // dummy, no slicing needed
//         validatorKey: "maxLength",   // dummy
//         shapeType: "rect",
//         properties: {
//           styles: {
//             position: "absolute",
//             bottom: 16,
//             left: "50%",
//             transform: "translateX(-50%)",
//             width: 1,
//             height: 24,
//             backgroundColor: "var(--divider)",
//           },
//         },
//       },
//       // Info group (website, email, phone) stacked
//       {
//         type: "text",
//         dataKey: "website",
//         validatorKey: "maxLength",
//         properties: {
//           styles: {
//             position: "absolute",
//             bottom: 16,
//             right: 16,
//             display: "block",
//             fontSize: 10,
//             color: "var(--textSecondary)",
//             margin: 0,
//           },
//         },
//       },
//       {
//         type: "text",
//         dataKey: "email",
//         validatorKey: "maxLength",
//         properties: {
//           styles: {
//             position: "absolute",
//             bottom: 32,
//             right: 16,
//             display: "block",
//             fontSize: 10,
//             color: "var(--textSecondary)",
//             margin: 0,
//           },
//         },
//       },
//       {
//         type: "text",
//         dataKey: "phone",
//         validatorKey: "maxLength",
//         properties: {
//           styles: {
//             position: "absolute",
//             bottom: 48,
//             right: 16,
//             display: "block",
//             fontSize: 10,
//             color: "var(--textSecondary)",
//             margin: 0,
//           },
//         },
//       },
//     ] as ElementConfig[],
//   },

//   back: {
//     backgroundColorKey: "backgroundPrimary",
//     elements: [
//       // Watermark initial
//       {
//         type: "text",
//         dataKey: "companyName",
//         validatorKey: "maxLength",
//         properties: {
//           styles: {
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             fontSize: 120,
//             color: "rgba(255,255,255,0.1)",
//             margin: 0,
//           },
//         },
//       },
//       // Company name on top
//       {
//         type: "text",
//         dataKey: "companyName",
//         validatorKey: "maxLength",
//         properties: {
//           styles: {
//             position: "absolute",
//             top: "40%",
//             left: "50%",
//             transform: "translateX(-50%)",
//             fontSize: 18,
//             fontWeight: "bold",
//             color: "var(--textPrimary)",
//             margin: 0,
//           },
//         },
//       },
//       // Title below
//       {
//         type: "text",
//         dataKey: "title",
//         validatorKey: "maxLength",
//         properties: {
//           styles: {
//             position: "absolute",
//             top: "45%",
//             left: "50%",
//             transform: "translateX(-50%)",
//             fontSize: 10,
//             fontStyle: "italic",
//             color: "var(--textPrimary)",
//             margin: 0,
//           },
//         },
//       },
//     ] as ElementConfig[],
//   },
// };

// export const visionaryVogueConfig: CardConfig = {
//   ...visionaryVogueConfigWithoutId,
//   front:{
//     ...visionaryVogueConfigWithoutId.front,
//     elements:[
//       ...visionaryVogueConfigWithoutId.front.elements.map((ele, i, arr) => {
//         const els:ElementConfig[] = []
//         els.push({
//           ...ele,
//           id: generateUniqueId(arr.map(a => a.id))
//         })

//         return els
//       }).flat(),

//     ]
//   },
//   back:{
//     ...visionaryVogueConfigWithoutId.back,
//     elements:[
//       ...visionaryVogueConfigWithoutId.back.elements.map((ele, i, arr) => {
//         const els:ElementConfig[] = []
//         els.push({
//           ...ele,
//           id: generateUniqueId(arr.map(a => a.id))
//         })

//         return els
//       }).flat(),

//     ]
//   }
// }
