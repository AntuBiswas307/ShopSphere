import { House, ArrowRight, Menu, ShoppingBag, UserCog, SquareChevronLeft } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "../shopping-view/cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import { toast } from "sonner";

function MenuItems({ setOpenMenuSheet }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? { category: [getCurrentMenuItem.id] }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    if (setOpenMenuSheet) setOpenMenuSheet(false);

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`))
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => {
        const categoryParam = searchParams.get("category");
        const isActive =
          menuItem.id === "home"
            ? location.pathname === "/shopping/home"
            :           menuItem.path === "/shopping/listing"
              ? location.pathname.includes("listing")
                ? categoryParam
                  ? menuItem.id === categoryParam
                  : menuItem.id === "products"
                : false
              : menuItem.id === "search"
                ? location.pathname.includes("search")
                : false;

        return (
          <Label
            onClick={() => handleNavigate(menuItem)}
            className={`text-sm !cursor-pointer transition-colors px-3 py-1.5 rounded-md ${
              isActive
                ? "bg-black text-white hover:bg-black hover:text-white"
                : "font-medium hover:text-primary"
            }`}
            key={menuItem.id}
          >
            {menuItem.label}
          </Label>
        );
      })}
    </nav>
  );
}

function HeaderRightContent({ setOpenMenuSheet }) {
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.shopCart?.cartItems || state.shoppingCart?.cartItems || []);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    if (setOpenMenuSheet) setOpenMenuSheet(false);
    // dispatch(logoutUser()).then(() => toast.success("Logged out successfully."));
    dispatch(resetTokenAndCredentials()).then(() => {toast.success("Logged out successfully."); navigate("/shopping/home");});
    sessionStorage.clear();
    navigate("/auth/login");
  }

  function handleAccountClick() {
    if (setOpenMenuSheet) setOpenMenuSheet(false);
    navigate("/shopping/account");
  }

  useEffect(() => {
    if (user?.id) dispatch(fetchCartItems(user?.id));
  }, [dispatch, user]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black !cursor-pointer w-10 h-10 self-start lg:self-auto">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName ? user.userName[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleAccountClick} className="!cursor-pointer">
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="!cursor-pointer">
            <ArrowRight className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative w-10 h-10 self-start lg:self-auto !cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={(val) => {
            setOpenCartSheet(val);
            if (!val && setOpenMenuSheet) setOpenMenuSheet(false);
          }}
          cartItems={cartItems?.items || []}
        />
      </Sheet>
    </div>
  );
}

function ShoppingHeader() {
  const [openMenuSheet, setOpenMenuSheet] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shopping/home" className="flex items-center gap-2">
          <House className="h-6 w-6" />
          <span className="font-bold">ShopSphere</span>
        </Link>
        <Sheet open={openMenuSheet} onOpenChange={setOpenMenuSheet}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden w-10 h-10 p-2 cursor-pointer">
              <SquareChevronLeft className="h-6 w-6 stroke-[1.75]" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:max-w-[300px] p-6 flex flex-col gap-6">
            <div className="mt-4 border-b pb-6">
              <HeaderRightContent setOpenMenuSheet={setOpenMenuSheet} />
            </div>
            <div className="mt-2">
              <MenuItems setOpenMenuSheet={setOpenMenuSheet} />
            </div>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block"><MenuItems /></div>
        <div className="hidden lg:block"><HeaderRightContent /></div>
      </div>
    </header>
  );
}

export default ShoppingHeader;