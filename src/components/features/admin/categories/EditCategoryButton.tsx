"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import CategoryModal from "./CategoryModal";

interface Props {
  categoryId: string;
  name: string;
}

export default function EditCategoryButton({ categoryId, name }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-[#8A8A8A] transition hover:text-[#17352D]"
      >
        <Pencil className="h-4 w-4" strokeWidth={1.8} />
      </button>

      <CategoryModal
        open={open}
        onClose={() => setOpen(false)}
        mode="edit"
        categoryId={categoryId}
        initialName={name}
      />
    </>
  );
}