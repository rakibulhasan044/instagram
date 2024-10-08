import LeftSidebar from "@/components/LeftSidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="flex">
            <LeftSidebar className='' />
            <div className="w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;