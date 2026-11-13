import ToolDetails from "@/components/tools/ToolDetails";
import { Suspense } from "react";

interface ToolPageProps {
  params: Promise<{ id: string }>;
}

export default function ToolPage({ params }: ToolPageProps) {
  return (
    <main className="mx-auto max-w-[1200px] pt-8 md:pt-12">
      <Suspense fallback={<p className="text-ink/60">Завантаження…</p>}>
        <ToolDetails params={params} />
      </Suspense>
    </main>
  );
}
