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
// import Users from "./superadmin/users";
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
import Solutions from "./pages/Solutions";
import Responses from "./superadmin/Responses";
import UserSettings from "./user/UserSettings";
import ConfirmDelete from "./user/ConfirmDelete";
import AdminReports from "./superadmin/AdminReports";
import Products from "./pages/Products";
import Company from "./pages/Company";
import BusinessLayout from "./business/BusinessLayout";
import BusinessDashboard from "./business/BusinessDashboard";
import CreateProject from "./business/CreateProject";
import ProjectStatus from "./business/ProjectStatus";
import AdminProjects from "./superadmin/AdminProjects";
import AdminProjectDetail from "./superadmin/AdminProjectDetail";
import SurveyStatusPages from "./business/SurveyStatusPages";
import CreateProjects from "./business/createProjects";
import SurveyBuilder from "./business/SurveyBuilder";
import SurveyForms from "./business/SurveyForms";
import ProjectDetail from "./business/ProjectDetail";
import TargetGroupForm from "./business/TargetGroupForm";
import SurveyRunner from "./business/SurveyRunner";
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

        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        /> */}

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
  {/* <Route path="users" element={<Users />} /> */}
  <Route path="add-admin" element={<Addadmin />} />
   <Route path="create-survey" element={<CreateSurvey />} />
   <Route path="responses" element={<Responses />} />
   <Route path="reports" element={<AdminReports />} />
   <Route path="projects" element={<AdminProjects />} />
   <Route path="project/:id" element={<AdminProjectDetail />} />
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

 
    
    <Route path="/why-inputify" element={<Home/>} />
   <Route path="/solutions" element={<Solutions />} />
   <Route path="/products" element={<Products />} />
   <Route path="/company" element={<Company />} />
   
  
<Route
  path="/survey/:id"
  element={
    <ProtectedRoute allowedRoles={["SUPERADMIN", "ADMIN"]}>
      <SurveyPreview />
    </ProtectedRoute>
  }
/>
{/* <Route path="/confirm-delete/:token" element={<ConfirmDelete />} /> */}
<Route path="/delete-account" element={<ConfirmDelete />} />
<Route path="/mock-company" element={<MockCompanyForm />} />

{/* <Route path="/business/dashboard" element={<BusinessLayout />}>
  <Route index element={<BusinessDashboard />} />
  <Route path="/business/dashboard/projects" element={<CreateProject />} />
  
</Route> */}
<Route path="/business/dashboard" element={<BusinessLayout />}>
  <Route index element={<BusinessDashboard />} />
  {/* <Route path="projects" element={<CreateProject />} /> */}
  <Route path="projects" element={<CreateProjects />} />
  <Route
  path="project/:id"
  element={<ProjectDetail />}
/>

 {/* <Route
    path="project/:id/target-group/new"
    element={<TargetGroupForm />}
  /> */}

  <Route
  path="project/:projectId/target-group/new"
  element={<TargetGroupForm />}
/>

<Route
  path="project/:projectId/target-group/:targetGroupId"
  element={<TargetGroupForm />}
/>
 <Route
    path="project/:id/status"
    element={<ProjectStatus />}
  />
  <Route path="project/:id/status" element={<ProjectStatus />} />
  <Route path="live" element={<BusinessDashboard />} />
  <Route path="hold" element={<BusinessDashboard />} />
  <Route path="closed" element={<BusinessDashboard />} />
  <Route path="drafts" element={<BusinessDashboard />} />
  <Route path="negotiation" element={<BusinessDashboard />} />
   <Route
    path="survey-builder"
    element={<SurveyBuilder />}/>

  <Route
    path="survey-forms"
    element={<SurveyForms />}
/>

<Route
    path="survey-builder"
    element={<SurveyBuilder />}
/>

<Route
    path="survey-builder/:id"
    element={<SurveyBuilder />}
/>

  {/* <Route
  path="/business/project/:id/status"
  element={<ProjectStatus />}
/> */}
</Route>

<Route
  path="/survey/run/:token"
  element={<SurveyRunner />}
/>

<Route path="/thank-you" element={<SurveyStatusPages />} />
<Route path="/disqualified" element={<SurveyStatusPages />} />
<Route path="/quota-full" element={<SurveyStatusPages />} />

      </Routes>
    </BrowserRouter>
  );
}
