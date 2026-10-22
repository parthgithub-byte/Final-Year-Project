import { useQuery } from "@tanstack/react-query";
import { getJson } from "../api/client.js";

export default function Home() {
  const { data, error, isLoading } = useQuery({ queryKey: ["health"], queryFn: () => getJson("/health") });
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-semibold">Fraud Investigation</h1>
      <p className="mt-2 text-sm text-gray-600">
        API: {isLoading ? "checking…" : error ? `unreachable (${error.message})` : data.status}
      </p>
    </main>
  );
}
