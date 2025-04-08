import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, BarChart2, TrendingUp } from 'lucide-react';
import { RiskData } from '@/lib/types/risk';

interface RiskProbabilityProps {
  data: RiskData;
}

const getRiskLevel = (impact: number, likelihood: number) => {
  const score = impact * likelihood;
  if (score >= 0.7) return { level: 'High', color: 'bg-red-100 text-red-700 border-red-200' };
  if (score >= 0.4) return { level: 'Medium', color: 'bg-amber-100 text-amber-700 border-amber-200' };
  return { level: 'Low', color: 'bg-green-100 text-green-700 border-green-200' };
};

export function RiskProbability({ data }: RiskProbabilityProps) {
  // Calculate overall risk metrics
  const totalRisks = data.length;
  const avgImpact = data.reduce((sum, item) => sum + item.impact, 0) / totalRisks;
  const avgLikelihood = data.reduce((sum, item) => sum + item.likelihood, 0) / totalRisks;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Risk Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Analysis Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center p-4 rounded-lg bg-blue-100 text-blue-700">
              <AlertTriangle className="w-8 h-8 mb-2" />
              <span className="font-semibold">Total Risks</span>
              <span className="text-2xl font-bold">{totalRisks}</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-purple-100 text-purple-700">
              <BarChart2 className="w-8 h-8 mb-2" />
              <span className="font-semibold">Avg. Impact</span>
              <span className="text-2xl font-bold">{(avgImpact * 100).toFixed(0)}%</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-cyan-100 text-cyan-700">
              <TrendingUp className="w-8 h-8 mb-2" />
              <span className="font-semibold">Avg. Likelihood</span>
              <span className="text-2xl font-bold">{(avgLikelihood * 100).toFixed(0)}%</span>
            </div>
          </div>

          {/* Risk Matrix */}
          <div className="space-y-4">
            <h3 className="font-semibold mb-2">Risk Matrix</h3>
            {data.map((item, index) => {
              const { level, color } = getRiskLevel(item.impact, item.likelihood);
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${color}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{item.shortTitle}</h4>
                    <span className="text-sm font-medium">{level} Risk</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <span className="text-sm opacity-75">Impact:</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${item.impact * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm opacity-75">Likelihood:</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-purple-600 h-2.5 rounded-full"
                          style={{ width: `${item.likelihood * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm mb-2">{item.summary}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline hover:no-underline"
                  >
                    Read more
                  </a>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Risk Details Card */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border bg-white"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  <span className="text-sm opacity-75">
                    {(item.relevance * 100).toFixed(1)}% relevant
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <span className="text-sm font-medium">Impact Score</span>
                    <div className="text-2xl font-bold text-blue-600">
                      {(item.impact * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Likelihood Score</span>
                    <div className="text-2xl font-bold text-purple-600">
                      {(item.likelihood * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
                <p className="text-sm mb-2">{item.summary}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline hover:no-underline"
                >
                  Read more
                </a>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
