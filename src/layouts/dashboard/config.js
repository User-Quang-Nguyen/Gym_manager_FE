import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import PermContactCalendarRoundedIcon from "@mui/icons-material/PermContactCalendarRounded";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import FeedIcon from "@mui/icons-material/Feed";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { SvgIcon } from "@mui/material";

export const items = {
  admin: [
    {
      title: "Dashboard",
      path: "/dashboard/admin",
      icon: (
        <SvgIcon fontSize="small">
          <SpaceDashboardRoundedIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Staff",
      path: "/staff",
      icon: (
        <SvgIcon fontSize="small">
          <PermContactCalendarRoundedIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Gyms",
      path: "/gyms",
      icon: (
        <SvgIcon fontSize="small">
          <FitnessCenterRoundedIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Customers",
      path: "/customers",
      icon: (
        <SvgIcon fontSize="small">
          <UsersIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Registers",
      path: "/registers",
      icon: (
        <SvgIcon fontSize="small">
          <ReceiptLongIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Feedback",
      path: "/feedback",
      icon: (
        <SvgIcon fontSize="small">
          <FeedIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Packages",
      path: "/packages",
      icon: (
        <SvgIcon fontSize="small">
          <CardTravelIcon />
        </SvgIcon>
      ),
    },
  ],

  employee: [
    {
      title: "Overview",
      path: "/dashboard/employee",
      icon: (
        <SvgIcon fontSize="small">
          <ChartBarIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Customers",
      path: "/customers",
      icon: (
        <SvgIcon fontSize="small">
          <UsersIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Registers",
      path: "/registers",
      icon: (
        <SvgIcon fontSize="small">
          <ReceiptLongIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Feedback",
      path: "/feedback",
      icon: (
        <SvgIcon fontSize="small">
          <FeedIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Packages",
      path: "/packages",
      icon: (
        <SvgIcon fontSize="small">
          <CardTravelIcon />
        </SvgIcon>
      ),
    },
  ],

  coach: [
    {
      title: "Overview",
      path: "/dashboard/employee",
      icon: (
        <SvgIcon fontSize="small">
          <ChartBarIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Users",
      path: "/users",
      icon: (
        <SvgIcon fontSize="small">
          <UsersIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Feedback",
      path: "/feedback",
      icon: (
        <SvgIcon fontSize="small">
          <FeedIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Packages",
      path: "/packages",
      icon: (
        <SvgIcon fontSize="small">
          <CardTravelIcon />
        </SvgIcon>
      ),
    },
  ],

  user: [
    {
      title: "Overview",
      path: "/dashboard/user",
      icon: (
        <SvgIcon fontSize="small">
          <ChartBarIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Feedback",
      path: "/feedback",
      icon: (
        <SvgIcon fontSize="small">
          <FeedIcon />
        </SvgIcon>
      ),
    },
    {
      title: "Packages",
      path: "/packages",
      icon: (
        <SvgIcon fontSize="small">
          <CardTravelIcon />
        </SvgIcon>
      ),
    },
  ],
};
