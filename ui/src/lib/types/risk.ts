export interface RiskNewsObject {
  link: string;
  title: string;
  shortTitle: string;
  summary: string;
  relevance: number;
  impact: number;
  likelihood: number;
}

export type RiskData = RiskNewsObject[];