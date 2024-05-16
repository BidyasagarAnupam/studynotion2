import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import NavBar from './Components/common/NavBar'
import OpenRoute from "./Components/Core/Auth/OpenRoute"
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import About from "./Pages/About";
import MyProfile from "./Components/Core/Dashboard/MyProfile";
import Dashboard from './Pages/Dashboard'
import PrivateRoute from "./Components/Core/Auth/PrivateRoute";
import Error from './Pages/Error'
import Settings from "./Components/Core/Dashboard/Settings/index";
import EnrolledCourses from "./Components/Core/Dashboard/EnrolledCourses";
import Cart from "./Components/Core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import AddCourse from "./Components/Core/Dashboard/AddCourse";
import { logout, checkTokenExpiration } from "./services/operations/authAPI";
import { useEffect } from "react";
import toast from "react-hot-toast";
import MyCourses from "./Components/Core/Dashboard/MyCourses";
import EditCourse from "./Components/Core/Dashboard/EditCourse";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./Components/Core/ViewCourse/VideoDetails";
import Contact from "./Pages/Contact";
import Instructor from "./Components/Core/Dashboard/InstructorDashboard/Instructor";




function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);


  //! This is to handle the logout when token is expired. - By Me
  useEffect(() => {
    const checkTokenAndLogoutIfNeeded = () => {
      // const token = localStorage.getItem('token');

      if (checkTokenExpiration(token)) {
        // Token has expired, perform logout
        toast.error("Token has expired, login again!");
        dispatch(logout(navigate));
      }
    };

    // // Check token expiration on every navigation event
    // const unlisten = navigate((location, action) => {
    //   checkTokenAndLogoutIfNeeded();
    // });

    // Initial check on component mount
    checkTokenAndLogoutIfNeeded();

    // Cleanup the event listener when the component unmounts
    return () => {
      // unlisten();
    };
  }, [dispatch, navigate, token]);




  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path=""
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                <Route path="/dashboard/cart" element={<Cart />} />
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
              </>
            )
          }

        </Route>

        <Route element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        }>

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
            )
          }

        </Route>




        <Route
          path="*"
          element={<Error />}
        />
      </Routes>
    </div>
  );
}

export default App;
