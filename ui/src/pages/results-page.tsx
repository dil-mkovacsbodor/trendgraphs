import { PestleChart } from '@/components/charts/pestle-chart';
import { RiskProbability } from '@/components/charts/risk-probability';
import { pestleExampleData, riskExampleData } from '@/lib/data/example-data';

export const ResultsPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Analysis Results</h1>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6">PESTLE Analysis</h2>
          <PestleChart data={pestleExampleData} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Risk Analysis</h2>
          <RiskProbability data={riskExampleData} />
        </section>
      </div>
    </div>
  );
};