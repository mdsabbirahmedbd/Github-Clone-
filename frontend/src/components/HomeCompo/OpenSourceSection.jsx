import imgSponsors from "/images/download11.webp";
import imgApps from "/images/download5.webp";
const OpenSourceSection = () => (
  <section className="bg-[#0d1117] py-24 border-t border-[#21262d] ">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-3 block">
            Open Source
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Powering the world's
            <br />
            open source ecosystem.
          </h2>
          <p className="text-[#8b949e] mb-6 text-lg leading-relaxed">
            GitHub hosts the world's largest open source community.
          </p>
          <ul className="space-y-3">
            {[
              "Millions of open source repositories",
              "GitHub Sponsors to fund maintainers",
              "5,000+ integrations in the Marketplace",
              "Built-in package registry",
            ].map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-[#e6edf3]">
                <svg
                  className="text-green-400 mt-0.5 shrink-0"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                </svg>
                <span className="text-sm">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 space-y-6">
          <div className="rounded-2xl overflow-hidden border border-[#30363d]">
            <img
              src={imgApps}
              alt="Marketplace"
              className="w-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#30363d]">
            <img
              src={imgSponsors}
              alt="Sponsors"
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default OpenSourceSection;
