import { SERVER_URL } from "@/constants/server";
import axios from "axios";

export async function getBlogs() {
    return await axios.get(`${SERVER_URL}/blogs`, {
        withCredentials: true,
    });
}

export async function getUserBlogs() {
    return await axios.get(`${SERVER_URL}/blogs/users`, {
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

export async function editBlog({
    id,
    values,
}: {
    id: string;
    values: FormData;
}) {
    return await axios.put(`${SERVER_URL}/blogs/${id}`, values, {
        withCredentials: true,
    });
}

export async function deleteBlog(id: string) {
    return await axios.delete(`${SERVER_URL}/blogs/${id}`, {
        withCredentials: true,
    });
}
