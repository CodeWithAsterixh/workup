import { activityStatus, generalResponse } from "@/types";

export interface healthChecker extends generalResponse {
    mongoDbStatus:activityStatus;
}