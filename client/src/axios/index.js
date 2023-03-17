import axios from "axios"

const API_URL = "http://localhost:8080/api/v1"

export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
})

export const axiosPrivateInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
})