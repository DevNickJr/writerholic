'use client'
import {useMutation} from "@tanstack/react-query";
import {toast} from 'react-toastify';
import {AxiosResponse} from "axios";

interface State {
    onSuccess?: (data: any, variables?: any, context?: any) => void;
    onError?: (error: any, variables?: any, context?: any) => void;
    showSuccessMessage?: boolean;
    showErrorMessage?: boolean;
    requireAuth?: boolean;
    id?: string;
    params?: any
}

const useMutate = <T, K>(api: (data: T, {id, token, params, ...rest}: {
    id: string,
    token: string,
    params?: any,
    rest?: any
}) => Promise<AxiosResponse>, {
                           onSuccess,
                           onError,
                           showSuccessMessage = false,
                           showErrorMessage = true,
                           id,
                           params,
                           ...rest
                       }: State) => {
    return useMutation<K, K, T>({
        mutationFn: async (data: T) => {

            const response = await api(data, {id: id || '', token: "", params});
            return response?.data;
        },
        onSuccess: (data, variables, context) => {
            // console.log("successful", data)
            if (showSuccessMessage) {
                toast.success((data as { message: string })?.message || "Successful!");
            }
            if (onSuccess) {
                // console.log("onSuccess", onSuccess)
                onSuccess(data, variables, context)
            }
        },
        onError: (error: any, variables, context) => {

            // let message: string;
            // if (error.response && error.response.data) {
            //     message = (error.response.data as { message: string }).message;
            // } else {
            //     message = error.message;
            // }
            // return message;
            console.log("error2", showErrorMessage, error)
            if (showErrorMessage) {
                if (typeof error?.response?.data?.message === "string") {
                    toast.error(error?.response?.data?.message || "An Error Occurred!");
                } else {
                    toast.error(error?.response?.data?.message[0] || "An Error Occurred!");
                }
            } else {
                // toast.error("An Error Occurred!");
            }
            if (onError) {
                onError(error, variables, context)
            }
        },
        ...rest
    })
}

export default useMutate