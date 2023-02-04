import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartCourse, ICourse, UserData } from "../../utils/interface";
import { showNotification } from "../../utils/ToastNotification";

export interface IBoughtCoursesState {
  status: "loading" | "idle";
  error: string | null;
  boughtCourses: ICartCourse[];
}

const initialState: IBoughtCoursesState = {
  boughtCourses: [],
  error: null,
  status: "idle",
};

type FetchBoughtCoursesError = {
  message: string;
};

export const fetchBoughtCoursesAsync = createAsyncThunk<
  ICartCourse[],
  UserData,
  { rejectValue: FetchBoughtCoursesError }
>("boughtCourses/fetchBoughtCoursesAsync", async (user, thunkApi) => {
  try {
    const response = await fetch(
      `http://localhost:3001/boughtcourse/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.success == true) {
      return data.boughtCourse;
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

type BoughtCoursesBody = {
  totalBoughtCourses: ICartCourse[];
  user: UserData;
};

export const addToBoughtCoursesAsync = createAsyncThunk<
  ICartCourse[],
  BoughtCoursesBody,
  { rejectValue: FetchBoughtCoursesError }
>(
  "boughtCourses/addToBoughtCoursesAsync",
  async (body: BoughtCoursesBody, thunkApi) => {
    const { totalBoughtCourses, user } = body;

    try {
      const response = await fetch("http://localhost:3001/boughtcourse/add", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        method: "Post",
        body: JSON.stringify(totalBoughtCourses),
      });

      const data = await response.json();
      if (data.success === true) {
        showNotification("success", "Course successfully purchased!");
        return data.boughtCourses;
      } else if (response.status !== 200) {
        // Return the error message:
        return thunkApi.rejectWithValue({
          message: data.message,
        });
      }
    } catch (error: any) {}
  }
);

export const boughtCoursesSlice = createSlice({
  name: "boughtCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /******* fetchBoughtCoursesAsync*******/
    // When we send a request,
    // `fetchCoursesAsync.pending` is being fired:
    builder.addCase(fetchBoughtCoursesAsync.pending, (state) => {
      // At that moment,
      // we change status to `loading`
      // and clear all the previous errors:
      state.status = "loading";
      state.error = null;
    });
    // When a server responses with the data,
    // `fetchCartCoursesAsync.fulfilled` is fired:
    builder.addCase(fetchBoughtCoursesAsync.fulfilled, (state, { payload }) => {
      // We add all the new todos into the state
      // and change `status` back to `idle`:
      state.boughtCourses.push(...payload);
      state.status = "idle";
    });
    // When a server responses with an error:
    builder.addCase(fetchBoughtCoursesAsync.rejected, (state, { payload }) => {
      // We show the error message
      // and change `status` back to `idle` again.
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    /******* addToBoughtCoursesAsync*******/
    // When we send a request,
    // `fetchCoursesAsync.pending` is being fired:
    builder.addCase(addToBoughtCoursesAsync.pending, (state) => {
      // At that moment,
      // we change status to `loading`
      // and clear all the previous errors:
      state.status = "loading";
      state.error = null;
    });
    // When a server responses with the data,
    // `fetchCartCoursesAsync.fulfilled` is fired:
    builder.addCase(addToBoughtCoursesAsync.fulfilled, (state, { payload }) => {
      // We add all the new todos into the state
      // and change `status` back to `idle`:
      // state.boughtCourses = payload;
      console.log(payload);
      state.boughtCourses.push(...payload);
      state.status = "idle";
    });
    // When a server responses with an error:
    builder.addCase(addToBoughtCoursesAsync.rejected, (state, { payload }) => {
      // We show the error message
      // and change `status` back to `idle` again.
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});

export default boughtCoursesSlice.reducer;
