import { EducationDto, WorkingExperienceDto } from "../api/employee";
import { IResumeInfo } from "./resume";

export interface IEmployeeInfo {
    email: string;
    name: string;
    userId: string
}

export interface IApiGetEmployeeResponse {
    userId: string,
    name: string,
    email: string,
    id: string,
    resumes: IResumeInfo[]
    gender?: string;
    profession?: string;
    location?: string;
    mobilePhone?: string;
    profileDescription?: string;
    facebookLink?: string;
    linkedInLink?: string;
    gitHubLink?: string;
    education?: EducationDto;
    workingExperience?: WorkingExperienceDto[]
}