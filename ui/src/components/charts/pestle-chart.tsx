import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Laptop, Leaf, LineChart, Scale, Users } from 'lucide-react';
import type { NewsObject } from '@/lib/types/pestle';

interface PestleChartProps {
  data: {
    Political: NewsObject[];
    Economic: NewsObject[];
    Social: NewsObject[];
    Technological: NewsObject[];
    Legal: NewsObject[];
    Environmental: NewsObject[];
  };
}

const categoryIcons = {
  Political: Building2,
  Economic: LineChart,
  Social: Users,
  Technological: Laptop,
  Legal: Scale,
  Environmental: Leaf,
};

const categoryColors = {
  Political: 'bg-gradient-to-r from-red-400 to-red-600 text-white',
  Economic: 'bg-gradient-to-r from-blue-400 to-blue-600 text-white',
  Social: 'bg-gradient-to-r from-purple-400 to-purple-600 text-white',
  Technological: 'bg-gradient-to-r from-cyan-400 to-cyan-600 text-white',
  Legal: 'bg-gradient-to-r from-amber-400 to-amber-600 text-white',
  Environmental: 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-white',
};

export function PestleChart({ data }: PestleChartProps) {
  // Calculate average relevance for each category
  const categoryStats = Object.entries(data).map(([category, items]) => ({
    category,
    count: items.length,
    avgRelevance: items.reduce((sum, item) => sum + item.relevance, 0) / items.length || 0,
  }));

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">PESTLE Analysis Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categoryStats.map(({ category, count, avgRelevance }) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons];
              const colorClass = categoryColors[category as keyof typeof categoryColors];
              return (
                <div
                  key={category}
                  className={`flex flex-col items-center p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 ${colorClass}`}
                >
                  <Icon className="w-8 h-8 mb-2" />
                  <span className="font-semibold text-white">{category}</span>
                  <span className="text-sm text-white">{count} items</span>
                  <span className="text-sm text-white">Avg. relevance: {(avgRelevance * 100).toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed News List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Recent News Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(data).map(([category, items]) => {
              const colorClass = categoryColors[category as keyof typeof categoryColors];
              return items.map((item, index) => (
                <div
                  key={`${category}-${index}`}
                  className={`p-4 rounded-lg border shadow-md transform transition-transform hover:scale-105 ${colorClass.replace('text-', 'border-')}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">{item.shortTitle}</h3>
                    <span className="text-sm opacity-75 text-white">
                      {(item.relevance * 100).toFixed(1)}% relevant
                    </span>
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
              ));
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
