import { generalResponse } from "@/types";
import { designCard } from "@/types/designs";

export interface GetDesigns extends generalResponse {
    data:designCard[];
}

export type PostDesignBody = designCard
export interface GetDesignSingle extends generalResponse {
    data:designCard | null;
}