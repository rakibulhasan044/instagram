import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const sendMessageHandler = async () => {
    alert(text);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-4xl min-h-96 p-1 flex flex-col"
      >
        <div className="flex flex-1 gap-5">
          <div className="w-1/2 flex items-center">
            <img
              className="rounded-md  w-full "
              src="https://images.unsplash.com/photo-1720590509047-4bd0591aaf13?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className="font-semibold text-xs">Username</Link>
                  {/* <span className="text-gray-600 text-xs">Bio here...</span> */}
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="text-sm">
                  <div className="cursor-pointer w-full text-center text-[#ED4956]">
                    Unfollow
                  </div>
                  <div className="cursor-pointer w-full text-center">
                    Add to favorites
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className="flex-1 overflow-y-auto">comments here</div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={text}
                  onChange={changeEventHandler}
                  className="w-full outline-none border border-gray-300 p-2 rounded"
                />
                <Button
                  disabled={!text.trim()}
                  onClick={sendMessageHandler}
                  variant="outline"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
