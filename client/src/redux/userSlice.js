import { createSlice } from "@reduxjs/toolkit";

// Lấy thông tin người dùng từ sessionStorage (nếu có)
const storedUser = sessionStorage.getItem("user");
const initialUser = storedUser ? JSON.parse(storedUser) : null;

// Lấy danh sách công việc đã lưu từ localStorage (nếu có)
const storedJobs = localStorage.getItem("savedJobs");
const initialSavedJobs = storedJobs ? JSON.parse(storedJobs) : [];

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
    savedJobs: initialSavedJobs,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      sessionStorage.removeItem("user");
    },
    saveJob: (state, action) => {
      if (!state.savedJobs.includes(action.payload)) {
        state.savedJobs.push(action.payload);
        localStorage.setItem("savedJobs", JSON.stringify(state.savedJobs));
      }
    },
    removeSavedJob: (state, action) => {
      state.savedJobs = state.savedJobs.filter((job) => job !== action.payload);
      localStorage.setItem("savedJobs", JSON.stringify(state.savedJobs));
    },
  },
});

export const { login, logout, saveJob, removeSavedJob } = userSlice.actions;
export default userSlice.reducer;
