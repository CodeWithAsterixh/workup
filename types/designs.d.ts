import { Element, FaceConfig } from "@/store/Editor/types";

interface designCardConfig {
    faceConfig:FaceConfig;
    elements:Element[]
}
export interface designCard {
    id:string;
    name:string;
    description:string;
    config:{
        front:designCardConfig;
        back:designCardConfig;
    }
    updatedAt?:string;
}