import axios from "axios";
import { getCookie } from "./utils";
import { userTokenName } from "@/constants/tokens";

axios.interceptors.request.use((request) => {
    request.withCredentials = true;
    const isRunningOnNode = typeof window === "undefined";
    if (!isRunningOnNode) {
        const userToken = getCookie(userTokenName);
        request.headers.Authorization = `Bearer ${userToken}`;
    }
    return request;
});
