import { supabase } from "@/lib/supabase";
import AddBrandDialog from "@/components/admin/AddBrandDialog";
import EditBrandDialog from "@/components/admin/EditBrandDialog";
import DeleteBrandDialog from "@/components/admin/DeleteBrandDialog";

export default async function BrandsPage() {
  const { data: brands, error } = await supabase
    .from("Brand")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Brands</h1>

          <p className="text-stone-400">
            Manage your fragrance brands.
          </p>
        </div>

        <AddBrandDialog />
      </div>
<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
  {brands?.map((brand) => (
    <div
      key={brand.id}
      className="group rounded-3xl border border-[#2d2418] bg-[#11100F] p-6 transition-all duration-300 hover:border-[#C6A15B] hover:shadow-[0_0_35px_rgba(198,161,91,0.12)]"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#F8F4EE]">
            {brand.name}
          </h2>

          <p className="mt-1 text-sm text-[#8D867D]">
            {brand.slug}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <EditBrandDialog brand={brand} />

          <DeleteBrandDialog
            id={brand.id}
            name={brand.name}
          />
        </div>
      </div>

      <div className="my-5 h-px bg-[#27211B]" />

      <p className="line-clamp-3 text-sm leading-7 text-[#AFA89D]">
        {brand.description || "No description provided."}
      </p>

      <div className="mt-6 flex items-center justify-between">
        {brand.featured ? (
          <span className="rounded-full border border-[#C6A15B]/40 bg-[#C6A15B]/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#DDBB7A]">
            Featured
          </span>
        ) : (
          <span className="rounded-full border border-stone-700 px-3 py-1 text-xs uppercase tracking-[0.2em] text-stone-500">
            Standard
          </span>
        )}

        <span className="text-xs uppercase tracking-[0.2em] text-stone-600">
          Brand
        </span>
      </div>
    </div>
  ))}

  {brands?.length === 0 && (
    <div className="col-span-full rounded-3xl border border-dashed border-stone-700 p-12 text-center text-stone-500">
      No brands found.
    </div>
  )}
</div>
        </div>
  );
}