export interface CareerSuggestion {
  title: string;
  matchPercentage: number;
  whyItSuits: string;
  requiredSkills: string[];
  missingSkills: string[];
  description: string;
}

export interface RoadmapStep {
  title: string;
  description: string;
  action: string;
  timeline: string;
}

export interface Roadmap {
  planA: RoadmapStep[];
  planB: RoadmapStep[];
}

export interface TechNewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  category: string;
}
