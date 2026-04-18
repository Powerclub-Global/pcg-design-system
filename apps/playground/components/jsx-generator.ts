/**
 * Generates a readable JSX code string from component name, props, and children.
 * Only includes props that differ from defaults or are explicitly set.
 */
export function generateJSX(
  componentName: string,
  props: Record<string, unknown>,
  defaults: Record<string, unknown>,
  children?: string
): string {
  const propEntries: string[] = [];

  for (const [key, value] of Object.entries(props)) {
    // Skip undefined, null, or same-as-default
    if (value === undefined || value === null) continue;
    if (key in defaults && defaults[key] === value) continue;
    // Skip empty strings
    if (value === "") continue;

    propEntries.push(formatProp(key, value));
  }

  const propsStr = propEntries.length > 0 ? " " + propEntries.join(" ") : "";

  if (children) {
    // Multi-line if many props
    if (propEntries.length > 2) {
      const indented = propEntries.map((p) => `  ${p}`).join("\n");
      return `<${componentName}\n${indented}\n>\n  ${children}\n</${componentName}>`;
    }
    return `<${componentName}${propsStr}>\n  ${children}\n</${componentName}>`;
  }

  if (propEntries.length > 3) {
    const indented = propEntries.map((p) => `  ${p}`).join("\n");
    return `<${componentName}\n${indented}\n/>`;
  }

  return `<${componentName}${propsStr} />`;
}

function formatProp(key: string, value: unknown): string {
  if (typeof value === "string") return `${key}="${value}"`;
  if (typeof value === "boolean") return value ? key : `${key}={false}`;
  if (typeof value === "number") return `${key}={${value}}`;
  if (Array.isArray(value) || typeof value === "object") {
    return `${key}={${JSON.stringify(value)}}`;
  }
  return `${key}={${String(value)}}`;
}
