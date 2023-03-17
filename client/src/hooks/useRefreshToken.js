import { axiosInstance } from "../axios";
import useAuth from "./useAuth";

export default function useRefreshToken() {
    const { setAccessToken, setCSRFToken } = useAuth()

    const refresh = async () => {
        const response = await axiosInstance.post('/accounts/refresh-token/')
        setAccessToken(response.data.access)
        setCSRFToken(response.headers["X-CSRFToken"])

        return { accessToken: response.data.access, csrfToken: response.headers["x-csrftoken"] }
    }

    return refresh
}