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
  Political: 'bg-red-100 text-red-700',
  Economic: 'bg-blue-100 text-blue-700',
  Social: 'bg-purple-100 text-purple-700',
  Technological: 'bg-cyan-100 text-cyan-700',
  Legal: 'bg-amber-100 text-amber-700',
  Environmental: 'bg-emerald-100 text-emerald-700',
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
          <CardTitle>PESTLE Analysis Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categoryStats.map(({ category, count, avgRelevance }) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons];
              const colorClass = categoryColors[category as keyof typeof categoryColors];
              return (
                <div
                  key={category}
                  className={`flex flex-col items-center p-4 rounded-lg ${colorClass}`}
                >
                  <Icon className="w-8 h-8 mb-2" />
                  <span className="font-semibold">{category}</span>
                  <span className="text-sm">{count} items</span>
                  <span className="text-sm">Avg. relevance: {(avgRelevance * 100).toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed News List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent News Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(data).map(([category, items]) => {
              const colorClass = categoryColors[category as keyof typeof categoryColors];
              return items.map((item, index) => (
                <div
                  key={`${category}-${index}`}
                  className={`p-4 rounded-lg border ${colorClass.replace('text-', 'border-')}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{item.shortTitle}</h3>
                    <span className="text-sm opacity-75">
                      {(item.relevance * 100).toFixed(1)}% relevant
                    </span>
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
              ));
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
