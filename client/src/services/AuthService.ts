import { SERVER_URL } from "@/constants/server";
import { LoginDto } from "@/dto/loginDto";
import { RegisterDto } from "@/dto/registerDto";
import axios from "axios";

export async function loginUser(values: LoginDto) {
    return await axios.post(`${SERVER_URL}/login`, values, {
        withCredentials: true,
    });
}

export async function registerUser(values: RegisterDto) {
    return await axios.post(`${SERVER_URL}/register`, values, {
        withCredentials: true,
    });
}
