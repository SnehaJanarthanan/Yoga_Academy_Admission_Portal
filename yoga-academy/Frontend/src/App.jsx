import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LazyLayout from "./components/ui/LazyLayout";
import "./App.css";

const LazyHome = lazy(() => import("./pages/user/Home"));
const LazyAbout = lazy(() => import("./pages/user/About"));
const LazyClasses = lazy(() => import("./pages/user/Classes"));
const LazyLogin = lazy(() => import("./pages/authentication/Login"));
const LazyRegister = lazy(() => import("./pages/authentication/Register"));
const LazyDashboard = lazy(() => import("./pages/admin/Dashboard"));
const LazyDashboardClasses = lazy(() =>
  import("./pages/admin/courseDashboard")
);
const LazyaddClass = lazy(() => import("./pages/admin/addCourse"));
const LazyDashboardInstitute = lazy(() =>
  import("./pages/admin/instituteDashboard")
);
const LazyInstituteUserPage = lazy(() => import("./pages/user/Institute"));
const LazyUserInfo = lazy(() => import("./pages/user/UserInfo"));
const LazyStudentDashboardPage = lazy(() => import("./pages/admin/Student"));

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<LazyLayout component={<LazyHome />} />} />
      <Route path="/about" element={<LazyLayout component={<LazyAbout />} />} />
    </Routes>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={<LazyLayout component={<LazyDashboard />} />}
      />
      <Route
        path="/userinfo"
        element={<LazyLayout component={<LazyUserInfo />} />}
      />
    </Routes>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Navigate to="/yoga/login" />} />
        <Route path="/yoga/login" element={<LazyLogin />} />
        <Route path="/yoga/register" element={<LazyRegister />} />
        <Route path="/yoga/user/home" element={<LazyHome />} />
        <Route path="/yoga/user/userinfo" element={<LazyUserInfo />} />
        <Route path="/yoga/admin/dashboard" element={<LazyDashboard />} />
        <Route path="/yoga/user/about" element={<LazyAbout />} />
        <Route path="/yoga/user/class" element={<LazyClasses />} />
        <Route path="/yoga/admin/class" element={<LazyDashboardClasses />} />
        <Route
          path="/yoga/admin/institute"
          element={<LazyDashboardInstitute />}
        />
        <Route path="/yoga/admin/add_class" element={<LazyaddClass />} />
        <Route
          path="/yoga/user/institute"
          element={<LazyInstituteUserPage />}
        />
        <Route
          path="/yoga/admin/student"
          element={<LazyStudentDashboardPage />}
        />
      </Routes>
    </>
  );
}

export default App;
