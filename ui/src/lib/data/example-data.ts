import { PestleData } from '../types/pestle';
import { RiskData } from '../types/risk';

export const pestleExampleData: PestleData = {
  Political: [
    {
      link: "https://example.com/news/political-article-1",
      title: "New Government Policy Announced for Tech Industry",
      shortTitle: "Tech Policy Update",
      summary: "The government has announced new regulations for the technology sector, focusing on data privacy and AI governance.",
      relevance: 0.85
    }
  ],
  Economic: [
    {
      link: "https://example.com/news/economic-article-1",
      title: "Global Market Trends Show Significant Growth in Tech Sector",
      shortTitle: "Tech Market Growth",
      summary: "Recent economic indicators show a 15% growth in the technology sector, driven by AI and cloud computing investments.",
      relevance: 0.92
    }
  ],
  Social: [
    {
      link: "https://example.com/news/social-article-1",
      title: "Remote Work Revolution: Impact on Urban Development",
      shortTitle: "Remote Work Impact",
      summary: "The shift to remote work is changing urban landscapes and social dynamics in major tech hubs.",
      relevance: 0.78
    }
  ],
  Technological: [
    {
      link: "https://example.com/news/tech-article-1",
      title: "Breakthrough in Quantum Computing Research",
      shortTitle: "Quantum Computing Progress",
      summary: "Scientists achieve new milestone in quantum computing, potentially revolutionizing data processing capabilities.",
      relevance: 0.95
    }
  ],
  Legal: [
    {
      link: "https://example.com/news/legal-article-1",
      title: "New Data Protection Regulations Take Effect",
      shortTitle: "Data Protection Update",
      summary: "Updated data protection laws come into force, affecting how companies handle user information.",
      relevance: 0.88
    }
  ],
  Environmental: [
    {
      link: "https://example.com/news/environmental-article-1",
      title: "Tech Companies Commit to Carbon Neutrality",
      shortTitle: "Tech Carbon Pledge",
      summary: "Major technology companies announce joint initiative to achieve carbon neutrality by 2030.",
      relevance: 0.82
    }
  ]
};

export const riskExampleData: RiskData = [
  {
    link: "https://example.com/news/risk-article-1",
    title: "Cybersecurity Breach Risk Increases with New AI-Powered Attack Methods",
    shortTitle: "AI Cyber Attack Risk",
    summary: "Recent developments in AI have led to more sophisticated cyber attack methods, increasing the risk of data breaches for companies.",
    relevance: 0.95,
    impact: 0.9,
    likelihood: 0.7
  },
  {
    link: "https://example.com/news/risk-article-2",
    title: "Supply Chain Disruption Risk Due to Global Trade Tensions",
    shortTitle: "Supply Chain Risk",
    summary: "Ongoing trade tensions between major economies could lead to significant supply chain disruptions in the tech industry.",
    relevance: 0.88,
    impact: 0.85,
    likelihood: 0.6
  },
  {
    link: "https://example.com/news/risk-article-3",
    title: "Regulatory Compliance Risk with New Data Protection Laws",
    shortTitle: "Compliance Risk",
    summary: "New data protection regulations coming into effect next year could impact companies' ability to process and store user data.",
    relevance: 0.92,
    impact: 0.75,
    likelihood: 0.9
  }
];