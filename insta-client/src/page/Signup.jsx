import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate('/')
        toast.success(res.data.message);
        setInput({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        onSubmit={signupHandler}
        className=" shadow-lg flex flex-col gap-5 p-8 rounded-lg"
      >
        <div>
          <h1 className="text-center font-bold text-xl">Logo</h1>
          <p className="text-sm text-center">
            Signup to see photos and videos from your friends
          </p>
        </div>
        <div>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className=" focus-visible:ring-transparent my-2"
          ></Input>
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          ></Input>
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className=" focus-visible:ring-transparent my-2"
          ></Input>
        </div>
        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 w-4 animate-spin">
              <FaSpinner />
            </Loader2>
          </Button>
        ) : (
          <Button type="submit">Singup</Button>
        )}
        <span className="text-center">Already have an account? <Link to='/login' className="text-blue-600">Login</Link></span>
      </form>
    </div>
  );
};

export default Signup;
