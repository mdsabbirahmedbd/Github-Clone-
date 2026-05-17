import imgCampaign from "/images/download9.webp";
import imgSecret from "/images/download4.webp";
import imgDeps from "/images/download2.webp";
const SecuritySection = () => (
  <section className="bg-[#0d1117] py-24 border-t border-[#21262d]">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-yellow-400 mb-3 block">
          Security
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Secure code from
          <br />
          day one.
        </h2>
        <p className="text-[#8b949e] text-lg max-w-2xl mx-auto">
          GitHub's built-in security features catch vulnerabilities before they
          become problems.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Secret Scanning",
            desc: "Block accidental secret leaks before they happen.",
            img: imgSecret,
          },
          {
            title: "Dependency Review",
            desc: "Catch vulnerable dependencies before merging.",
            img: imgDeps,
          },
          {
            title: "Security Campaigns",
            desc: "Remediate vulnerabilities at scale.",
            img: imgCampaign,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden border border-[#30363d] bg-[#161b22]"
          >
            <div className="p-5">
              <h3 className="text-white font-semibold mb-1">{item.title}</h3>
              <p className="text-[#8b949e] text-sm">{item.desc}</p>
            </div>
            <img
              src={item.img}
              alt={item.title}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);


export default SecuritySection