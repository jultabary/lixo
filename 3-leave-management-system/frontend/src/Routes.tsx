import { createBrowserRouter } from "react-router-dom";
import Home from "./page/Home/Home";
import EmployeeDetails from "./page/EmployeeDetails/EmployeeDetails";

export const HOME_PAGE = '/employee'
export const EMPLOYEE_PAGE = '/employee/:id'

export const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: HOME_PAGE,
      element: <Home />,
    },
    {
      path: EMPLOYEE_PAGE,
      element: <EmployeeDetails />,
    },
  ]);
  