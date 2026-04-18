export type ControlField = {
  name: string;
  type: "text" | "select" | "boolean" | "number" | "color" | "json";
  label: string;
  options?: string[];
  defaultValue?: unknown;
  group?: string;
  description?: string;
};

export type ComponentConfig = {
  name: string;
  slug: string;
  description: string;
  category: "ui" | "layout" | "block" | "commerce";
  controls: ControlField[];
  /** Static props that are always passed but not editable */
  staticProps?: Record<string, unknown>;
  /** Whether to render children as a string prop */
  childrenControl?: {
    label: string;
    defaultValue: string;
  };
};
