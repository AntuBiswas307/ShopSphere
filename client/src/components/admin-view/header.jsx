import { Database, MoveRight } from "lucide-react"; 
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/store/auth-slice";
import { toast } from "sonner";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logoutUser()).then((action) => {
      if (action?.payload?.success) {
        toast.success(action.payload.message);
      } else {
        toast.error("Something went wrong while logging out! Please try again.");
      }
    });
  }

  return (
    <header className="flex items-center px-4 py-3 lg:py-7 bg-background border-b w-full sticky top-0 z-50">
      <Button 
        onClick={() => setOpen && setOpen(true)} 
        className="lg:hidden flex cursor-pointer"
      >
        <Database />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="ml-auto" />
      <Button
        onClick={handleLogout}
        className="fixed top-3 right-4 z-[100] inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow cursor-pointer bg-black text-white hover:bg-gray-800"
      >
        <MoveRight size={16} />
        Logout
      </Button>
    </header>
  );
}

export default AdminHeader;