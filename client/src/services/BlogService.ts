import { SERVER_URL } from "@/constants/server";
import { BlogDto } from "@/dto/blogDto";
import axios from "axios";

export async function getBlogs() {
    return await axios.get(`${SERVER_URL}/blogs`, {
        withCredentials: true,
    });
}

export async function addBlog(values: BlogDto) {
    return await axios.post(`${SERVER_URL}/blogs`, values, {
        withCredentials: true,
    });
}
