
import imgIssue from "/images/download8.webp";
import imgDiscussion from "/images/download12.webp";
import imgPRReview from "/images/download13.webp"


const collaboreat = [
          {
            title: "Pull Requests",
            desc: "Code review with inline suggestions and auto-merge.",
            img: imgPRReview,
          },
          {
            title: "Issues & Projects",
            desc: "Track bugs, ideas, and tasks all in one place.",
            img: imgIssue,
          },
          {
            title: "Discussions",
            desc: "Build community around your projects.",
            img: imgDiscussion,
          },
        ]
const CollaborationSection = () => (
  <section className="bg-[#0d1117] py-24 border-t border-[#21262d]">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3 block">
          Collaboration
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Build together,
          <br />
          ship faster.
        </h2>
        <p className="text-[#8b949e] text-lg max-w-2xl mx-auto">
          From code review to project management, GitHub has everything your
          team needs.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collaboreat.map((item, i) => (
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

export default CollaborationSection;