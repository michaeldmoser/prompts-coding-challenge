import PromptList from "./promptlist";
import { useReducer, useState } from "react";
import { useGetPromptsQuery } from "../api";
import Dialog from "@/components/dialog";
import PromptCategories from "./promptcategories";
import { categories } from "@/backend/categories";
import { useSelectedLanguage } from "@/components/language-selector";

export default function Prompts() {
  const {
    prompts,
    category,
    setCategory,
    activePrompt,
    activatePrompt,
    deactivatePrompt,
    language,
  } = usePrompts();

  return (
    <Dialog>
      <PromptCategories {...{ categories, active: category, setCategory }} />
      <PromptList
        prompts={prompts}
        onDeactivate={deactivatePrompt}
        onActivate={activatePrompt}
        active={activePrompt}
        language={language}
      />
    </Dialog>
  );
}

/**
 * Business logic for the prompts dialog
 */
function usePrompts() {
  const { data: prompts } = useGetPromptsQuery();

  return {
    language: useSelectedLanguage(),
    ...usePromptFiltering(prompts ?? []),
    ...usePromptActivation(),
  };
}

/**
 * Handles selecting the what category of prompts to display
 */
function usePromptFiltering(prompts: PromptList) {
  const [category, setCategory] = useState<AllCategories>("All");

  const filteredPrompts = prompts.filter((prompt) => {
    if (category === "All") {
      return true;
    }
    return prompt.categories.some((item) => item.english === category);
  });

  return { prompts: filteredPrompts, category, setCategory };
}

/**
 * Handles the state of the active prompt
 */
function usePromptActivation() {
  const reducer = (
    _state: any,
    action: { type: "activate" | "deactivate"; payload?: number },
  ) => {
    switch (action.type) {
      case "activate":
        return action.payload;
      case "deactivate":
        return null;
      default:
        throw new Error("invalid action");
    }
  };
  const [activePrompt, dispatch] = useReducer(reducer, null);

  const activatePrompt = (id: number) =>
    dispatch({ type: "activate", payload: id });
  const deactivatePrompt = () => dispatch({ type: "deactivate" });

  return { activePrompt, activatePrompt, deactivatePrompt };
}
