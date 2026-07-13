import {
  ListOrdered,
  Shield,
  SquareDashedText,
  ShoppingCart,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  { id: "dashboard", label: "Dashboard", path: "/admin/dashboard", icon: <SquareDashedText /> },
  { id: "products", label: "Products", path: "/admin/products", icon: <ShoppingCart /> },
  { id: "orders", label: "Orders", path: "/admin/orders", icon: <ListOrdered /> },
];

// 1. Unified Menu Component
function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            if (setOpen) setOpen(false);
          }}
          className={`flex cursor-pointer text-xl items-center gap-3 rounded-md px-4 py-3 transition-colors ${
            location.pathname === menuItem.path
              ? "bg-black text-white"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

// 2. Unified Header Component (Used in both)
function SidebarHeader({ onClick }) {
  return (
    <div 
      onClick={onClick}
      className="flex cursor-pointer items-center gap-2 border-b pb-5 pt-5"
    >
      <Shield size={30} />
      <h1 className="text-2xl font-extrabold tracking-tight">Admin Panel</h1>
    </div>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Mobile Version */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-6">
          <SheetHeader>
            <SheetTitle>
              <SidebarHeader onClick={() => { navigate("/admin/dashboard"); setOpen(false); }} />
            </SheetTitle>
          </SheetHeader>
          <MenuItems setOpen={setOpen} />
        </SheetContent>
      </Sheet>

      {/* Desktop Version */}
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex h-screen">
        <SidebarHeader onClick={() => navigate("/admin/dashboard")} />
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;