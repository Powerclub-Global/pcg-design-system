"use client";

import { useState, useMemo } from "react";
import type { ComponentConfig } from "./types";
import { ComponentForm } from "./component-form";
import { generateJSX } from "./jsx-generator";

interface PlaygroundProps {
  config: ComponentConfig;
  component: React.ComponentType<Record<string, unknown>>;
}

export function Playground({ config, component: Component }: PlaygroundProps) {
  // Build initial values from defaults
  const defaults = useMemo(() => {
    const d: Record<string, unknown> = {};
    for (const c of config.controls) {
      d[c.name] = c.defaultValue;
    }
    return d;
  }, [config.controls]);

  const [values, setValues] = useState<Record<string, unknown>>(defaults);
  const [children, setChildren] = useState(config.childrenControl?.defaultValue ?? "");
  const [copied, setCopied] = useState(false);

  // Merge dynamic values with static props
  const componentProps = useMemo(() => {
    const filtered: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(values)) {
      if (v !== undefined && v !== null && v !== "") {
        filtered[k] = v;
      }
    }
    return { ...config.staticProps, ...filtered };
  }, [values, config.staticProps]);

  const code = generateJSX(config.name, componentProps, defaults, children || undefined);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    setValues(defaults);
    setChildren(config.childrenControl?.defaultValue ?? "");
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <div className="border-b border-neutral-800 px-6 py-4">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          <div>
            <div className="flex items-center gap-3">
              <a href="/" className="text-neutral-500 hover:text-white transition-colors text-sm">
                Playground
              </a>
              <span className="text-neutral-700">/</span>
              <h1 className="text-lg font-semibold">{config.name}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700">
                {config.category}
              </span>
            </div>
            <p className="text-sm text-neutral-500 mt-1">{config.description}</p>
          </div>
          <button
            onClick={handleReset}
            className="text-xs text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500 px-3 py-1.5 rounded-md transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row">
        {/* Controls Panel */}
        <aside className="w-full lg:w-80 xl:w-96 border-r border-neutral-800 p-6 lg:h-[calc(100vh-73px)] lg:overflow-y-auto shrink-0">
          <ComponentForm
            controls={config.controls}
            values={values}
            onChange={setValues}
            childrenControl={config.childrenControl}
            childrenValue={children}
            onChildrenChange={setChildren}
          />
        </aside>

        {/* Preview + Code */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Live Preview */}
          <div className="flex-1 p-6 lg:p-10">
            <div className="mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Live Preview</span>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-8 min-h-[200px] flex items-center justify-center overflow-hidden">
              <div className="w-full">
                {children ? (
                  <Component {...componentProps}>{children}</Component>
                ) : (
                  <Component {...componentProps} />
                )}
              </div>
            </div>
          </div>

          {/* Code Output */}
          <div className="border-t border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Generated JSX</span>
              <button
                onClick={handleCopy}
                className="text-xs text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500 px-3 py-1 rounded-md transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-sm font-mono text-indigo-300 overflow-x-auto">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
