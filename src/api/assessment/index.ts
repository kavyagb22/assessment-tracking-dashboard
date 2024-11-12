import { IResponse, postReq, getReq, putReq } from "../index";
import { CommonApiResponse } from "../types";
import { AssessmentData } from "./types";

interface CreateAssessmentBody {
    candidateName: string;
    title: string;
    date: string;
    status: string;
    score: string;
}

interface UpdateAssessmentBody {
    candidateName: string;
    title: string;
    date: string;
    status: string;
    score: string;
}

export const getAssessmentAPI = async (): // body: LoginBody
Promise<CommonApiResponse & { data: AssessmentData }> => {
    const response = await getReq({
        path: "/assessments",
        // data: body,
    });
    return response;
};

export const createAssessmentAPI = async (
    body: CreateAssessmentBody
): // body: LoginBody
Promise<CommonApiResponse & { data: AssessmentData }> => {
    const response = await postReq({
        path: "/create-assessment",
        data: body,
    });
    return response;
};

export const updateAssessmentAPI = async (
    id: Number,
    body: UpdateAssessmentBody
): // body: LoginBody
Promise<CommonApiResponse & { data: AssessmentData }> => {
    const response = await putReq({
        path: `/update-assessment/${id}`,
        data: body,
    });
    return response;
};
