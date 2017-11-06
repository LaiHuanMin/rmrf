import AppContent from "App.js";
import MainPage from "@pages/main/index.js";

export default {
  path: "/",
  component: AppContent,
  indexRoute: {
    component: MainPage
  },
  childRoutes: [
    {
      path: "/main",
      component: MainPage
    }
  ]
};
