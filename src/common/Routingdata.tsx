// Main Dashboard
import AttendanceRequest from "../components/Client-side/Attendance/AttendanceRequest";
import DayAttendance from "../components/Client-side/Attendance/DayAttendance";
import MyAttendance from "../components/Client-side/Attendance/MyAttendance";
import NightAttendance from "../components/Client-side/Attendance/NightAttendance";
import Indexpage from "../components/Dashboard/AddMinDashboard/IndexPage";


export interface routeType {
  id: number;
  path: string;
  element: JSX.Element;
  componentName?: string;
}

export const RouteData: routeType[] = [
  // Index Page
  {
    id: 1,
    path: `${import.meta.env.BASE_URL}Dashboard/IndexPage`,
    element: <Indexpage />,
  },

  // Attendance
  {
    id: 2,
    path: `${import.meta.env.BASE_URL}Attendance/DayAttendance`,
    element: <DayAttendance />,
  },
  {
    id: 3,
    path: `${import.meta.env.BASE_URL}Attendance/NightAttendance`,
    element: <NightAttendance />,
  },
  {
    id: 4,
    path: `${import.meta.env.BASE_URL}Attendance/MyAttendance`,
    element: <MyAttendance />,
  },
  {
    id: 4,
    path: `${import.meta.env.BASE_URL}Attendance/AttendanceRequest`,
    element: <AttendanceRequest />,
  },
];
