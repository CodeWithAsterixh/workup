
// import * as React from 'react';
// import type { CardConfig, ElementConfig, FaceConfig } from './types';
// import { renderer } from './renderer';
// import { SelectedCardItem } from '@/types';
// import { cn } from '@/lib/utils';

// export interface IAppProps {
// }

// export default function ({
//   config,
//   currentFace = 'front',
//   select,
//   selectedFace = {
//     selected: 'front',
//     onSelected: undefined,
//   },
// }: {
//   config: CardConfig;
//   currentFace?: 'front' | 'back';
//   select:SelectedCardItem,
//   selectedFace?:{
//     selected?: 'front' | 'back';
//     onSelected?: (el: 'front' | 'back') => void;
//   },
//     containerStyles?: React.CSSProperties;

  
// }) {
//   const face = config[currentFace]
//   return (
//     <>
      
//           <div
//             style={{
//               position: 'relative',
//               backgroundColor: config.colors[face.backgroundColorKey],
//               ...config[currentFace].properties?.styles,
//               width: '400px', height: '200px',

//             }}
//             className={
//               cn(
                
//                 selectedFace.selected === currentFace ? 'ring-2 ring-blue-500' : ''
//               )
//             }
//             onClick={() => {
//               if (selectedFace.onSelected) {
//                 selectedFace.onSelected(currentFace);
//               }
//             }}
//           >
//             {face.elements.map((el, i) =>
//               <React.Fragment key={i}>
//                 {renderer(el, config.validators, config.colors,select)}
//               </React.Fragment>
//             )}
//           </div>
//     </>
//   );
// }
