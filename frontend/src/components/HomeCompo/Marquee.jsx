import logoGartner from "/images/logo-gartner-aa8c2e452b64.svg";
const Marquee = () => {
  const companies = [
    "Google",
    "Microsoft",
    "Airbnb",
    "Spotify",
    "Stripe",
    "Shopify",
    "Netflix",
    "Uber",
    "Twitter",
    "Meta",
    "Apple",
    "Amazon",
  ];
  return (
    <section className="bg-[#0d1117] border-y border-[#30363d]  py-8 overflow-hidden">
      <p className="text-center text-white text-sm mb-6">
        Trusted by the world's leading organizations
      </p>
      <div className="flex gap-12 animate-scroll">
        {[...companies, ...companies].map((c, i) => (
          <span
            key={i}
            className="text-[#484f58] font-semibold text-lg whitespace-nowrap"
          >
            {c}
          </span>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <img
          src={logoGartner}
          alt="Gartner"
          className="h-8  invert"
        />
      </div>
      <style>{`
        @keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .animate-scroll{animation:scroll 30s linear infinite;width:max-content}
      `}</style>
    </section>
  );
};


export default Marquee