"use client";

import { useState } from "react";
import CategoryModal from "./CategoryModal";

export default function AddCategoryButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#17352D] px-4 text-[14px] font-medium leading-5 tracking-[-0.15px] text-white transition hover:opacity-90"
      >
        <span className="text-[16px] leading-none">+</span>
        Add Category
      </button>

      <CategoryModal
        open={open}
        onClose={() => setOpen(false)}
        mode="create"
      />
    </>
  );
}