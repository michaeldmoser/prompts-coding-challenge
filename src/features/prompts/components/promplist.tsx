import { categories } from "@/backend/categories";
import { useState } from "react";

export default function PromptList({ prompts }) {
  const [category, setCategory] = useState("all");

  const filteredPrompts = prompts.filter((prompt) => {
    if (category === "all") {
      return true;
    }
    return prompt.categories.some((item) => item.english === category);
  });

  return (
    <>
      <div>
        <ul>
          <li className="text-4xl p-1">
            <button className="outline" onClick={() => setCategory("all")}>
              All
            </button>
          </li>
          {categories.map((category, key) => (
            <li key={key} className="text-4xl p-1">
              <button
                onClick={() => {
                  return setCategory(category.english);
                }}
                className="outline"
              >
                {category.english}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ul>
        {filteredPrompts.map((prompt) => (
          <li key={prompt.id} className="text-4xl p-1">
            {prompt.prompt.english}
          </li>
        ))}
      </ul>
    </>
  );
}
