import { Link } from "react-router";
import logoGithub from "/images/githublogo.png";

import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const menu = [
  { name: "Product", link: "https://github.com/features/copilot" },
  { name: "Solutions", link: "https://github.com/enterprise" },
  { name: "Resources", link: "https://github.com/resources/articles?topic=ai" },
  { name: "Open Source", link: "https://github.com/open-source/sponsors" },
  { name: "Enterprise", link: "https://github.com/enterprise" },
];

const Navbar = () => {
  const {user ,logout} = useAuth()
  const axiosSecure = useAxiosSecure()
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  



  const logoutUser = async () => {
     try {
        logout()
        await  axiosSecure.get('/users/logout')
     } catch (error) {
          console.log(error)
     } 
   
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0d1117] border-b border-[#30363d]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to={"/"}>
            <img src={logoGithub} alt="GitHub" className="w-8 h-8 invert" />
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {menu.map((item) => (
              <a
                key={item}
                href={item.link}
                target="_blank"
                className="text-sm text-[#e6edf3] hover:text-white px-3 py-2 rounded-md hover:bg-white/10 transition-all"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search or jump to..."
              className="bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-sm px-3 py-1.5 rounded-md w-64 focus:outline-none focus:border-[#58a6ff] placeholder-[#768390]"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#768390] text-xs border border-[#30363d] px-1 rounded">
              /
            </span>
          </div>
         {
          user ? (
      <div className="gap-5 flex">
          <button onClick={logoutUser} className="px-5 py-2 rounded-xl bg-[#161b22]/70 border border-white/10 backdrop-blur-lg text-[#e6edf3] hover:bg-[#21262d]/80hover:border-[#30363d]  transition-all duration-300 shadow-md">Logout</button>
            <Link to={'/dashboard'}
            className="px-5 py-2 rounded-xl bg-[#161b22]/70 border border-white/10 backdrop-blur-lg text-[#e6edf3] hover:bg-[#21262d]/80hover:border-[#30363d]  transition-all duration-300 shadow-md"
          >
            Profile
          </Link>
      </div>
          ) : (
          <div className="flex gap-3">
            <Link
              to={"/login"}
              className="text-sm text-[#e6edf3] hover:text-white px-3 py-1.5"
            >
              Sign in
            </Link>
            <Link
              to={"/singup"}
              className="text-sm bg-white text-[#1f2328] hover:bg-gray-100 px-4 py-1.5 rounded-md font-medium"
            >
              Sign up
            </Link>
          </div>
          )
         }

       
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#0d1117] border-t border-[#30363d] px-4 py-4 flex flex-col gap-2">
          {menu.map((item) => (
            <a
              key={item}
              href={item.link}
              className="text-[#e6edf3] text-sm py-2"
            >
              {item.name}
            </a>
          ))}


          {

            user ? (
                     <div className="gap-5 flex">
          <button onClick={logoutUser}  className="px-5 py-2 rounded-xl bg-[#161b22]/70 border border-white/10 backdrop-blur-lg text-[#e6edf3] hover:bg-[#21262d]/80hover:border-[#30363d]  transition-all duration-300 shadow-md">Logout</button>
            <Link to={'/dashboard'}
            className="px-5 py-2 rounded-xl bg-[#161b22]/70 border border-white/10 backdrop-blur-lg text-[#e6edf3] hover:bg-[#21262d]/80hover:border-[#30363d]  transition-all duration-300 shadow-md"
          >
            Profile
          </Link>
      </div>
            ) : (
                 <div className="border-t border-[#30363d] pt-3 mt-2 flex flex-col gap-2">
            <a href="#" className="text-[#e6edf3] text-sm py-2">
              Sign in
            </a>
            <a
              href="#"
              className="bg-white text-[#1f2328] text-sm px-4 py-2 rounded-md text-center font-medium"
            >
              Sign up
            </a>
          </div>
            )
          }


       

        </div>
      )}
    </nav>
  );
};

export default Navbar;
