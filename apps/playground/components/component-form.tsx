"use client";

import type { ControlField } from "./types";

interface ComponentFormProps {
  controls: ControlField[];
  values: Record<string, unknown>;
  onChange: (values: Record<string, unknown>) => void;
  childrenControl?: { label: string };
  childrenValue?: string;
  onChildrenChange?: (value: string) => void;
}

export function ComponentForm({
  controls,
  values,
  onChange,
  childrenControl,
  childrenValue,
  onChildrenChange,
}: ComponentFormProps) {
  function update(name: string, value: unknown) {
    onChange({ ...values, [name]: value });
  }

  // Group controls
  const groups = new Map<string, ControlField[]>();
  for (const control of controls) {
    const group = control.group ?? "Props";
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push(control);
  }

  return (
    <div className="space-y-6">
      {Array.from(groups.entries()).map(([groupName, fields]) => (
        <fieldset key={groupName}>
          <legend className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
            {groupName}
          </legend>
          <div className="space-y-3">
            {fields.map((field) => (
              <FieldRenderer
                key={field.name}
                field={field}
                value={values[field.name]}
                onChange={(v) => update(field.name, v)}
              />
            ))}
          </div>
        </fieldset>
      ))}

      {childrenControl && onChildrenChange && (
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
            Children
          </legend>
          <label className="block">
            <span className="text-sm text-neutral-300 mb-1 block">{childrenControl.label}</span>
            <input
              type="text"
              value={childrenValue ?? ""}
              onChange={(e) => onChildrenChange(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </label>
        </fieldset>
      )}
    </div>
  );
}

function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: ControlField;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const inputClass =
    "w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none";

  switch (field.type) {
    case "text":
      return (
        <label className="block">
          <span className="text-sm text-neutral-300 mb-1 block">{field.label}</span>
          <input
            type="text"
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          />
          {field.description && (
            <span className="text-xs text-neutral-500 mt-0.5 block">{field.description}</span>
          )}
        </label>
      );

    case "number":
      return (
        <label className="block">
          <span className="text-sm text-neutral-300 mb-1 block">{field.label}</span>
          <input
            type="number"
            value={(value as number) ?? 0}
            onChange={(e) => onChange(Number(e.target.value))}
            className={inputClass}
          />
        </label>
      );

    case "select":
      return (
        <label className="block">
          <span className="text-sm text-neutral-300 mb-1 block">{field.label}</span>
          <select
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          >
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      );

    case "boolean":
      return (
        <label className="flex items-center justify-between gap-3 cursor-pointer">
          <span className="text-sm text-neutral-300">{field.label}</span>
          <button
            type="button"
            role="switch"
            aria-checked={Boolean(value)}
            onClick={() => onChange(!value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              value ? "bg-indigo-500" : "bg-neutral-700"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                value ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </label>
      );

    case "color":
      return (
        <label className="block">
          <span className="text-sm text-neutral-300 mb-1 block">{field.label}</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={(value as string) ?? "#6366f1"}
              onChange={(e) => onChange(e.target.value)}
              className="w-8 h-8 rounded border border-neutral-700 cursor-pointer"
            />
            <input
              type="text"
              value={(value as string) ?? ""}
              onChange={(e) => onChange(e.target.value)}
              className={inputClass}
            />
          </div>
        </label>
      );

    case "json":
      return (
        <label className="block">
          <span className="text-sm text-neutral-300 mb-1 block">{field.label}</span>
          <textarea
            value={typeof value === "string" ? value : JSON.stringify(value, null, 2)}
            onChange={(e) => {
              try {
                onChange(JSON.parse(e.target.value));
              } catch {
                onChange(e.target.value);
              }
            }}
            rows={4}
            className={`${inputClass} font-mono text-xs`}
          />
          {field.description && (
            <span className="text-xs text-neutral-500 mt-0.5 block">{field.description}</span>
          )}
        </label>
      );

    default:
      return null;
  }
}
