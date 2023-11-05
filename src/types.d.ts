// This may not be useful as a type in a larger systems especially if the categories are dymamic.
type EnglishCategories =
  | "Air"
  | "Community"
  | "Habitat"
  | "Health"
  | "Heat"
  | "Water";

type AllCategories = EnglishCategories | "All";

type PromptCategory = {
  english: EnglishCategories;
};

type PromptType = {
  id: number;
  emoji: string;
  prompt: {
    english: string;
    spanish: string;
  };
  origin: string;
  categories: PromptCategory[];
};

type PromptList = PromptType[];
