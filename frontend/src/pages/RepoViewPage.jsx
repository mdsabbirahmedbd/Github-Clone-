import { useParams, useLocation, useNavigate } from "react-router";
import { GoArrowLeft, GoRepo } from "react-icons/go";
import useAuth from "../Hooks/useAuth";
import RepoViewer from "./RepoViewer";

const RepoViewPage = () => {
  const { repoName } = useParams();
  const { state }    = useLocation();
  const navigate     = useNavigate();
  const { user }     = useAuth();

  const uid = state?.uid || user?.id;

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-[#8b949e] hover:text-[#e6edf3] p-1.5 rounded-md
              hover:bg-[#21262d] transition-colors"
          >
            <GoArrowLeft size={16} />
          </button>
          <GoRepo size={18} className="text-[#8b949e]" />
          <span className="text-[#58a6ff] font-semibold">{repoName}</span>
        </div>

        {/* Viewer */}
        <RepoViewer uid={uid} repoName={repoName} />
      </div>
    </div>
  );
};

export default RepoViewPage;