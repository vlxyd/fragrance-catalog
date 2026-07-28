"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EditBrandDialogProps {
  brand: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    featured: boolean;
  };
}

export default function EditBrandDialog({
  brand,
}: EditBrandDialogProps) {
  const [name, setName] = useState(brand.name);
  const [description, setDescription] = useState(
    brand.description ?? ""
  );
  const [featured, setFeatured] = useState(
    brand.featured
  );

  const router = useRouter();

  async function updateBrand() {
    if (!name.trim()) {
      alert("Brand name is required.");
      return;
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const { error } = await supabase
      .from("Brand")
      .update({
        name,
        slug,
        description,
        featured,
      })
      .eq("id", brand.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Brand updated!");

    router.refresh();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-lg p-2 text-amber-400 transition hover:bg-amber-500/10 hover:text-amber-300">
  <Pencil size={18} />
</button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Brand</DialogTitle>

          <DialogDescription>
            Update this fragrance brand.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Brand Name"
            className="w-full rounded-lg border px-4 py-3"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Description"
            className="w-full rounded-lg border px-4 py-3"
          />

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) =>
                setFeatured(e.target.checked)
              }
            />

            Featured Brand
          </label>

          <button
            onClick={updateBrand}
            className="w-full rounded-xl bg-amber-500 py-3 font-semibold text-white hover:bg-amber-600"
          >
            Save Changes
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}