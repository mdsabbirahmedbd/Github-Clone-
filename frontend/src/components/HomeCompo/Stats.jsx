const statsmenu = [
  { number: "100M+", label: "Developers" },
  { number: "4M+", label: "Organizations" },
  { number: "500M+", label: "Repositories" },
  { number: "90%", label: "Fortune 100 companies" },
];
const Stats = () => (
  <section className="bg-[#0d1117] py-20">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
      {statsmenu.map((s, i) => (
        <div key={i} className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-white mb-2">
            {s.number}
          </div>
          <div className="text-[#8b949e] text-sm">{s.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Stats;
