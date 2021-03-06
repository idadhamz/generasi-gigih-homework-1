import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isAuthenticated: boolean;
  accessToken?: string;
  data?: SpotifyApi.CurrentUsersProfileResponse;
}

const initialState: UserState = {
  isAuthenticated: false,
  accessToken: undefined,
  data: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload;
    },
    storeUserData: (
      state,
      action: PayloadAction<SpotifyApi.CurrentUsersProfileResponse>
    ) => {
      state.data = action.payload;
    },
    logout: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { login, storeUserData, logout } = userSlice.actions;

export default userSlice.reducer;
