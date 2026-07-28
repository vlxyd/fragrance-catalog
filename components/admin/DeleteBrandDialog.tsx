"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteBrandDialogProps {
  id: string;
  name: string;
}

export default function DeleteBrandDialog({
  id,
  name,
}: DeleteBrandDialogProps) {
  const router = useRouter();

  async function deleteBrand() {
    const { error } = await supabase
      .from("Brand")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Brand deleted successfully.");

    router.refresh();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 hover:text-red-300">
  <Trash2 size={18} />
</button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Brand</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete{" "}
            <strong>{name}</strong>?
            <br />
            <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3">
          <button
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={deleteBrand}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete Brand
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}