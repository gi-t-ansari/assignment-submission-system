import { APP_URL } from "./url";
import {
  MdOutlineSpaceDashboard,
  MdSpaceDashboard,
  MdOutlineAssignment,
  MdAssignment,
} from "react-icons/md";

export const MENU_ITEMS = [
  {
    name: "dashboard",
    url: APP_URL.DASHBOARD,
    icon: MdOutlineSpaceDashboard,
    isSelected: MdSpaceDashboard,
  },
  {
    name: "assignments",
    url: APP_URL.ASSIGNMENTS,
    icon: MdOutlineAssignment,
    isSelected: MdAssignment,
  },
];
