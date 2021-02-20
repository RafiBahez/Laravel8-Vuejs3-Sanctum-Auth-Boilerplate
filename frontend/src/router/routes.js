import IndexPage from "../pages/IndexPage.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import LoginPage from "../auth/LoginPage.vue";
import RegisterPage from "../auth/RegisterPage.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: IndexPage,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPage,
    meta: { authOnly: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: { guestOnly: true },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    meta: { guestOnly: true },
  },
];

export default routes;
