import type { JSX } from "react";
import type { Options } from "~/components/Options";
import EmeraldCurve from "./EmeraldCurve";
import FuturisticFusion from "./FuturisticFusion";
import GoldenBar from "./GoldenBar";
import GoldWave from "./GoldWave";
import HexaSplit from "./HexaSplit";
import MaroonRibbon from "./MaroonRibbon";
import ModernElegant from "./ModernElegant";
import NeonNexus from "./NeonNexus";
import SimpleProfessional from "./SimpleProfessional";
import SkylineModern from "./SkylineModern";
import VisionaryVogue from "./VisionaryVogue";

export interface Template {
    front: {
        component:({options, front}: {options:Options, front:any}) => JSX.Element
        default:object,
    };
    back: {
        component:({options, back}: {options:Options, back:any}) => JSX.Element
        default:object,
    };
        options:Options

}
const templates:Record<string,Template> = {
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
