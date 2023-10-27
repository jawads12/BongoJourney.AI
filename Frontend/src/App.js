import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Landingpage from "./pages/Landingpage.js";
import Signup from "./pages/Signup.js";
import Signin from "./pages/Signin.js";
import MyPlan from "./pages/MyPlan";
import Dashboard from "./components/Dashboard.js"
import DashboardNew from "./pages/Dashboardnew.js";
import BuildPlanMyself from "./components/BuildPlanMyself.js";
import Pop1 from "./components/Pop1.js";
import { useEffect } from "react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/dashboard":
        title = "";
        metaDescription = "";
        break;
      case "/signup":
        title = "";
        metaDescription = "";
        break;
      case "/signin":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/my-plan" element={<MyPlan />} />

        <Route path="/dashboard" element={<DashboardNew />} >
          <Route path="ashol-dashboard" element={<Dashboard />} />
          <Route path="build_plan_myself" element={<BuildPlanMyself/>}/>
        </Route>
      </Routes>
    </div>


  );
}
export default App;
