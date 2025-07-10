// import React, { useState, useRef, useEffect } from "react";
// import type { ElementConfig, CardConfig, FaceConfig } from "./types";
// import type { CSSProperties } from "react";
// import { motion, Reorder } from "framer-motion";
// import { renderer } from "./renderer";

// interface CardEditorProps {
//   config: CardConfig;
//   data: Record<string, string>;
//   onConfigChange: (cfg: CardConfig) => void;
//   onDataChange: (data: Record<string, string>) => void;
// }

// export default function CardEditor({ config, data, onConfigChange, onDataChange }: CardEditorProps) {
//   const [faceKey, setFaceKey] = useState<"front"|"back">("front");
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
//   const face: FaceConfig = config[faceKey];

//   const updateElement = (idx: number, newEl: ElementConfig) => {
//     const newElements = [...face.elements];
//     newElements[idx] = newEl;
//     onConfigChange({ ...config, [faceKey]: { ...face, elements: newElements } });
//   };

//   return (
//     <div className="fixed inset-0 flex bg-gray-800">
//       {/* Left Sidebar */}
//       <motion.div
//         initial={{ width: 0 }}
//         animate={{ width: 300 }}
//         className="bg-white bg-opacity-10 backdrop-blur-lg overflow-y-auto p-4"
//       >
//         <div className="mb-4">
//           <label className="text-white">Face:</label>
//           <select
//             value={faceKey}
//             onChange={e => setFaceKey(e.target.value as any)}
//             className="w-full mt-1 p-1 bg-gray-700 text-white rounded"
//           >
//             <option value="front">Front</option>
//             <option value="back">Back</option>
//           </select>
//         </div>

//         <h3 className="text-white mb-2">Layers</h3>
//         <Reorder.Group axis="y" values={face.elements} onReorder={items => {
//           onConfigChange({ ...config, [faceKey]: { ...face, elements: items } });
//         }}>
//           {face.elements.map((el, idx) => (
//             <Reorder.Item
//               key={idx}
//               value={el}
//               onClick={() => setSelectedIndex(idx)}
//               className={`p-2 mb-2 rounded cursor-pointer ${selectedIndex === idx ? 'bg-blue-500 bg-opacity-50' : 'bg-white bg-opacity-20'}`}
//             >
//               <div className="text-white">{el.type} - {el.dataKey}</div>
//             </Reorder.Item>
//           ))}
//         </Reorder.Group>

//         {selectedIndex !== null && (
//           <div className="mt-6">
//             <h3 className="text-white mb-2">Inspector</h3>
//             {/* Only render inspector for selected element */}
//             {(() => {
//               const el = face.elements[selectedIndex!];
//               return (
//                 <div className="bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded">
//                   <div className="mb-2">
//                     <label className="text-gray-200">Type:</label>
//                     <div className="text-white">{el.type}</div>
//                   </div>
//                   {el.dataKey && (
//                     <div className="mb-2">
//                       <label className="text-gray-200">Data Key:</label>
//                       <input
//                         className="w-full p-1 rounded"
//                         value={el.dataKey}
//                         onChange={e => updateElement(selectedIndex!, { ...el, dataKey: e.target.value })}
//                       />
//                     </div>
//                   )}
//                   <div>
//                     <label className="text-gray-200">Styles (JSON):</label>
//                     <textarea
//                       className="w-full p-1 rounded h-24"
//                       value={JSON.stringify(el.properties?.styles || {}, null, 2)}
//                       onChange={e => {
//                         try {
//                           const styles: CSSProperties = JSON.parse(e.target.value);
//                           updateElement(selectedIndex!, { ...el, properties: { ...el.properties, styles } });
//                         } catch {}
//                       }}
//                     />
//                   </div>
//                 </div>
//               );
//             })()}
//           </div>
//         )}
//       </motion.div>

//       {/* Right Canvas */}
//       <div className="flex-1 relative flex items-center justify-center bg-gray-900">
//         {/* Card Preview */}
//         <div id="canvas" className="relative" style={{ width: 400, height: 200, background: 'white', borderRadius: 8 }}>
//           {face.elements.map((el, i) => (
//             <React.Fragment key={i}>
//               {renderer(el, config.validators, config.colors, i === selectedIndex)}
//             </React.Fragment>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

