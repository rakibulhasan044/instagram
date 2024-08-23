import { Outlet } from "react-router-dom";
import Feed from "../Feed/Feed";
import RightSidebar from "@/components/RightSidebar";
import useGetAllPost from "@/hooks/useGetAllpost";

const Home = () => {

  useGetAllPost();

  return (
    <div className="flex w-full">
      <div className="flex-grow w-full">
        <Feed className='' />
        <Outlet />
      </div>
      <RightSidebar className='w-/12 bg-orange-200' />
    </div>
  );
};

export default Home;
