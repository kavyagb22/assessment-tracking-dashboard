import { getAPIURL } from "@/lib/env";
import axios from "axios";
import { ResponseStatusCode } from "./types";
import { useAuthStore } from "../stores/auth-store";

axios.defaults.baseURL = getAPIURL();

export interface IResponse {
    category: string;
    code: ResponseStatusCode;
    message: string;
}

export interface IRequest {
    path: string;
    params?: any;
    headers?: any;
    token?: string;
}

export interface IPostReqest extends IRequest {
    data?: any;
    message?: any;
    status?: any;
}

export const postReq = async ({
    path,
    data = {},
    params = {},
    headers = {},
}: IPostReqest) => {
    const { token } = useAuthStore.getState();
    return await axios.post(path, data, {
        params,
        headers: {
            ...(token && {
                Authorization: `Bearer ${token}`,
            }),
            ...headers,
        },
    });
};

export const getReq = async ({
    path,
    params = {},
    headers = {},
}: // token,
IRequest) => {
    const { token } = useAuthStore.getState();
    return await axios.get(path, {
        params,
        headers: {
            ...(token && {
                Authorization: `Bearer ${token}`,
            }),
            ...headers,
        },
    });
};

export const formPostReq = async ({
    path,
    data,
    params,
    headers = {},
    token,
}: IRequest & { data: FormData }) => {
    return await axios.post(path, data, {
        params,
        headers: {
            "Content-Type": "multipart/form-data",
            ...(token && {
                Authorization: `Bearer ${token}`,
            }),
            ...headers,
        },
    });
};

export const putReq = async ({
    path,
    data = {},
    params = {},
    headers = {},
}: // token,
IPostReqest) => {
    const { token } = useAuthStore.getState();
    return await axios.put(path, data, {
        params,
        headers: {
            ...(token && {
                Authorization: `Bearer ${token}`,
            }),
            ...headers,
        },
    });
};

export const deleteReq = async ({
    path,
    params = {},
    headers = {},
    token,
}: IRequest) => {
    return await axios.delete(path, {
        params,
        headers: {
            ...(token && {
                Authorization: `Bearer ${token}`,
            }),
            ...headers,
        },
    });
};
