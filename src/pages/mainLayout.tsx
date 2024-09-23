import { Outlet } from "react-router-dom";

import { ThemeToggle } from "@/components/theme-toogle";

export const MainLayout = () => {
  return (
    <div>
      <div className="flex justify-end pr-4 pt-4">
        <ThemeToggle />
      </div>
      <Outlet />
    </div>
  );
};
