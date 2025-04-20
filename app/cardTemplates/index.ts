import type { ComponentType, JSX } from "react";
import SimpleProfessional from "./SimpleProfessional";
import ModernElegant from "./ModernElegant";
import VisionaryVogue from "./VisionaryVogue";
import SkylineModern from "./SkylineModern";
import FuturisticFusion from "./FuturisticFusion";
import NeonNexus from "./NeonNexus";
import EmeraldCurve from "./EmeraldCurve";
import GoldenBar from "./GoldenBar";
import MaroonRibbon from "./MaroonRibbon";
import HexaSplit from "./HexaSplit";
import GoldWave from "./GoldWave";

export interface template {
    front: {
        component:({}: any) => JSX.Element
        default:object
    };
    back: {
        component:({}: any) => JSX.Element
        default:object
    };
}
const templates:Record<string,template> = {
    SimpleProfessional,
    ModernElegant,
    VisionaryVogue,
    SkylineModern,
    FuturisticFusion,
    NeonNexus,
    EmeraldCurve,
    GoldenBar,
    MaroonRibbon,
    HexaSplit,
    GoldWave
}

export default templates;
