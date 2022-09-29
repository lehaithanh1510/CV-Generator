import axios from "axios"
import { IApiGetEmployeeResponse } from "../types/employee";

export class SchoolDto {
    startingDate?: string;
    endingDate?: string;
    degree?: string;
    schoolName?: string;
}
  
  export class EducationDto {
    highSchool?: SchoolDto;
    university?: SchoolDto;
  }

  export class WorkingExperienceDto {
    position?: string;
    companyName?: string;
    responsibility?: string;
    startingDate?:string;
    endingDate?: string;
  }

  export class UpdateEmployeeDto {
    email?: string;
    name?: string;
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

export const fetchEmployeeInfo = async () => {
    const { data } = await axios.get<IApiGetEmployeeResponse>(`${process.env.REACT_APP_API_BASE_URL}employee-information`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    return data;
}

export const updateEmployeeInfo = async (updateEmployeeData: UpdateEmployeeDto) => {
    const { data } = await axios.patch<IApiGetEmployeeResponse>(`${process.env.REACT_APP_API_BASE_URL}employee-information`, 
        updateEmployeeData,
        {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
    )

    console.log(updateEmployeeData)

    return data;
}