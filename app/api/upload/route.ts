import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const filename = `${randomUUID()}-${file.name}`;

    const { error } = await supabaseAdmin.storage
      .from("products")
      .upload(filename, buffer, {
        contentType: file.type,
      });

    if (error) {
      return NextResponse.json(error, { status: 500 });
    }

    const { data } = supabaseAdmin.storage
      .from("products")
      .getPublicUrl(filename);

    return NextResponse.json({
      url: data.publicUrl,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}