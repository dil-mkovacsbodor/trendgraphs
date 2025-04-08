import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, BarChart2, TrendingUp } from 'lucide-react';
import type { RiskData } from '@/lib/types/risk';

interface RiskProbabilityProps {
  data: RiskData;
}

const getRiskLevel = (impact: number, likelihood: number) => {
  const score = impact * likelihood;
  if (score >= 0.7) return { level: 'High', color: 'bg-gradient-to-r from-red-400 to-red-600 text-white border-red-200' };
  if (score >= 0.4) return { level: 'Medium', color: 'bg-gradient-to-r from-amber-400 to-amber-600 text-white border-amber-200' };
  return { level: 'Low', color: 'bg-gradient-to-r from-green-400 to-green-600 text-white border-green-200' };
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
          <CardTitle className="text-lg font-bold">Risk Analysis Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 bg-gradient-to-r from-blue-400 to-blue-600 text-white">
              <AlertTriangle className="w-8 h-8 mb-2" />
              <span className="font-semibold">Total Risks</span>
              <span className="text-2xl font-bold">{totalRisks}</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 bg-gradient-to-r from-purple-400 to-purple-600 text-white">
              <BarChart2 className="w-8 h-8 mb-2" />
              <span className="font-semibold">Avg. Impact</span>
              <span className="text-2xl font-bold">{(avgImpact * 100).toFixed(0)}%</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white">
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
                  className={`p-4 rounded-lg border shadow-md transform transition-transform hover:scale-105 ${color}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">{item.shortTitle}</h4>
                    <span className="text-sm font-medium text-white">{level} Risk</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <span className="text-sm opacity-75 text-white">Impact:</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${item.impact * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm opacity-75 text-white">Likelihood:</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-purple-600 h-2.5 rounded-full"
                          style={{ width: `${item.likelihood * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm mb-2 text-white">{item.summary}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline hover:no-underline text-white"
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
