import { getProfile } from "@/services/UserService";
import { User } from "@/types/entities";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCurrentUser = createAsyncThunk(
    "authReducer/userData/fetchCurrentUser",
    async () => {
        const response = await getProfile();
        return response.data.data;
    }
);

type InitialState = {
    isAuth: boolean;
    userData: null | User;
    isLoading: boolean;
};

const initialState: InitialState = {
    isAuth: false,
    userData: null,
    isLoading: false,
};

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logUser: (state, { payload }: PayloadAction<User>) => {
            (state.isAuth = true), (state.userData = payload);
        },
        logout: (state) => {
            state.isAuth = false;
            state.userData = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.isAuth = true;
                state.userData = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuth = false;
                state.userData = null;
            });
    },
});

export const { logUser, logout } = auth.actions;
export default auth.reducer;
