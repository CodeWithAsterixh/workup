// "use client"
// import React, { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { layoutControlProp } from "../OptionsSidebarMain";
// import { ColorPicker } from "@/components/ui/color-picker";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// // Effect types
// type EffectType = "dropShadow" | "layerBlur" | "backgroundBlur";

// type Effect =
//   | { type: "dropShadow"; x: number; y: number; blur: number; spread: number; color: string }
//   | { type: "layerBlur"; density: number }
//   | { type: "backgroundBlur"; density: number };

// export default function EffectsControls({ styles, setStyles }: layoutControlProp) {
//   const [effects, setEffects] = useState<Effect[]>([]);

//   // Sync effects to styles
//   useEffect(() => {
//     // Compose boxShadow from all dropShadows
//     const boxShadow = effects
//       .filter(e => e.type === "dropShadow")
//       .map(e => `${e.x}px ${e.y}px ${e.blur}px ${e.spread}px ${e.color}`)
//       .join(", ");
//     // Only one layerBlur and backgroundBlur
//     const layerBlur = effects.find(e => e.type === "layerBlur") as any;
//     const backgroundBlur = effects.find(e => e.type === "backgroundBlur") as any;
//     setStyles({
//       ...styles,
//       boxShadow: boxShadow || undefined,
//       filter: layerBlur ? `blur(${layerBlur.density}px)` : undefined,
//       backdropFilter: backgroundBlur ? `blur(${backgroundBlur.density}px)` : undefined,
//     });
//   }, [effects]);

//   // Add effect
//   const addEffect = (type: EffectType) => {
//     if (type === "dropShadow") {
//       setEffects([...effects, { type: "dropShadow", x: 0, y: 4, blur: 5, spread: 0, color: "#000000" }]);
//     } else if (type === "layerBlur" && !effects.some(e => e.type === "layerBlur")) {
//       setEffects([...effects, { type: "layerBlur", density: 8 }]);
//     } else if (type === "backgroundBlur" && !effects.some(e => e.type === "backgroundBlur")) {
//       setEffects([...effects, { type: "backgroundBlur", density: 8 }]);
//     }
//   };

//   // Remove effect
//   const removeEffect = (idx: number) => {
//     setEffects(effects.filter((_, i) => i !== idx));
//   };

//   // Update effect
//   const updateEffect = (idx: number, newEffect: Effect) => {
//     setEffects(effects.map((e, i) => (i === idx ? newEffect : e)));
//   };

//   return (
//     <div className="w-full flex flex-col gap-4">
//       {/* Add Effect Dropdown */}
//       <div className="flex gap-2 mb-2 items-center">
//         <Label>Add Effect</Label>
//         <Popover>
//           <PopoverTrigger asChild>
//             <button className="border rounded px-2 py-1 bg-zinc-100 dark:bg-zinc-800">+ Effect</button>
//           </PopoverTrigger>
//           <PopoverContent className="w-40 p-2 flex flex-col gap-2">
//             <button
//               className="text-left px-2 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded"
//               onClick={() => addEffect("dropShadow")}
//             >Drop Shadow</button>
//             <button
//               className="text-left px-2 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded"
//               disabled={effects.some(e => e.type === "layerBlur")}
//               onClick={() => addEffect("layerBlur")}
//             >Layer Blur</button>
//             <button
//               className="text-left px-2 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded"
//               disabled={effects.some(e => e.type === "backgroundBlur")}
//               onClick={() => addEffect("backgroundBlur")}
//             >Background Blur</button>
//           </PopoverContent>
//         </Popover>
//       </div>
//       {/* List of Effects */}
//       {effects.map((effect, idx) => (
//         <div key={idx} className="flex flex-col gap-2 border-b pb-2 mb-2 relative bg-zinc-50 dark:bg-zinc-800 rounded p-2">
//           <button
//             className="absolute right-2 top-2 text-xs text-red-500"
//             onClick={() => removeEffect(idx)}
//             title="Remove Effect"
//           >
//             ✕
//           </button>
//           {effect.type === "dropShadow" && (
//             <>
//               <Label>Drop Shadow #{effects.filter(e => e.type === "dropShadow").indexOf(effect) + 1}</Label>
//               <div className="flex gap-2 flex-wrap items-center">
//                 <Input type="number" placeholder="X" value={effect.x}
//                   onChange={e => updateEffect(idx, { ...effect, x: parseInt(e.target.value) || 0 })} />
//                 <Input type="number" placeholder="Y" value={effect.y}
//                   onChange={e => updateEffect(idx, { ...effect, y: parseInt(e.target.value) || 0 })} />
//                 <Input type="number" placeholder="Blur" value={effect.blur}
//                   onChange={e => updateEffect(idx, { ...effect, blur: parseInt(e.target.value) || 0 })} />
//                 <Input type="number" placeholder="Spread" value={effect.spread}
//                   onChange={e => updateEffect(idx, { ...effect, spread: parseInt(e.target.value) || 0 })} />
//                 <ColorPicker className="size-5 rounded-full" value={effect.color}
//                   onChange={color => updateEffect(idx, { ...effect, color: color as string })} />
//               </div>
//             </>
//           )}
//           {effect.type === "layerBlur" && (
//             <>
//               <Label>Layer Blur</Label>
//               <Input type="number" placeholder="Blur px" value={effect.density}
//                 onChange={e => updateEffect(idx, { ...effect, density: parseInt(e.target.value) || 0 })} />
//             </>
//           )}
//           {effect.type === "backgroundBlur" && (
//             <>
//               <Label>Background Blur</Label>
//               <Input type="number" placeholder="Blur px" value={effect.density}
//                 onChange={e => updateEffect(idx, { ...effect, density: parseInt(e.target.value) || 0 })} />
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
