import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { getIsAdmin } from "@/lib/admin";

const App = dynamic(
  () => import("@/app/admin/_components/app").then((mod) => mod.App),
  { ssr: !true }
);

export default async function AdminPage() {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return <App />;
}
