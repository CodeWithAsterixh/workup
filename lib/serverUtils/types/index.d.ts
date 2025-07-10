import { activityStatus, generalResponse } from "@/types";

export interface connectDbResponse extends generalResponse {
    mongoDbStatus:activityStatus;
    message:string;
}