"use client";

import { useState } from "react";

type Manager = "pnpm" | "npm" | "yarn" | "bun";

const commands: Record<Manager, string> = {
  pnpm: "pnpm add @powerclub-global/ui @powerclub-global/tokens",
  npm: "npm install @powerclub-global/ui @powerclub-global/tokens",
  yarn: "yarn add @powerclub-global/ui @powerclub-global/tokens",
  bun: "bun add @powerclub-global/ui @powerclub-global/tokens",
};

const managers: Manager[] = ["npm", "pnpm", "yarn", "bun"];

export function InstallBlock() {
  const [active, setActive] = useState<Manager>("npm");
  const [copied, setCopied] = useState(false);

  const command = commands[active];

  function copy() {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-xl border border-neutral-800 overflow-hidden text-left">
      <div className="flex items-center border-b border-neutral-800 text-xs">
        {managers.map((m) => (
          <button
            key={m}
            onClick={() => setActive(m)}
            className={`relative px-4 py-3 transition-colors ${
              active === m ? "text-white" : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            {m}
            {active === m && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 px-4 py-5">
        <pre className="text-sm font-mono overflow-x-auto flex-1">
          <code className="text-neutral-200">
            <span className="text-neutral-600 select-none">~ </span>
            {command}
          </code>
        </pre>
        <button
          onClick={copy}
          aria-label="Copy install command"
          className="shrink-0 rounded-md border border-neutral-800 px-3 py-1.5 text-xs text-neutral-400 hover:border-neutral-600 hover:text-white transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
