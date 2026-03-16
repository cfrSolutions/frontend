import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./user/UserDashboard";
import SuperAdminDashboard from "./superadmin/SuperAdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Signup from "./auth/Signup";
import VerifyEmail from "./auth/VerifyEmail";
import OAuthSuccess from "./auth/OAuthSuccess";
import Dashboard from "./superadmin/Dashboard";
import Survey from "./superadmin/Survey";
import Users from "./superadmin/users";
import Addadmin from "./superadmin/Addadmin";
import CreateSurvey from "./superadmin/createSurvey";
import UserHome from "./user/UserHome";
import UserWallet from "./user/UserWallet";
import UserSurveys from "./user/UserSurveys";
import UserReports from "./user/UserReports";
import UserReferEarn from "./user/UserReferEarn";
import TermsConditions from "./user/TermsConditions";
import PrivacyPolicy from "./user/PrivacyPolicy";
import UserProfile from "./user/UserProfile";
import UserStore from "./user/UserStore";
import SurveyPreview from "./superadmin/SurveyPreview";
import UserSurveyPlay from "./pages/UserSurveyPlay";
import MockCompanyForm from "./pages/MockCompanyForm";
import Responses from "./superadmin/Responses";
import UserSettings from "./user/UserSettings";
import ConfirmDelete from "./user/ConfirmDelete";
import AdminReports from "./superadmin/AdminReports";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/" element={< Home/>} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
       

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/superadmin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/superadmin/dashboard"
  element={
    <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
      <SuperAdminDashboard />
    </ProtectedRoute>
  }
>
  <Route index element={<Dashboard />} />
  <Route path="surveys" element={<Survey />} />
  <Route path="users" element={<Users />} />
  <Route path="add-admin" element={<Addadmin />} />
   <Route path="create-survey" element={<CreateSurvey />} />
   <Route path="responses" element={<Responses />} />
   <Route path="reports" element={<AdminReports />} />
</Route>
<Route
  path="/user/dashboard"
  element={
    <ProtectedRoute allowedRoles={["USER"]}>
      <UserDashboard />
    </ProtectedRoute>
  }
>
  <Route index element={<UserHome />} />
   <Route path="wallet" element={<UserWallet />} />
  <Route path="surveys" element={<UserSurveys />} />
  <Route path="report" element={<UserReports />} />
  <Route path="refer" element={<UserReferEarn />} />
  <Route path="termcon" element={<TermsConditions />} />
  <Route path="privacy" element={<PrivacyPolicy />} />
  <Route path="profile" element={<UserProfile />} />
  <Route path="store" element={<UserStore />} />
  <Route path="settings" element={<UserSettings />} />
</Route>
<Route
  path="/user/survey/:surveyId"
  element={<UserSurveyPlay />}
/>
<Route
  path="/survey/:id"
  element={
    <ProtectedRoute allowedRoles={["SUPERADMIN", "ADMIN"]}>
      <SurveyPreview />
    </ProtectedRoute>
  }
/>
<Route path="/confirm-delete/:token" element={<ConfirmDelete />} />
<Route path="/mock-company" element={<MockCompanyForm />} />

      </Routes>
    </BrowserRouter>
  );
}
