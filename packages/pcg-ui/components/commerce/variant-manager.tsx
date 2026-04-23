"use client";

import { useState } from "react";

export interface Variant {
  id?: string;
  sku: string;
  price: number;
  attributes: Record<string, string>;
  inventory?: number;
}

export interface VariantAttribute {
  name: string;
  key: string;
  placeholder?: string;
}

export interface VariantManagerProps {
  variants: Variant[];
  onChange: (variants: Variant[]) => void;
  onSave?: (variant: Variant, index: number) => Promise<void>;
  attributes?: VariantAttribute[];
  priceInCents?: boolean;
  addLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

const defaultAttributes: VariantAttribute[] = [
  { name: "Size", key: "size", placeholder: "S, M, L, XL" },
  { name: "Color", key: "color", placeholder: "Red, Blue, Black" },
];

export function VariantManager({
  variants,
  onChange,
  onSave,
  attributes = defaultAttributes,
  priceInCents = true,
  addLabel = "Add Variant",
  emptyTitle = "No variants created",
  emptyDescription = "Add product variants with different sizes, colors, or configurations",
  className = "",
}: VariantManagerProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  function addVariant() {
    const attrs: Record<string, string> = {};
    attributes.forEach((a) => (attrs[a.key] = ""));

    const newVariant: Variant = {
      sku: `SKU-${Date.now()}`,
      price: 0,
      attributes: attrs,
    };
    onChange([...variants, newVariant]);
    setEditingIndex(variants.length);
  }

  function updateVariant(index: number, field: string, value: string | number) {
    const updated = variants.map((v, i) => {
      if (i !== index) return v;
      if (field === "sku" || field === "price" || field === "inventory") {
        return { ...v, [field]: value };
      }
      return { ...v, attributes: { ...v.attributes, [field]: value as string } };
    });
    onChange(updated);
  }

  function removeVariant(index: number) {
    if (typeof window !== "undefined" && !window.confirm("Remove this variant?")) return;
    onChange(variants.filter((_, i) => i !== index));
    setEditingIndex(null);
  }

  async function saveVariant(index: number) {
    if (onSave) {
      try {
        await onSave(variants[index], index);
      } catch {
        return;
      }
    }
    setEditingIndex(null);
  }

  const displayPrice = (price: number) =>
    priceInCents ? `$${(price / 100).toFixed(2)}` : `$${price.toFixed(2)}`;

  const parsePrice = (input: string) => {
    const num = parseFloat(input) || 0;
    return priceInCents ? Math.round(num * 100) : num;
  };

  const inputPrice = (price: number) =>
    priceInCents ? (price / 100).toFixed(2) : price.toFixed(2);

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#ffffff",
  };

  return (
    <div
      className={`space-y-6 ${className}`}
      style={{ color: "rgba(255,255,255,0.88)" }}
    >
      <div className="flex items-center justify-between">
        <h3
          className="font-semibold uppercase tracking-wide text-white"
          style={{ fontSize: "1.5rem", lineHeight: 0.95 }}
        >
          Product Variants
        </h3>
        <button
          type="button"
          onClick={addVariant}
          className="rounded-sm px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all hover:brightness-110"
          style={{ background: "#ffffff", color: "#000000" }}
        >
          {addLabel}
        </button>
      </div>

      {variants.length === 0 ? (
        <div
          className="mx-auto max-w-lg rounded-xl px-6 py-6 text-center"
          style={{
            border: "2px dashed rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <div className="mb-2 font-semibold text-white">{emptyTitle}</div>
          <div className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            {emptyDescription}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {variants.map((variant, index) => (
            <div
              key={variant.id || index}
              className="rounded-xl p-6 backdrop-blur-xl"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {editingIndex === index ? (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-white">
                        SKU <span style={{ color: "#ffffff" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={variant.sku}
                        onChange={(e) => updateVariant(index, "sku", e.target.value)}
                        className="w-full rounded-sm px-3 py-2 text-sm outline-none focus:border-white"
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-semibold text-white">
                        Price ($) <span style={{ color: "#ffffff" }}>*</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={inputPrice(variant.price)}
                        onChange={(e) => updateVariant(index, "price", parsePrice(e.target.value))}
                        className="w-full rounded-sm px-3 py-2 text-sm outline-none focus:border-white"
                        style={inputStyle}
                      />
                    </div>

                    {attributes.map((attr) => (
                      <div key={attr.key}>
                        <label className="mb-1 block text-sm font-semibold text-white">
                          {attr.name}
                        </label>
                        <input
                          type="text"
                          value={variant.attributes[attr.key] || ""}
                          onChange={(e) => updateVariant(index, attr.key, e.target.value)}
                          placeholder={attr.placeholder}
                          className="w-full rounded-sm px-3 py-2 text-sm outline-none focus:border-white"
                          style={inputStyle}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingIndex(null)}
                      className="rounded-sm px-4 py-2 text-sm transition-colors"
                      style={{
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => saveVariant(index)}
                      className="rounded-sm px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all hover:brightness-110"
                      style={{ background: "#ffffff", color: "#000000" }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="grid flex-1 gap-4 md:grid-cols-4">
                    <div>
                      <div className="font-semibold text-white">{variant.sku}</div>
                      <div className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                        SKU
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold" style={{ color: "#ffffff" }}>
                        {displayPrice(variant.price)}
                      </div>
                      <div className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Price
                      </div>
                    </div>
                    {attributes.slice(0, 2).map((attr) => (
                      <div key={attr.key}>
                        <div className="font-semibold text-white">{variant.attributes[attr.key] || "N/A"}</div>
                        <div className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                          {attr.name}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingIndex(index)}
                      className="text-sm font-medium hover:underline"
                      style={{ color: "#ffffff" }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="text-sm font-medium hover:underline"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VariantManager;
