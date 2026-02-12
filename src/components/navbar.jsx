import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast(
      ({ closeToast }) => (
        <div className="space-y-3">
          <p className="font-medium">Are you sure you want to logout?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={closeToast}
              className="rounded bg-gray-200 px-3 py-1 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                closeToast();
                toast.success("Logged out successfully");
                navigate("/login");
              }}
              className="rounded bg-red-600 px-3 py-1 text-sm text-white"
            >
              Logout
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-10">
        {/* Brand */}
        <div className="flex items-center gap-2 text-xl font-semibold text-sky-600">
          💧 Water Refilling Station
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <NavItem to="/dashboard" label="Dashboard" />
          <NavItem to="/sales" label="Sales" />
          <NavItem to="/customers" label="Customers" />
          <NavItem to="/inventory" label="Inventory" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="rounded-md px-3 py-1 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>
        </nav>

        {/* Mobile toggle */}
        <button className="text-2xl md:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="space-y-2 border-t bg-white px-6 py-4 md:hidden">
          <NavItem
            to="/dashboard"
            label="Dashboard"
            onClick={() => setOpen(false)}
          />
          <NavItem to="/sales" label="Sales" onClick={() => setOpen(false)} />
          <NavItem
            to="/customers"
            label="Customers"
            onClick={() => setOpen(false)}
          />
          <NavItem
            to="/inventory"
            label="Inventory"
            onClick={() => setOpen(false)}
          />

          <button
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
            className="block w-full rounded px-1 py-1 text-left text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

function NavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `border-b-2 px-1 pb-1 transition ${
          isActive
            ? "border-sky-600 text-sky-600"
            : "border-transparent text-slate-600 hover:text-slate-900"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
