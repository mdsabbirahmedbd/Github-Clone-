import heroPoster from "/images/hero_poster_desktop.webp";
import heroChars from "/images/hero-64ecd484397f.webp";
import { Link } from "react-router";
const Hero = () => {
  return (
    <section className="relative my-20 rounded-2xl min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0d1117] pt-16">
      <div className="absolute inset-0">
        <img
          src={heroPoster}
          alt=""
          className="w-full h-full object-cover opacity-60 "
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/40 via-transparent to-[#0d1117]" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 border border-[#30363d] bg-[#161b22]/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8 text-sm text-[#e6edf3]">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Introducing GitHub Copilot — your AI coding assistant
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          The future of{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #58a6ff, #a371f7)",
            }}
          >
            building
          </span>
          <br />
          happens together
        </h1>
        <p className="text-lg md:text-xl text-[#8b949e] max-w-2xl mx-auto mb-10 leading-relaxed">
          Tools and trends evolve, but collaboration endures. With GitHub,
          developers, agents, and code come together on one platform.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:flex-1 bg-[#161b22]/80 border border-[#30363d] text-[#e6edf3] px-4 py-3 rounded-md focus:outline-none focus:border-[#58a6ff] placeholder-[#768390]"
          />
          <Link to="/singup" className="w-full sm:w-auto bg-[#238636] hover:bg-[#2ea043] text-white font-semibold px-6 py-3 rounded-md transition-colors whitespace-nowrap">
            Sign up for GitHub
          </Link>
        </div>
        <button className="mt-4 border border-[#30363d] hover:border-[#58a6ff] text-[#e6edf3] px-8 py-3 rounded-md transition-all hover:bg-[#161b22] w-full sm:w-auto">
          Try GitHub Copilot
        </button>
      </div>

      <div className="relative z-10 mt-8 w-full max-w-5xl mx-auto px-4">
        <img src={heroChars} alt="GitHub" className="w-full object-contain rounded-xl" />
      </div>
    </section>
  );
};

export default Hero;
