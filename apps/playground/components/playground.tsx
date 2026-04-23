"use client";

import { useState, useMemo } from "react";
import type { ComponentConfig } from "./types";
import { ComponentForm } from "./component-form";
import { generateJSX } from "./jsx-generator";

interface PlaygroundProps {
  config: ComponentConfig;
  component: React.ComponentType<Record<string, unknown>>;
  rawSource: string;
  highlightedSource: string;
}

type ViewMode = "preview" | "code";

export function Playground({
  config,
  component: Component,
  rawSource,
  highlightedSource,
}: PlaygroundProps) {
  const defaults = useMemo(() => {
    const d: Record<string, unknown> = {};
    for (const c of config.controls) {
      d[c.name] = c.defaultValue;
    }
    return d;
  }, [config.controls]);

  const [values, setValues] = useState<Record<string, unknown>>(defaults);
  const [children, setChildren] = useState(config.childrenControl?.defaultValue ?? "");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>("preview");

  const componentProps = useMemo(() => {
    const filtered: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(values)) {
      if (v !== undefined && v !== null && v !== "") {
        filtered[k] = v;
      }
    }
    return { ...config.staticProps, ...filtered };
  }, [values, config.staticProps]);

  const usageCode = generateJSX(config.name, componentProps, defaults, children || undefined);
  const importLine = `import { ${config.name} } from "@powerclub-global/ui";`;
  const isFullWidth = config.category === "block" || config.category === "layout";

  function copy(key: string, text: string) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 2500);
  }

  function handleReset() {
    setValues(defaults);
    setChildren(config.childrenControl?.defaultValue ?? "");
  }

  return (
    <div className="px-10 py-10 max-w-5xl">
      <div className="flex items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-5xl font-bold tracking-tight">{config.name}</h1>
          <p className="mt-3 max-w-2xl text-neutral-400">{config.description}</p>
        </div>
        <button
          onClick={handleReset}
          className="shrink-0 rounded-md border border-neutral-800 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:border-neutral-600 hover:text-white"
        >
          Reset
        </button>
      </div>

      <div className="mb-4 inline-flex rounded-lg border border-neutral-800 p-1">
        <button
          onClick={() => setView("preview")}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            view === "preview"
              ? "bg-white/[0.06] text-white"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => setView("code")}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            view === "code"
              ? "bg-white/[0.06] text-white"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          Code
        </button>
      </div>

      <div className="rounded-2xl border border-neutral-800 overflow-hidden">
        {view === "preview" ? (
          <div
            className={`preview-panel preview-dark ${
              isFullWidth
                ? "flex h-[560px] overflow-auto p-6"
                : "flex min-h-[340px] items-center justify-center p-10"
            }`}
          >
            <div className={isFullWidth ? "m-auto w-full" : ""}>
              {children ? (
                <Component {...componentProps}>{children}</Component>
              ) : (
                <Component {...componentProps} />
              )}
            </div>
          </div>
        ) : (
          <CodeBlock
            html={highlightedSource}
            onCopy={() => copy("source", rawSource)}
            copied={copiedKey === "source"}
            maxHeight="600px"
          />
        )}
      </div>

      <section className="mt-14">
        <h2 className="mb-4 text-2xl font-bold">Install</h2>
        <div className="rounded-xl border border-neutral-800 overflow-hidden">
          <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-2 text-xs text-neutral-500 uppercase tracking-wider">
            <span>Import</span>
            <button
              onClick={() => copy("install", importLine)}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              {copiedKey === "install" ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="px-4 py-3 text-sm font-mono text-neutral-200 overflow-x-auto">
            <code>{importLine}</code>
          </pre>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="rounded-xl border border-neutral-800 overflow-hidden">
          <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-2 text-xs text-neutral-500 uppercase tracking-wider">
            <span>Example</span>
            <button
              onClick={() => copy("usage", usageCode)}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              {copiedKey === "usage" ? "Copied!" : "Copy"}
            </button>
          </div>
          <NumberedCode code={usageCode} />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-4 text-2xl font-bold">Customize</h2>
        <div className="rounded-xl border border-neutral-800 p-6">
          <ComponentForm
            controls={config.controls}
            values={values}
            onChange={setValues}
            childrenControl={config.childrenControl}
            childrenValue={children}
            onChildrenChange={setChildren}
          />
        </div>
      </section>

      <section className="mt-14 mb-20">
        <h2 className="mb-4 text-2xl font-bold">Props</h2>
        <div className="overflow-hidden rounded-xl border border-neutral-800">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-neutral-500">
              <tr className="border-b border-neutral-800">
                <th className="px-4 py-3 text-left font-medium">Property</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {config.controls.map((c) => (
                <tr key={c.name}>
                  <td className="px-4 py-3">
                    <code className="rounded-md border border-neutral-800 px-2 py-0.5 text-[13px] text-neutral-200">
                      {c.name}
                    </code>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-neutral-400">{c.type}</td>
                  <td className="px-4 py-3 font-mono text-xs text-neutral-400">
                    {c.defaultValue === undefined ? "—" : JSON.stringify(c.defaultValue)}
                  </td>
                  <td className="px-4 py-3 text-neutral-400">{c.description ?? c.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function CodeBlock({
  html,
  onCopy,
  copied,
  maxHeight,
}: {
  html: string;
  onCopy: () => void;
  copied: boolean;
  maxHeight?: string;
}) {
  return (
    <div className="relative">
      <button
        onClick={onCopy}
        className="absolute right-3 top-3 z-10 rounded-md border border-neutral-800 bg-neutral-950/80 px-3 py-1 text-xs text-neutral-400 hover:text-white transition-colors"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <div
        className="shiki-wrap overflow-auto text-sm"
        style={maxHeight ? { maxHeight } : undefined}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

function NumberedCode({ code }: { code: string }) {
  const lines = code.split("\n");
  return (
    <pre className="overflow-x-auto py-3 text-sm font-mono leading-relaxed">
      <code>
        {lines.map((line, i) => (
          <span key={i} className="grid grid-cols-[3rem_1fr]">
            <span className="text-right text-neutral-600 pr-4 select-none">{i + 1}</span>
            <span className="text-neutral-200">
              <TintedLine text={line} />
            </span>
          </span>
        ))}
      </code>
    </pre>
  );
}

function TintedLine({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const regex =
    /("[^"]*"|'[^']*')|(\{[^{}]*\})|(\b(?:const|let|var|function|return|import|from|export|default)\b)|(<\/?[A-Z][A-Za-z0-9]*)|(\b[a-z][A-Za-z0-9]*\b)(?==)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, str, expr, kw, tag, attr] = m;
    if (str) parts.push(<span key={key++} className="text-neutral-400">{str}</span>);
    else if (expr) parts.push(<span key={key++} className="text-neutral-500">{expr}</span>);
    else if (kw) parts.push(<span key={key++} className="text-white font-semibold">{kw}</span>);
    else if (tag) parts.push(<span key={key++} className="text-white">{tag}</span>);
    else if (attr) parts.push(<span key={key++} className="text-neutral-300">{attr}</span>);
    last = regex.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts.length ? parts : text || " "}</>;
}
