import { notFound } from "next/navigation";
import { componentRegistry, getConfig } from "@/configs/registry";
import { PlaygroundClient } from "./client";

export function generateStaticParams() {
  return componentRegistry.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // Use sync access for metadata in static generation
  return params.then(({ slug }) => {
    const config = getConfig(slug);
    return {
      title: config ? `${config.name} — PCG Playground` : "Not Found",
    };
  });
}

export default async function PlaygroundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = getConfig(slug);

  if (!config) notFound();

  return <PlaygroundClient config={config} />;
}
