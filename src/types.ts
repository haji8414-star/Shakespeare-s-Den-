export interface Word {
  word: string;
  meaning: string;
  example: string;
  usage: string;
  explanation: string;
  category: "Everyday" | "Professional" | "Academic" | "Chunks" | "Errors";
}

export interface Island {
  id: number;
  name: string;
  category: "Survival" | "Daily Life" | "Professional" | "Academic" | "Intellectual";
  subtitle: string;
  icon: string;
  hook: string;
  bics: string;
  calp: string;
  vocabulary: Word[];
  chunks: string[];
  exercises: string[];
}

export interface Tense {
  id: number;
  name: string;
  subtitle: string;
  hook: string;
  formula: {
    positive: string;
    negative: string;
    question: string;
  };
  usages: { label: string; example: string }[];
  examples: { sentence: string; explanation: string }[];
  signals: string[];
  commonErrors: { error: string; correction: string; explanation: string }[];
}

export interface Researcher {
  name: string;
  theory: string;
  summary: string;
  fullDescription: string;
}
