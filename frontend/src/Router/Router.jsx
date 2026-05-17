import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root/Root";
import Home from "../pages/Home";
import signup from "../pages/singup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import DashboardLayouts from "../Layouts/Dashboard/DashboardLayouts";
import PrivateRoute from "../Routes/PrivateRoute";
import CreateRepo from "../pages/CreateRepo";
import RepoSetup from "../pages/RepoSetup";
import Repository from "../pages/Repository";
import MyRepo from "../pages/MyRepo";
import MyPost from "../pages/MyPost";
import RepoViewPage from "../pages/RepoViewPage";
import Profile from "../pages/Profile";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/singup",
    Component: signup,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayouts />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "/dashboard/repositories",
        Component: Repository,
      },
      {
        path: "/dashboard/create-repo",
        Component: CreateRepo,
      },
      {
        path: "/dashboard/reposetup",
        Component: RepoSetup,
      },
      {
        path : '/dashboard/myrepo',
        Component : MyRepo
      },
      {
        path : '/dashboard/mypost',
        Component : MyPost
      },
      {
        path : '/dashboard/repoviwer/:repoName',
        Component : RepoViewPage
      },
      {
        path:'/dashboard/profile',
        Component : Profile
      }

    ],
  },
]);
