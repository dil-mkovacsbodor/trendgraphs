export interface NewsObject {
  link: string;
  title: string;
  shortTitle: string;
  summary: string;
  relevance: number;
}

export interface PestleData {
  Political: NewsObject[];
  Economic: NewsObject[];
  Social: NewsObject[];
  Technological: NewsObject[];
  Legal: NewsObject[];
  Environmental: NewsObject[];
}