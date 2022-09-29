import axios from "axios"
import { IApiGetUserInfoResponse } from "../types/user"

export const fetchUserInfo = async () => {
    const { data } = await axios.get<IApiGetUserInfoResponse>(`${process.env.REACT_APP_API_BASE_URL}user/user-info`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    return data;
}