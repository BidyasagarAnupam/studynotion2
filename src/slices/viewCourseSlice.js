import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  courseSectionData: localStorage.getItem("courseSectionData")
    ? JSON.parse(localStorage.getItem("courseSectionData"))
    : [],
  courseEntireData: localStorage.getItem("courseEntireData")
    ? JSON.parse(localStorage.getItem("courseEntireData"))
    : [],
  completedLectures: [],
  totalNoOfLectures: localStorage.getItem("totalNoOfLectures")
    ? JSON.parse(localStorage.getItem("totalNoOfLectures"))
    : 0,
}

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload
      // Update to localstorage
      localStorage.setItem("courseSectionData", JSON.stringify(state.courseSectionData))
    },
    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload
      // Update to localstorage
      localStorage.setItem("courseEntireData", JSON.stringify(state.courseEntireData))
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload
      // Update to localstorage
      localStorage.setItem("totalNoOfLectures", JSON.stringify(state.totalNoOfLectures))
    },
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload
      // Update to localstorage
      localStorage.setItem("completedLectures", JSON.stringify(state.completedLectures))
    },
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload]
    },
  },
})

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions

export default viewCourseSlice.reducer