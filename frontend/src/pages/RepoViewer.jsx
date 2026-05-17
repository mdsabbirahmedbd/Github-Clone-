import { useState, useEffect } from "react";
import { VscFile, VscLoading } from "react-icons/vsc";
import { GoChevronDown, GoGitCommit } from "react-icons/go";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import supabase from "../config/supabase";


// ── Language map ──────────────────────────────────
const langMap = {
  js: "javascript", jsx: "jsx", ts: "typescript", tsx: "tsx",
  py: "python",     css: "css", html: "html",     json: "json",
  md: "markdown",   sh: "bash", txt: "text",       env: "bash",
};

const getLang = (name = "") => {
  const ext = name.split(".").pop().toLowerCase();
  return langMap[ext] || "text";
};

// ── File Tab ──────────────────────────────────────
const FileTab = ({ name, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-2 text-xs border-b-2 whitespace-nowrap
      transition-colors shrink-0
      ${active
        ? "border-[#f78166] text-[#e6edf3]"
        : "border-transparent text-[#8b949e] hover:text-[#e6edf3]"
      }`}
  >
    <VscFile size={12} />
    {name}
  </button>
);

// ── RepoViewer ────────────────────────────────────
// Props:
//   uid      — Supabase user id (repo owner)
//   repoName — repository name
const RepoViewer = ({ uid, repoName }) => {
  const [commits, setCommits]         = useState([]);
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [files, setFiles]             = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");

  const [loadingCommits, setLoadingCommits] = useState(true);
  const [loadingFiles,   setLoadingFiles]   = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);

    const handleFileClick = async (file) => {
    setSelectedFile(file);
    setLoadingContent(true);

    try {
      const { data: blob } = await supabase.storage
        .from("commits")
        .download(`${uid}/${repoName}/commits/${selectedCommit.name}/${file.name}`);
      setFileContent(await blob.text());
    } catch {
      setFileContent("// Could not load file content");
    } finally {
      setLoadingContent(false);
    }
  };

  // ─── Step 1: Commits নাও ─────────────────────────
  useEffect(() => {
    if (!uid || !repoName) return;

    const fetchCommits = async () => {
      setLoadingCommits(true);
      try {
        const { data } = await supabase.storage
          .from("commits")
          .list(`${uid}/${repoName}/commits`, { limit: 50 });

        const commitList = (data || []).filter((d) => d.name !== ".emptyFolderPlaceholder");

        setCommits(commitList);

        // Latest commit auto-select করো
        if (commitList.length > 0) {
          setSelectedCommit(commitList[commitList.length - 1]);
        }
      } catch (err) {
        console.log("Commit fetch error:", err.message);
      } finally {
        setLoadingCommits(false);
      }
    };

    fetchCommits();
  }, [uid, repoName]);

  // ─── Step 2: Selected commit এর files নাও ────────
  useEffect(() => {
    if (!selectedCommit) return;

    const fetchFiles = async () => {
      setLoadingFiles(true);
      setSelectedFile(null);
      setFileContent("");

      try {
        const { data } = await supabase.storage
          .from("commits")
          .list(`${uid}/${repoName}/commits/${selectedCommit.name}`, { limit: 100 });

        // commit.json বাদ দাও
        const fileList = (data || []).filter((f) => f.name !== "commit.json");
        setFiles(fileList);

        // প্রথম file auto-select করো
        if (fileList.length > 0) {
          handleFileClick(fileList[0]);
        }
      } catch (err) {
        console.log("File fetch error:", err.message);
      } finally {
        setLoadingFiles(false);
      }
    };

    fetchFiles();
  }, [selectedCommit]);

  // ─── Step 3: File content নাও ────────────────────


  // ─── Loading state ────────────────────────────────
  if (loadingCommits) {
    return (
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl flex
        items-center justify-center py-16">
        <div className="text-center">
          <VscLoading size={20} className="animate-spin text-[#8b949e] mx-auto mb-2" />
          <p className="text-[#8b949e] text-xs">Loading repository...</p>
        </div>
      </div>
    );
  }

  // ─── No commits ───────────────────────────────────
  if (!loadingCommits && commits.length === 0) {
    return (
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl
        flex items-center justify-center py-16">
        <div className="text-center">
          <VscFile size={28} className="text-[#30363d] mx-auto mb-2" />
          <p className="text-[#8b949e] text-sm">No code pushed yet</p>
          <p className="text-[#484f58] text-xs mt-1">
            Use the CLI to push your first commit
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">

      {/* ── Top Bar: Commit selector ── */}
      <div className="flex items-center justify-between px-4 py-2.5
        border-b border-[#30363d] bg-[#0d1117]">

        <div className="flex items-center gap-2">
          <GoGitCommit size={14} className="text-[#8b949e]" />
          <span className="text-[#8b949e] text-xs">
            {commits.length} commit{commits.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Commit dropdown */}
        <div className="relative">
          <select
            value={selectedCommit?.name || ""}
            onChange={(e) => {
              const c = commits.find((c) => c.name === e.target.value);
              if (c) setSelectedCommit(c);
            }}
            className="appearance-none bg-[#21262d] border border-[#30363d] text-[#e6edf3]
              text-xs px-3 py-1.5 pr-7 rounded-md focus:outline-none
              focus:border-[#58a6ff] cursor-pointer"
          >
            {commits.map((c, i) => (
              <option key={c.name} value={c.name}>
                {c.name.slice(0, 8)}...{i === commits.length - 1 ? " (latest)" : ""}
              </option>
            ))}
          </select>
          <GoChevronDown
            size={12}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8b949e] pointer-events-none"
          />
        </div>
      </div>

      {/* ── File Tabs ── */}
      {!loadingFiles && files.length > 0 && (
        <div className="flex items-center overflow-x-auto border-b border-[#30363d]
          bg-[#0d1117] scrollbar-none">
          {files.map((file) => (
            <FileTab
              key={file.name}
              name={file.name}
              active={selectedFile?.name === file.name}
              onClick={() => handleFileClick(file)}
            />
          ))}
        </div>
      )}

      {/* ── Code Viewer ── */}
      {loadingFiles || loadingContent ? (
        <div className="flex items-center justify-center py-20">
          <VscLoading size={18} className="animate-spin text-[#8b949e]" />
        </div>
      ) : !selectedFile ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-[#8b949e] text-sm">Select a file to view</p>
        </div>
      ) : (
        <>
          {/* File name bar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[#21262d]
            bg-[#161b22]">
            <VscFile size={13} className="text-[#8b949e]" />
            <span className="text-[#e6edf3] text-xs font-mono">{selectedFile.name}</span>
            <span className="text-[#484f58] text-xs ml-auto uppercase">
              {getLang(selectedFile.name)}
            </span>
          </div>

          {/* Syntax highlighted code */}
          <SyntaxHighlighter
            language={getLang(selectedFile.name)}
            style={oneDark}
            showLineNumbers
            customStyle={{
              margin: 0,
              borderRadius: 0,
              background: "#0d1117",
              fontSize: "13px",
              maxHeight: "520px",
            }}
            lineNumberStyle={{ color: "#484f58", minWidth: "3em" }}
          >
            {fileContent || "// Empty file"}
          </SyntaxHighlighter>
        </>
      )}
    </div>
  );
};

export default RepoViewer;