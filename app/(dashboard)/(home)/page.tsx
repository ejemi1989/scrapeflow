import { GetCreditUsageInPeriod } from "@/actions/analytics/getCreditUsageInperiod";
import { GetPeriods } from "@/actions/analytics/getPeriods";
import { GetStatsCardsValues } from "@/actions/analytics/getStatsCardsValues";
import { GetWorkflowExecutionStats } from "@/actions/analytics/getWorkflowExecutionStats";
import { StatsCards, StatsCardSkeleton } from "@/components/home/StatsCards";
import { PeriodSelector } from "@/components/home/PeriodSelector";
import { ExecutionStatusChart } from "@/components/home/ExecutionStatusChart";
import { CreditUsageChart } from "@/components/billing/CreditUsageChart";
import { Skeleton } from "@/components/ui/skeleton";
import { Period } from "@/types/analytics";
import { Suspense } from "react";

export default function Page() {
  const currentDate = new Date();
  const period: Period = {
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  };

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Home</h1>
        <Suspense fallback={<Skeleton className="w-[180px] h-[40px]" />}>
          <PeriodSelectorWrapper selectedPeriod={period} />
        </Suspense>
      </div>
      <div className="h-full py-6 flex flex-col gap-4">
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsCardsWrapper selectedPeriod={period} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
          <ExecutionStatsWrapper selectedPeriod={period} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
          <CreditUsageWrapper selectedPeriod={period} />
        </Suspense>
      </div>
    </div>
  );
}

async function PeriodSelectorWrapper({ selectedPeriod }: { selectedPeriod: Period }) {
  const periods = await GetPeriods();
  return <PeriodSelector selectedPeriod={selectedPeriod} periods={periods} />;
}

async function StatsCardsWrapper({ selectedPeriod }: { selectedPeriod: Period }) {
  const data = await GetStatsCardsValues(selectedPeriod);
  return <StatsCards data={data} />;
}

async function ExecutionStatsWrapper({ selectedPeriod }: { selectedPeriod: Period }) {
  const data = await GetWorkflowExecutionStats(selectedPeriod);
  return <ExecutionStatusChart data={data} />;
}

async function CreditUsageWrapper({ selectedPeriod }: { selectedPeriod: Period }) {
  const data = await GetCreditUsageInPeriod(selectedPeriod);
  return (
    <CreditUsageChart
      data={data}
      title="Daily credits spent"
      description="Daily credit consumed in selected period"
    />
  );
}
