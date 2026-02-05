import { type AxiosInstance } from "axios";

export const register = async (api: AxiosInstance, request: RegisterRequest) => {
    const { data } = await api.post('/auth/register', request);
    return data
}

export const login = async (api: AxiosInstance, request: LoginRequest) => {
    const { data } = await api.post('/auth/login', request);
    return data
}