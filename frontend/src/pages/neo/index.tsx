// import { useQuery } from "@tanstack/react-query";
// import { fetchNeoFeed } from "@/services/nasa";
import { Loader } from "@/common/components/loader";
import { Error } from "@/common/components/error";
import MainLayout from "@/common/components/layouts/MainLayout";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { Input } from "@/common/components/ui/input";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchNeoFeed } from "@/services/nasa";

export default function NEOFeature() {
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["neo", startDate, endDate],
    queryFn: () => fetchNeoFeed(startDate, endDate),
    enabled: !!startDate && !!endDate,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  // Transform API data to chart format: [{ date, count }]
  const safeData = data || { near_earth_objects: {} };
  const chartData = safeData.near_earth_objects
    ? Object.entries(safeData.near_earth_objects).map(([date, neos]) => ({
        date,
        count: Array.isArray(neos) ? neos.length : 0,
      }))
    : [];

  // Calculate summary stats for live card
  const totalNEOs = chartData.reduce((sum, d) => sum + d.count, 0);
  const days = chartData.length;
  const avgPerDay = days ? (totalNEOs / days).toFixed(1) : 0;

  return (
    <MainLayout allowScroll={true}>
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-black via-blue-950 to-blue-900 pt-28 pb-16 px-4">
        {/* Animated/Overlay Title */}
        <div className="absolute top-10 left-0 w-full flex justify-center pointer-events-none select-none z-0">
          <span className="text-[16vw] md:text-[10vw] font-black text-white/5 tracking-tighter">
            NEO
          </span>
        </div>

        {/* Live Data Card */}
        <div className="w-full max-w-md sm:max-w-lg z-10 mb-8">
          <div className="p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg">
            <div className="flex gap-2 mb-4 items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                LIVE NEO DATA
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-white/80 font-mono text-xs">
                <span>Total NEOs</span>
                <span className="font-bold text-blue-400 text-base">
                  {totalNEOs}
                </span>
              </div>
              <div className="flex justify-between text-white/80 font-mono text-xs">
                <span>Days</span>
                <span>{days}</span>
              </div>
              <div className="flex justify-between text-white/80 font-mono text-xs">
                <span>Avg/Day</span>
                <span>{avgPerDay}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Date Range Card */}
        <Card className="max-w-xl w-full mx-auto mb-6 z-10 bg-white/5 border border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white/90">
              Search by Date Range
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-end">
            <div className="flex-1">
              <label className="block text-xs mb-1 text-white/60">
                Start Date
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs mb-1 text-white/60">
                End Date
              </label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full"
              />
            </div>
            <button
              className="w-full sm:w-auto ml-0 sm:ml-2 px-4 py-2 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition disabled:opacity-50"
              onClick={() => refetch()}
              disabled={!startDate || !endDate}
            >
              Search
            </button>
          </CardContent>
        </Card>

        {/* Loader/Error/Chart */}
        <div className="w-full max-w-2xl mx-auto z-10">
          {isLoading && <Loader />}
          {error && (
            <Error
              message={
                error &&
                typeof error === "object" &&
                "response" in error &&
                error.response && typeof error.response === "object" &&
                "data" in error.response &&
                error.response.data && typeof error.response.data === "object" &&
                "message" in error.response.data
                  ? (error.response.data as { message?: string }).message
                  : typeof error === "object" && "message" in error
                    ? (error as Error).message
                    : String(error)
              }
            />
          )}
          {chartData.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-4 shadow-lg">
              <h2 className="text-lg font-semibold mb-2 text-white/90">
                NEOs per Day
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={chartData}
                  margin={{ top: 16, right: 16, left: 0, bottom: 0 }}
                >
                  <XAxis
                    dataKey="date"
                    stroke="#b3c6e0"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    allowDecimals={false}
                    stroke="#b3c6e0"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#222",
                      border: "none",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#1976d2"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
