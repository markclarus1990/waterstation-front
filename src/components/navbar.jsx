import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b">
      <div className="max-w-screen-2xl mx-auto px-10 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2 text-xl font-semibold text-sky-600">
          💧 Water Refilling Station
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavItem to="/dashboard" label="Dashboard" />
          <NavItem to="/sales" label="Sales" />
          <NavItem to="/customers" label="Customers" />
          <NavItem to="/inventory" label="Inventory" />
        </nav>

        {/* Mobile toggle ONLY on small screens */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-2">
          <NavItem to="/dashboard" label="Dashboard" onClick={() => setOpen(false)} />
          <NavItem to="/sales" label="Sales" onClick={() => setOpen(false)} />
          <NavItem to="/customers" label="Customers" onClick={() => setOpen(false)} />
          <NavItem to="/inventory" label="Inventory" onClick={() => setOpen(false)} />
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
        `px-1 pb-1 border-b-2 transition ${
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
