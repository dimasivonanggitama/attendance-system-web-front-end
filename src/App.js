import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/guest/LandingPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import TestPage from "./pages/universal/TestPage";
// import ForgotPassword from "./pages/ForgotPassword";
// import SuccessPage from "./pages/guest/SuccessPage";
// import ResetPasswordPage from "./pages/guest/ResetPasswordPage";
// import MainPage from "./pages/user/MainPage";
// import TestPage from "./pages/TestPage";
// import ProductPage from "./pages/user/ProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/userManagement" element={<UserManagementPage/>} />
        {/* <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/forgotPassword/emailSent" element={<SuccessPage purpose="email"/>} />
        <Route path="/forgotPassword/passwordReset" element={<SuccessPage purpose="reset"/>} />
        <Route path="/forgotPassword/resetPassword" element={<ResetPasswordPage/>} />
        <Route path="/main" element={<MainPage role="kasir"/>} />
        <Route path="/product" element={<ProductPage role="admin" sidebar="product"/>} /> */}
        <Route path="/test" element={<TestPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
