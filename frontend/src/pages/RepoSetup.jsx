import { useState } from "react";
import { Link, useLocation } from "react-router";
import { GoTerminal, GoCheck, GoCopy, GoRepo } from "react-icons/go";
import useAuth from "../Hooks/useAuth";

// ── Copy Button ───────────────────────────────────
const CopyBtn = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 text-[#8b949e]
      hover:text-[#e6edf3] text-xs px-2 py-1 rounded
      hover:bg-[#30363d] transition-colors"
    >
      {
        copied
          ? <GoCheck size={12} className="text-green-400" />
          : <GoCopy size={12} />
      }

      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

// ── Command Block ─────────────────────────────────
const CmdBlock = ({ cmd, comment }) => {
  return (
    <div>
      {
        comment &&
        <p className="text-[#8b949e] text-xs mb-1">
          # {comment}
        </p>
      }

      <div
        className="flex items-center justify-between
        bg-[#0d1117] border border-[#30363d]
        rounded-lg px-4 py-2.5"
      >
        <code className="text-sm text-[#58a6ff] font-mono">
          {cmd}
        </code>

        <CopyBtn text={cmd} />
      </div>
    </div>
  );
};

// ── Main Setup Page ───────────────────────────────
const RepoSetup = () => {
  const { user } = useAuth();
  const location = useLocation();

  const repoName = location.state || "RepoName";
  const uid = user?.id;

  return (
    <div className="min-h-screen bg-[#0d1117] px-4 py-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <GoRepo size={20} className="text-[#8b949e]" />

            <h1 className="text-2xl font-semibold text-[#e6edf3]">
              Repository created successfully
            </h1>
          </div>

          <p className="text-[#8b949e] text-sm">
            Run this command and push 
          </p>
        </div>

        {/* Setup Card */}
        <div
          className="bg-[#161b22] border border-[#30363d]
          rounded-2xl p-6"
        >

          {/* Top */}
          <div className="flex items-center gap-2 mb-6">
            <GoTerminal size={28} className="text-[#58a6ff]" />

            <h2 className="text-[#e6edf3] text-xl font-semibold">
              Quick Setup
            </h2>
          </div>

          <div className="mb-8">
            <div className="space-y-3">

              <CmdBlock
                cmd="mygit init"
                comment="repository initialize command"
              />
              <CmdBlock
                cmd="mygit add FileName"
                comment="add all files to staging area"
              />
              <CmdBlock
                cmd="mygit commit 'first commit'"
                comment="commit to staging area"
              />
              <CmdBlock
                cmd={`mygit remote ${uid}/${repoName}`}
                comment="connect with your repository name"
              />

              <CmdBlock
                cmd="mygit push"
                comment="push to remote repository"
              />

            </div>
          </div>

        </div>

        {/* Bottom Buttons */}
        <div className="mt-8 flex items-center gap-4">

          <Link
            to="/dashboard/repositories"
            className="bg-[#238636] hover:bg-[#2ea043]
            text-white text-sm font-medium
            px-5 py-2.5 rounded-lg transition-colors"
          >
            View Repository
          </Link>

          <Link
            to="/dashboard"
            className="border border-[#30363d]
            hover:bg-[#21262d]
            text-[#e6edf3] text-sm
            px-5 py-2.5 rounded-lg transition-colors"
          >
            Back to Dashboard
          </Link>

        </div>
      </div>
    </div>
  );
};

export default RepoSetup;