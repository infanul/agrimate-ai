import DashboardLayout from "@/components/DashboardLayout";

interface DashboardFeatureProps {
  title: string;
  description: string;
  icon: string;
}

export default function DashboardFeature({
  title,
  description,
  icon,
}: DashboardFeatureProps) {
  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        <div className="max-w-5xl">
          <div className="rounded-2xl border border-emerald-900/40 bg-[#0d1815] p-6 md:p-8">
            <div className="text-5xl">{icon}</div>

            <h1 className="mt-5 text-3xl font-bold text-white">
              {title}
            </h1>

            <p className="mt-3 text-slate-400 max-w-2xl">
              {description}
            </p>

            <div className="mt-8 rounded-xl border border-emerald-800/30 bg-emerald-950/20 p-5">
              <p className="text-emerald-400 font-semibold">
                AgriMate AI Module
              </p>

              <p className="mt-2 text-sm text-slate-400">
                This module is connected to the AgriMate AI dashboard.
                Advanced functionality can be added here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}