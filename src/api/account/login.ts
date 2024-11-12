import { IResponse, postReq } from "../index";
import { CommonApiResponse } from "../types";
import { AccountData } from "./types";

interface LoginBody {
    username: string;
    password: string;
}

export const loginAPI = async (
    body: LoginBody
): Promise<CommonApiResponse & { data: AccountData }> => {
    const response = await postReq({
        path: "/login",
        data: body,
    });
    return response;
};
