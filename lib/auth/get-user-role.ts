import { createClient } from "@/lib/supabase/server";

export type AppRole = "admin" | "editor" | "viewer";

export async function getUserRole(userId: string): Promise<AppRole> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error || !data?.role) return "viewer";

  return data.role as AppRole;
}
