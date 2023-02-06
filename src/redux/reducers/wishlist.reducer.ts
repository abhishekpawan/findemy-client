import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartCourse, ICourse, UserData } from "../../utils/interface";
import { showNotification } from "../../utils/ToastNotification";
import { RootState } from "../store/store";

export interface IWishlistCoursesState {
  status: "loading" | "idle";
  error: string | null;
  wishlistCourses: ICartCourse[];
}

const initialState: IWishlistCoursesState = {
  wishlistCourses: [],
  error: null,
  status: "idle",
};

type FetchWishlistCoursesError = {
  message: string;
};

export const fetchWishlistCoursesAsync = createAsyncThunk<
  ICartCourse[],
  UserData,
  { rejectValue: FetchWishlistCoursesError }
>(
  "wishlistCourses/fetchWishlistCoursesAsync",
  async (user: UserData, thunkApi) => {
    try {
      let response = await fetch(
        `http://localhost:3001/wishlist/user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      if (data.success == true) {
        return data.wishlistCourse;
      } // Check if status is not okay:
      else if (response.status !== 200) {
        // Return the error message:
        return thunkApi.rejectWithValue({
          message: "Failed to fetch wishlistCourses.",
        });
      }
    } catch (error: any) {
      // showNotification("error", error.toString());
      // setLoading(false);
    }
  }
);

type AddToWishlistBody = {
  courseDetails: ICourse;
  user: UserData;
};

export const addToWishlistAsync = createAsyncThunk<
  ICartCourse,
  AddToWishlistBody,
  { rejectValue: FetchWishlistCoursesError }
>(
  "wishlistCourses/addToWishlistAsync",
  async (body: AddToWishlistBody, thunkApi) => {
    const { courseDetails, user } = body;
    const CourseDataForWishlist = {
      ...courseDetails,
      course_id: courseDetails?._id,
      user_id: user.id,
    };
    delete CourseDataForWishlist._id;

    try {
      const response = await fetch("http://localhost:3001/wishlist/add", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        method: "Post",
        body: JSON.stringify(CourseDataForWishlist),
      });

      const data = await response.json();
      if (data.success === true) {
        showNotification("success", "Course added to wishlist!");
        return data.wishlistCourse;
      } else if (response.status !== 200) {
        // Return the error message:
        return thunkApi.rejectWithValue({
          message: data.message,
        });
      }
    } catch (error: any) {}
  }
);

type DeleteFromWishlistBody = {
  _id: string;
  user: UserData;
};

export const deleteCourseFromWishlistAsync = createAsyncThunk<
  ICartCourse,
  DeleteFromWishlistBody,
  { rejectValue: FetchWishlistCoursesError }
>(
  "wishlistCourses/deleteCourseFromWishlistAsync",
  async (body: DeleteFromWishlistBody, thunkApi) => {
    const { _id, user } = body;
    try {
      let response = await fetch(`http://localhost:3001/wishlist/${_id}`, {
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
          "Course successfully removed from your wishlist!"
        );
        return data.wishlistCourse;
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

export const selectStatus = (state: RootState) => state.wishlistCourses.status;

export const wishlistCoursesSlice = createSlice({
  name: "wishlistCourses",
  initialState,
  reducers: {
    removeCourseFromWishlistAfterPurchase: (state) => {
      state.wishlistCourses = [];
      return state;
    },
  },
  extraReducers: (builder) => {
    /******* FetchWishlistCoursesAsync*******/
    // When we send a request,
    // `fetchWishlistCoursesAsync.pending` is being fired:
    builder.addCase(fetchWishlistCoursesAsync.pending, (state) => {
      // At that moment,
      // we change status to `loading`
      // and clear all the previous errors:
      state.status = "loading";
      state.error = null;
    });
    // When a server responses with the data,
    // `fetchWishlistCoursesAsync.fulfilled` is fired:
    builder.addCase(
      fetchWishlistCoursesAsync.fulfilled,
      (state, { payload }) => {
        // We add all the new todos into the state
        // and change `status` back to `idle`:
        state.wishlistCourses.push(...payload);
        state.status = "idle";
      }
    );
    // When a server responses with an error:
    builder.addCase(
      fetchWishlistCoursesAsync.rejected,
      (state, { payload }) => {
        // We show the error message
        // and change `status` back to `idle` again.
        if (payload) state.error = payload.message;
        state.status = "idle";
      }
    );

    /******* AddToWishlistAsync*******/
    // When we send a request,
    // `addToWishlistAsync.pending` is being fired:
    builder.addCase(addToWishlistAsync.pending, (state) => {
      // At that moment,
      // we change status to `loading`
      // and clear all the previous errors:
      state.status = "loading";
      state.error = null;
    });
    // When a server responses with the data,
    // `addToWishlistAsync.fulfilled` is fired:
    builder.addCase(addToWishlistAsync.fulfilled, (state, { payload }) => {
      // We add all the new todos into the state
      // and change `status` back to `idle`:
      state.wishlistCourses.push(payload);
      state.status = "idle";
    });
    // When a server responses with an error:
    builder.addCase(addToWishlistAsync.rejected, (state, { payload }) => {
      // We show the error message
      // and change `status` back to `idle` again.
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    /******* deleteCourseFromWishlistAsync*******/
    // When we send a request,
    // `deleteCourseFromWishlistAsync.pending` is being fired:
    builder.addCase(deleteCourseFromWishlistAsync.pending, (state) => {
      // At that moment,
      // we change status to `loading`
      // and clear all the previous errors:
      state.status = "loading";
      state.error = null;
    });
    // When a server responses with the data,
    // `addToWishlistAsync.fulfilled` is fired:
    builder.addCase(
      deleteCourseFromWishlistAsync.fulfilled,
      (state, { payload }) => {
        // We add all the new todos into the state
        // and change `status` back to `idle`:
        // state.wishlistCourses.push(payload);
        state.wishlistCourses = state.wishlistCourses.filter(
          (wishlistCourse) => {
            return wishlistCourse.course_id !== payload.course_id;
          }
        );

        state.status = "idle";
      }
    );
    // When a server responses with an error:
    builder.addCase(
      deleteCourseFromWishlistAsync.rejected,
      (state, { payload }) => {
        // We show the error message
        // and change `status` back to `idle` again.
        if (payload) state.error = payload.message;
        state.status = "idle";
      }
    );
  },
});

export const { removeCourseFromWishlistAfterPurchase } =
  wishlistCoursesSlice.actions;

export default wishlistCoursesSlice.reducer;
