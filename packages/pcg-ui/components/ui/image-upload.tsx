"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "../../lib/cn";

export interface ImageUploadProps {
  /** Currently uploaded image URLs */
  value?: string[];
  /** Callback when images change */
  onChange: (urls: string[]) => void;
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Upload endpoint URL */
  uploadUrl?: string;
  /** Accepted MIME types */
  accept?: Record<string, string[]>;
  /** Custom upload handler — if provided, uploadUrl is ignored */
  onUpload?: (files: File[]) => Promise<string[]>;
  /** Label shown in the upload area */
  label?: string;
  className?: string;
}

export function ImageUpload({
  value = [],
  onChange,
  maxFiles = 10,
  uploadUrl = "/api/upload",
  accept = { "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"] },
  onUpload,
  label = "Upload Images",
  className,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      try {
        let newUrls: string[];

        if (onUpload) {
          newUrls = await onUpload(acceptedFiles);
        } else {
          const uploadPromises = acceptedFiles.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            const response = await fetch(uploadUrl, {
              method: "POST",
              body: formData,
            });
            if (!response.ok) throw new Error("Upload failed");
            const data = await response.json();
            return data.url as string;
          });
          newUrls = await Promise.all(uploadPromises);
        }

        onChange([...value, ...newUrls]);
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setUploading(false);
      }
    },
    [value, onChange, onUpload, uploadUrl]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: maxFiles - value.length,
    disabled: uploading || value.length >= maxFiles,
  });

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("space-y-4", className)} style={{ color: "rgba(255,255,255,0.88)" }}>
      {value.length < maxFiles && (
        <div
          {...getRootProps()}
          className={cn(
            "cursor-pointer rounded-xl p-12 text-center transition-all",
            uploading && "cursor-not-allowed opacity-50"
          )}
          style={{
            border: isDragActive ? "2px dashed #ffffff" : "2px dashed rgba(255,255,255,0.1)",
            background: isDragActive ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.04)",
          }}
        >
          <input {...getInputProps()} />
          <div className="space-y-2">
            <div className="font-semibold uppercase tracking-wider" style={{ color: "#ffffff" }}>
              {uploading ? "Uploading..." : label}
            </div>
            <div className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Drag & drop images here, or click to select files
            </div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Max {maxFiles} images
            </div>
          </div>
        </div>
      )}

      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {value.map((url, index) => (
            <div key={index} className="group relative">
              <div
                className="aspect-square overflow-hidden rounded-sm"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <img
                  src={url}
                  alt={`Upload ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-2 top-2 rounded-full p-1 opacity-0 transition-opacity hover:brightness-110 group-hover:opacity-100"
                style={{ background: "#ffffff", color: "#000000" }}
                title="Remove image"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {index === 0 && (
                <div
                  className="absolute left-2 top-2 rounded-sm px-2 py-0.5 text-xs font-bold uppercase tracking-wider"
                  style={{ background: "#ffffff", color: "#000000" }}
                >
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {value.length > 0 && (
        <div className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          {value.length} of {maxFiles} images uploaded
        </div>
      )}
    </div>
  );
}
