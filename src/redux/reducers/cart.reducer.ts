import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartCourse, ICourse, UserData } from "../../utils/interface";
import { showNotification } from "../../utils/ToastNotification";
import { RootState } from "../store/store";

export interface ICartCoursesState {
  status: "loading" | "idle";
  error: string | null;
  cartCourses: ICartCourse[];
}

const initialState: ICartCoursesState = {
  cartCourses: [],
  error: null,
  status: "idle",
};

type FetchCartCoursesError = {
  message: string;
};

export const fetchCartCoursesAsync = createAsyncThunk<
  ICartCourse[],
  UserData,
  { rejectValue: FetchCartCoursesError }
>("cartCourses/fetchCartCoursesAsync", async (user: UserData, thunkApi) => {
  try {
    let response = await fetch(`http://localhost:3001/cart/user/${user.id}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    if (data.success == true) {
      return data.cartCourse;
    } // Check if status is not okay:
    else if (response.status !== 200) {
      // Return the error message:
      return thunkApi.rejectWithValue({
        message: "Failed to fetch cartCourses.",
      });
    }
  } catch (error: any) {
    // showNotification("error", error.toString());
    // setLoading(false);
  }
});

type AddToCartBody = {
  courseDetails: ICourse;
  user: UserData;
};

export const addToCartAsync = createAsyncThunk<
  ICartCourse,
  AddToCartBody,
  { rejectValue: FetchCartCoursesError }
>("cartCourses/addToCartAsync", async (body: AddToCartBody, thunkApi) => {
  const { courseDetails, user } = body;
  const CourseDataForCart = {
    ...courseDetails,
    course_id: courseDetails?._id,
    user_id: user.id,
  };
  delete CourseDataForCart._id;

  try {
    const response = await fetch("http://localhost:3001/cart/add", {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
      method: "Post",
      body: JSON.stringify(CourseDataForCart),
    });

    const data = await response.json();
    if (data.success === true) {
      showNotification("success", "Course added to cart!");
      return data.cartCourse;
    } else if (response.status !== 200) {
      // Return the error message:
      return thunkApi.rejectWithValue({
        message: data.message,
      });
    }
  } catch (error: any) {}
});

type DeleteFromCartBody = {
  _id: string;
  user: UserData;
};

export const deleteCourseFromCartAsync = createAsyncThunk<
  ICartCourse,
  DeleteFromCartBody,
  { rejectValue: FetchCartCoursesError }
>(
  "cartCourses/deleteCourseFromCartAsync",
  async (body: DeleteFromCartBody, thunkApi) => {
    const { _id, user } = body;
    try {
      let response = await fetch(`http://localhost:3001/cart/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id }),
      });
      let data = await response.json();
      if (data.success == true) {
        showNotification(
          "success",
          "Course successfully removed from your cart!"
        );
        return data.cartCourse;
      } else if (response.status !== 200) {
        // Return the error message:
        return thunkApi.rejectWithValue({
          message: data.message,
        });
      }
    } catch (error: any) {
      showNotification("error", error.toString());
    }
  }
);

export const selectStatus = (state: RootState) => state.cartCourses.status;

export const cartCoursesSlice = createSlice({
  name: "cartCourses",
  initialState,
  reducers: {
    removeCourseFromCartAfterPurchase: (state) => {
      state.cartCourses = [];
      return state;
    },
  },
  extraReducers: (builder) => {
    /******* FetchCartCoursesAsync*******/
    // When we send a request,
    // `fetchCartCoursesAsync.pending` is being fired:
    builder.addCase(fetchCartCoursesAsync.pending, (state) => {
      // At that moment,
      // we change status to `loading`
      // and clear all the previous errors:
      state.status = "loading";
      state.error = null;
    });
    // When a server responses with the data,
    // `fetchCartCoursesAsync.fulfilled` is fired:
    builder.addCase(fetchCartCoursesAsync.fulfilled, (state, { payload }) => {
      // We add all the new todos into the state
      // and change `status` back to `idle`:
      state.cartCourses.push(...payload);
      state.status = "idle";
    });
    // When a server responses with an error:
    builder.addCase(fetchCartCoursesAsync.rejected, (state, { payload }) => {
      // We show the error message
      // and change `status` back to `idle` again.
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    /******* AddToCartAsync*******/
    // When we send a request,
    // `addToCartAsync.pending` is being fired:
    builder.addCase(addToCartAsync.pending, (state) => {
      // At that moment,
      // we change status to `loading`
      // and clear all the previous errors:
      state.status = "loading";
      state.error = null;
    });
    // When a server responses with the data,
    // `addToCartAsync.fulfilled` is fired:
    builder.addCase(addToCartAsync.fulfilled, (state, { payload }) => {
      // We add all the new todos into the state
      // and change `status` back to `idle`:
      state.cartCourses.push(payload);
      state.status = "idle";
    });
    // When a server responses with an error:
    builder.addCase(addToCartAsync.rejected, (state, { payload }) => {
      // We show the error message
      // and change `status` back to `idle` again.
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    /******* deleteCourseFromCartAsync*******/
    // When we send a request,
    // `deleteCourseFromCartAsync.pending` is being fired:
    builder.addCase(deleteCourseFromCartAsync.pending, (state) => {
      // At that moment,
      // we change status to `loading`
      // and clear all the previous errors:
      state.status = "loading";
      state.error = null;
    });
    // When a server responses with the data,
    // `addToCartAsync.fulfilled` is fired:
    builder.addCase(
      deleteCourseFromCartAsync.fulfilled,
      (state, { payload }) => {
        // We add all the new todos into the state
        // and change `status` back to `idle`:
        // state.cartCourses.push(payload);

        state.cartCourses = state.cartCourses.filter((cartCourse) => {
          return cartCourse.course_id !== payload.course_id;
        });

        state.status = "idle";
      }
    );
    // When a server responses with an error:
    builder.addCase(
      deleteCourseFromCartAsync.rejected,
      (state, { payload }) => {
        // We show the error message
        // and change `status` back to `idle` again.
        if (payload) state.error = payload.message;
        state.status = "idle";
      }
    );
  },
});

export const { removeCourseFromCartAfterPurchase } = cartCoursesSlice.actions;

export default cartCoursesSlice.reducer;
