import { SERVER_URL } from "@/constants/server";
import axios from "axios";

export async function getProfile() {
    return await axios.get(`${SERVER_URL}/users/current`, {
        withCredentials: true,
    });
}

export async function editProfile(values: FormData) {
    return await axios.put(`${SERVER_URL}/users/current`, values, {
        withCredentials: true,
    });
}
