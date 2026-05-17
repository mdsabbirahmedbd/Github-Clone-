import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import {  VscRepo,VscGitPullRequest,} from "react-icons/vsc";
import { GoPlus,GoChevronDown, GoGear, GoSignOut, GoPerson, GoOrganization, GoBook,GoSearch,GoX,} from "react-icons/go";
import { BsCodeSlash } from "react-icons/bs";
import useAuth from "../../Hooks/useAuth";
import logoGithub from "/images/githublogo.png";




const PlusDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const DropdownMenu = [
            { label: "New repository",address : '/dashboard/create-repo' , icon:  <VscRepo size={14} /> },
            { label: "Import repository",address : '/dashboard/create-repo', icon: <GoBook size={14} /> },
            { label: "New codespace",address : '/dashboard/create-repo', icon: <BsCodeSlash size={14} /> },
            { label: "New organization",address : '/dashboard/create-repo', icon: <GoOrganization size={14} /> },
          ];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-0.5 text-[#e6edf3] hover:text-white p-1.5 rounded-md hover:bg-white/10 transition-all"
      >
        <GoPlus size={18} />
        <GoChevronDown size={12} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-[#161b22] border border-[#30363d] rounded-xl shadow-xl z-50 overflow-hidden">
          {DropdownMenu.map((item) => (
            <Link
              to={item.address}
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#e6edf3] hover:bg-[#21262d] hover:text-white transition-colors text-left"
              onClick={() => setOpen(false)}
            >
              <span className="text-[#8b949e]">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};


const UserDropdown = ({ user, logout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const username =
    user?.user_metadata?.user_name ||
    user?.user_metadata?.name 

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);


  const navLinks = [
              {
                label: "Your Profile",
                icon: <GoPerson size={14} />,
                to: "/dashboard/profile",
              },
              {
                label: "Your repositories",
                icon: <VscRepo size={14} />,
                to: "/dashboard/myrepo",
              },
              {
                label: "Your Code Blogs",
                icon: <BsCodeSlash size={14} />,
                to: "/dashboard/mypost",
              },
            ]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
      >
        {/* user avatar  */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold ring-1 ring-white/10">
          {user?.user_metadata?.name?.[0]?.toUpperCase() ||
            user?.email?.[0]?.toUpperCase() ||
            "U"}
        </div>
        <GoChevronDown size={12} className="text-[#8b949e]" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl z-50 overflow-hidden">
          {/* User info */}
          <div className="px-4 py-3 border-b border-[#30363d]">
            <p className="text-[#8b949e] text-xs">Signed in as</p>
            <p className="text-[#e6edf3] text-sm font-semibold truncate">
              {username}
            </p>
          </div>

          {/* Links */}
          <div className="py-1 border-b border-[#30363d]">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-[#e6edf3] hover:bg-[#21262d] hover:text-white transition-colors"
              >
                <span className="text-[#8b949e]">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="py-1 border-b border-[#30363d]">
            <Link
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-[#e6edf3] hover:bg-[#21262d] hover:text-white transition-colors"
            >
              <span className="text-[#8b949e]">
                <GoGear size={14} />
              </span>
              Settings
            </Link>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#e6edf3] hover:bg-[#21262d] hover:text-white transition-colors text-left"
            >
              <span className="text-[#8b949e]">
                <GoSignOut size={14} />
              </span>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="flex-1 max-w-sm">
      <div className="relative">
        <GoSearch
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]"
        />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search or jump to..."
          className="w-full bg-[#0d1117] border border-[#58a6ff] text-[#e6edf3] text-sm pl-8 pr-8 py-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-[#58a6ff] placeholder-[#768390]"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8b949e] hover:text-white"
          >
            <GoX size={14} />
          </button>
        )}
        {!query && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#768390] text-xs border border-[#30363d] px-1 rounded">
            /
          </span>
        )}
      </div>
    </div>
  );
};


const navLinks = [
  {label: "Code Blogs", icon: <VscGitPullRequest size={16} />,to: "/dashboard",},
  { label: "Repositories", icon: <BsCodeSlash size={16} />, to: "/dashboard/repositories" },

];


const MobileMenu = ({ user, logout, onClose }) => {
  const location = useLocation();

  return (
    <div className="md:hidden fixed inset-0 z-40 flex flex-col bg-[#0d1117]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-[#30363d]">
        <div className="flex items-center gap-3">
          <span className="text-[#e6edf3] text-sm font-medium">
            {user?.user_metadata?.name || user?.email?.split("@")[0]}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-[#8b949e] hover:text-white p-1.5"
        >
          <GoX size={20} />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-[#30363d]">
        <div className="relative">
          <GoSearch
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]"
          />
          <input
            placeholder="Search or jump to..."
            className="w-full bg-[#161b22] border border-[#30363d] text-[#e6edf3] text-sm pl-8 pr-3 py-2 rounded-md focus:outline-none focus:border-[#58a6ff] placeholder-[#768390]"
          />
        </div>
      </div>

      {/* Nav links */}
      <div className="flex-1 overflow-y-auto py-2">
        {navLinks.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
              location.pathname === item.to
                ? "text-white bg-[#21262d]"
                : "text-[#e6edf3] hover:bg-[#161b22] hover:text-white"
            }`}
          >
            <span className="text-[#8b949e]">{item.icon}</span>
            {item.label}
          </Link>
        ))}

        <div className="border-t border-[#30363d] mt-2 pt-2">
          {[
            {
              label: "Your profile",
              to: "/dashboard/profile",
              icon: <GoPerson size={16} />,
            },
            {
              label: "Your repositories",
              to: "/dashboard/myrepo",
              icon: <VscRepo size={16} />,
            },
            { label: "Settings", to: "/dashboard", icon: <GoGear size={16} /> },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-sm text-[#e6edf3] hover:bg-[#161b22] hover:text-white transition-colors"
            >
              <span className="text-[#8b949e]">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="border-t border-[#30363d] p-4">
        <button
          onClick={() => {
            logout();
            onClose();
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-[#e6edf3] bg-[#21262d] hover:bg-[#30363d] rounded-lg transition-colors border border-[#30363d]"
        >
          <GoSignOut size={16} />
          Sign out
        </button>
      </div>
    </div>
  );
};

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className=" fixed top-0 left-0 right-0 z-50 bg-[#161b22] border-b border-[#30363d] h-16">
        <div className="max-w-screen-xl mx-auto px-4 h-full flex items-center gap-3">
          {/* ── Logo ── */}
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition-colors shrink-0"
          >
            <img className="w-8 h-8 invert" src={logoGithub} alt="" />
          </Link>

          {/* ── Search ── */}

          <div className="hidden md:flex flex-1 max-w-xs">
            <SearchBar />
          </div>

          {/* ── Nav Links (Desktop) ── */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  location.pathname === item.to
                    ? "text-white bg-white/10"
                    : "text-[#e6edf3] hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ── Right Side ── */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Plus button */}
            <div>
              <PlusDropdown />
            </div>
            {/* User Avatar Dropdown */}
            <div className="hidden md:block ml-1">
              <UserDropdown user={user} logout={logout} />
            </div>
             

             {/* User button for movile view  */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold"
            >
              {user?.user_metadata?.name?.[0]?.toUpperCase() ||
                user?.email?.[0]?.toUpperCase() ||
                "U"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <MobileMenu
          user={user}
          logout={logout}
          onClose={() => setMobileOpen(false)}
        />
      )}


      <div className="h-16" />
    </>
  );
};

export default DashboardNavbar;
