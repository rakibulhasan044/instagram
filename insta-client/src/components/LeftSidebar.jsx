import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CreatePost from "./Dialog/CreatePost";

const LeftSidebar = () => {

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className=" flex items-center justify-center">
          <AvatarImage
            src={user?.profilePicture}
            alt="image"
            className="size-10 rounded-full"
          />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // const createPostHandler = async () => {
  //   setOpen(true);
  // }

  const sidebarHandler = async (TextType) => {
    if (TextType === "Logout") {
      logoutHandler();
    } else if (TextType === "Create") {
      // createPostHandler();
      setOpen(true);
    }
  };
  return (
    <div className="px-4 border-r border-gray-300 w-[20%] h-screen">
      <div className="flex flex-col">
        <h1 className="font-bold text-center py-3">logo</h1>
        {sidebarItems.map((item, index) => {
          return (
            <div
              key={index}
              className="my-3 flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg py-3 px-1"
              onClick={() => sidebarHandler(item.text)}
            >
              {item.icon}
              <span className="font-semibold">{item.text}</span>
            </div>
          );
        })}
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;
