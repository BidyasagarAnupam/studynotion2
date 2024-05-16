import { toast } from "react-hot-toast"

import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {
  console.log("TOken from updateDisplayPicture ", token);
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("Idhar to aaya");
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response.data.data
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      console.log("ALL data after image upload", response.data.data);
      dispatch(setUser(response.data.data))
      // added by me
      localStorage.setItem("user", JSON.stringify(response.data.data))
      // console.log("-------FROM SETTING API DATA OF LOCAL STORAGE ",localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error.response.data)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      console.log("-------FROM SETTING API DATA OF LOCAL STORAGE BEFORE SAVE", localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      const userImage = response.data.userDetails.image
        ? response.data.userDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.userDetails.firstName} ${response.data.userDetails.lastName}`
      dispatch(
        setUser({
          ...response.data.userDetails, image: userImage
        })
      )
      toast.success("Profile Updated Successfully")
      localStorage.setItem("user", JSON.stringify(response.data.userDetails))
      console.log("-------FROM SETTING API DATA OF LOCAL STORAGE AFTER SAVE", localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);


    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error.response.data)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}

export async function changePassword(token, formData, navigate) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully");
    navigate("/dashboard/my-profile");
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error.response.data)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}