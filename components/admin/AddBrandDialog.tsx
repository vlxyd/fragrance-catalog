"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddBrandDialog() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  const [featured, setFeatured] = useState(false);

  const router = useRouter();

async function saveBrand() {
  if (!name.trim()) {
    alert("Please enter a brand name.");
    return;
  }

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  const { error } = await supabase
  .from("Brand")
  .insert({
    name,
    slug,
    description,
    featured,
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Brand added successfully!");

  router.refresh();

  setName("");
setDescription("");
setFeatured(false);
}

return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white hover:bg-amber-600">
          + Add Brand
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Brand</DialogTitle>

          <DialogDescription>
            Create a new fragrance brand.
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
            placeholder="Description"
            rows={4}
            className="w-full rounded-lg border px-4 py-3"
          />

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />

            Featured Brand
          </label>

         <button
  onClick={saveBrand}
  className="w-full rounded-xl bg-amber-500 py-3 font-semibold text-white hover:bg-amber-600"
>
  Save Brand
</button>

        </div>
      </DialogContent>
    </Dialog>
  );
}