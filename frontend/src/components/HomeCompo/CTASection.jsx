import imgSignup from "/images/sing-up.webp";
import logoGithub from "/images/githublogo.png";
const CTASection = () => (
  <section className="relative py-28 border-t border-[#21262d] overflow-hidden">
    <div className="absolute inset-0">
      <img
        src={imgSignup}
        alt=""
        className="w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/60 to-transparent" />
    </div>
    <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
      <img
        src={logoGithub}
        alt="GitHub"
        className="w-16 h-16 invert mx-auto mb-8 bg-white rounded-full p-2"
      />
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Let's build from here
      </h2>
      <p className="text-[#8b949e] text-lg mb-10">
        Join over 100 million developers who shape the future of software
        together.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-[#238636] hover:bg-[#2ea043] text-white font-semibold px-8 py-3 rounded-md transition-colors text-lg">
          Sign up for free
        </button>
        <button className="border border-[#30363d] hover:border-[#58a6ff] text-[#e6edf3] px-8 py-3 rounded-md transition-all hover:bg-[#161b22] text-lg">
          Talk to enterprise sales
        </button>
      </div>
    </div>
  </section>
);

export default CTASection;