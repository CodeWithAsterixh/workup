import { CardFace } from "@/store/Editor/types"

export type valueType = string|number|boolean

export interface editor_config {
    face:(val: valueType) => void
    element:(val: valueType) => void
}

export type handleEditElements = (params:{id:string}) => void
export type handleEditFace = (options:{face:CardFace}) => void
export type editor_config_return = editor_config | ((val: valueType) => void)