import { SERVER_URL } from "@/constants/server";
import axios from "axios";

export async function getBlogs() {
    return await axios.get(`${SERVER_URL}/blogs`, {
        withCredentials: true,
    });
}

export async function getBlog(id: string) {
    return await axios.get(`${SERVER_URL}/blogs/${id}`, {
        withCredentials: true,
    });
}

export async function addBlog(values: FormData) {
    return await axios.post(`${SERVER_URL}/blogs`, values, {
        withCredentials: true,
    });
}
