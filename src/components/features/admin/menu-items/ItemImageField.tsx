"use client";

import { Upload, X } from "lucide-react";
import { useRef } from "react";

interface Props {
  mode: "create" | "edit";
  selectedFile: File | null;
  existingImageName?: string;
  showUploadArea: boolean;
  error?: string;
  onFileSelect: (file: File | null) => void;
  onRemoveExistingImage: () => void;
  onRemoveSelectedFile: () => void;
}

export default function MenuItemImageField({
  mode,
  selectedFile,
  existingImageName,
  showUploadArea,
  error,
  onFileSelect,
  onRemoveExistingImage,
  onRemoveSelectedFile,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const displayedFileName = selectedFile?.name ?? existingImageName ?? "";

  return (
    <div className="space-y-2">
      <label className="block text-[15px] font-medium leading-6 text-[#2B2B2B] sm:text-[16px]">
        Image
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg,image/png,image/jpeg"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0] ?? null;
          onFileSelect(file);
        }}
      />

      {showUploadArea ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0] ?? null;
            onFileSelect(file);
          }}
          className="flex min-h-[92px] w-full flex-col items-center justify-center rounded-[8px] border border-[#E8E2D9] bg-white px-4 py-5 text-center transition hover:bg-[#FCFBF8] sm:min-h-[104px]"
        >
          <Upload className="mb-2 h-8 w-8 text-[#7E7E7E]" strokeWidth={1.8} />

          <p className="text-[14px] font-medium leading-6 text-[#2B2B2B] sm:text-[16px]">
            Drag or click <span className="font-semibold">here</span> to upload
          </p>

          <p className="mt-1 text-[11px] font-medium leading-4 text-[#8A8A8A] sm:text-[12px]">
            Size must be maximum 2mb. Supported formats : PNG & JPEG
          </p>
        </button>
      ) : null}

      {displayedFileName ? (
        <div className="flex min-h-[42px] items-center justify-between rounded-[8px] border border-[#E8E2D9] bg-white px-4 py-2">
          <p className="truncate pr-3 text-[14px] font-medium leading-5 text-[#2C2C2C]">
            1. {displayedFileName}
          </p>

          <button
            type="button"
            onClick={() => {
              if (selectedFile) {
                onRemoveSelectedFile();
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
              }

              if (mode === "edit" && existingImageName) {
                onRemoveExistingImage();
              }
            }}
            className="shrink-0 text-[#9B9B9B] transition hover:text-[#17352D]"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      ) : null}

      {error ? (
        <p className="text-[12px] font-medium leading-4 text-[#E53935]">
          {error}
        </p>
      ) : null}
    </div>
  );
}