import { EIdentifyType, EJobFinderRole } from "../types"

export interface IApiLoginResponse {
    userId: string,
    identifier: string,
    identifierType: EIdentifyType,
    role: EJobFinderRole,
    accessToken: string,
    id: string,
}