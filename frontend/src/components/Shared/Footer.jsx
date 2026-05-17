import logoGithub from "/images/githublogo.png";
const Footer = () => {
  const links = {
    Product: [
      "Features",
      "Enterprise",
      "Copilot",
      "Security",
      "Pricing",
      "Resources",
    ],
    Platform: [
      "Developer API",
      "Partners",
      "Atom",
      "Electron",
      "GitHub Desktop",
    ],
    Support: [
      "Docs",
      "Community Forum",
      "Professional Services",
      "Skills",
      "Status",
      "Contact",
    ],
    Company: ["About", "Blog", "Careers", "Press", "Inclusion", "Shop"],
  };
  return (
    <footer className="bg-[#0d1117] border-t border-[#21262d] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap gap-12 mb-12">
          <div className="w-full md:w-auto">
            <img
              src={logoGithub}
              alt="GitHub"
              className="w-8 h-8 invert mb-4"
            />
            <p className="text-[#8b949e] text-sm max-w-xs">
              GitHub is where the world builds software.
            </p>
          </div>
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="flex-1 min-w-32">
              <h3 className="text-[#e6edf3] text-sm font-semibold mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[#8b949e] hover:text-[#e6edf3] text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-[#21262d] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#8b949e] text-xs">
            © 2026 GitHub, Inc. · Privacy · Terms · Security · Status · Docs
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "LinkedIn", "YouTube", "Facebook"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[#8b949e] hover:text-[#e6edf3] text-xs transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer