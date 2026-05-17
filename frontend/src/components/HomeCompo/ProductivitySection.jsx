import imgMobile from "/images/download6.webp";

import imgCodespace from "/images/download3.webp";
import imgWorkflow from "/images/download1.webp";


const ProductivitySection = () => (
  <section className="bg-[#0d1117] py-24 border-t border-[#21262d]">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#58a6ff] mb-3 block">
          Productivity
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Accelerate high-quality
          <br />
          software development.
        </h2>
        <p className="text-[#8b949e] text-lg max-w-2xl mx-auto">
          Our AI-powered platform drives innovation with tools that boost
          developer velocity.
        </p>
      </div>
      <div
        className="rounded-2xl overflow-hidden border border-[#30363d] mb-6"
        style={{ boxShadow: "0 0 60px rgba(110,64,201,0.2)" }}
      >
        <img
          src={imgCodespace}
          alt="GitHub Codespaces"
          className="w-full object-cover"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl overflow-hidden border border-[#30363d] bg-[#161b22]">
          <div className="p-6">
            <h3 className="text-white font-semibold text-lg mb-2">
              GitHub Actions
            </h3>
            <p className="text-[#8b949e] text-sm">
              Automate your workflow from idea to production.
            </p>
          </div>
          <img
            src={imgWorkflow}
            alt="GitHub Actions"
            className="w-full object-cover"
          />
        </div>
        <div className="rounded-2xl overflow-hidden border border-[#30363d] bg-[#161b22]">
          <div className="p-6">
            <h3 className="text-white font-semibold text-lg mb-2">
              GitHub Mobile
            </h3>
            <p className="text-[#8b949e] text-sm">
              Take GitHub wherever you go. Manage work from anywhere.
            </p>
          </div>
          <img
            src={imgMobile}
            alt="GitHub Mobile"
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
);
export default ProductivitySection