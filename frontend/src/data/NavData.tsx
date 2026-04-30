import type { NavItem } from "../types/NavItemType";

export const NavData: Array<NavItem> = [
  { label: "Home", href: "/" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

export const NavDataAuth: Array<NavItem> = [
  { label: "Home", href: "/" },
  { label: "My todos", href: "/todos" },
  { label: "Create", href: "/create" },
];
