import axios from "axios";
import {REST_API_URL} from "../config";

const API_URL = `${REST_API_URL}/api/v1`;
// const API_URL = "http://localhost:8081/api/v1"

export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

export const axiosPrivateInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});