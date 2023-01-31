import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourse, UserData } from "../../utils/interface";

export interface ICoursesState {
  status: "loading" | "idle";
  error: string | null;
  courses: ICourse[];
}

const initialState: ICoursesState = {
  courses: [],
  error: null,
  status: "idle",
};

type FetchCoursesError = {
  message: string;
};

export const fetchCoursesAsync = createAsyncThunk<
  ICourse[],
  UserData,
  { rejectValue: FetchCoursesError }
>("courses/fetchAllCourses", async (user, thunkApi) => {
  try {
    let response = await fetch("http://localhost:3001/courses/all");
    let data = await response.json();
    if (data.success == true) {
      return data.allCourses;
    } else if (response.status !== 200) {
      // Return the error message:
      return thunkApi.rejectWithValue({
        message: "Failed to fetch courses.",
      });
    }
  } catch (error: any) {
    console.log(error);
    //   showNotification("error", error.toString());
    //   setLoading(false);
  }
});

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /******* fetchCoursesAsync*******/
    // When we send a request,
    // `fetchCoursesAsync.pending` is being fired:
    builder.addCase(fetchCoursesAsync.pending, (state) => {
      // At that moment,
      // we change status to `loading`
      // and clear all the previous errors:
      state.status = "loading";
      state.error = null;
    });
    // When a server responses with the data,
    // `fetchCartCoursesAsync.fulfilled` is fired:
    builder.addCase(fetchCoursesAsync.fulfilled, (state, { payload }) => {
      // We add all the new todos into the state
      // and change `status` back to `idle`:
      state.courses.push(...payload);
      state.status = "idle";
    });
    // When a server responses with an error:
    builder.addCase(fetchCoursesAsync.rejected, (state, { payload }) => {
      // We show the error message
      // and change `status` back to `idle` again.
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});

export default coursesSlice.reducer;
