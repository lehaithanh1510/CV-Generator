import { EIdentifyType, EJobFinderRole } from "../types";

export interface IApiGetUserInfoResponse {
    userId: string,
    identifier: string,
    identifierType: EIdentifyType,
    role: EJobFinderRole,
    id: string,
}

export interface IUserInfo {
    email?: string;
    userId: string;
    name?: string;
    role: EJobFinderRole
}