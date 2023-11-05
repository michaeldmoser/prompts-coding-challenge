import { PropsWithChildren } from "react";
export default function PromptCategories(
  { categories, active, setCategory }: {
    categories: PromptCategory[];
    setCategory: (category: AllCategories) => void;
    active: AllCategories;
  },
) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
        <Tab setCategory={setCategory}>All</Tab>
        {categories.map((category, key) => (
          <Tab key={key} setCategory={setCategory}>{category.english}</Tab>
        ))}
      </nav>
    </div>
  );
}

const Tab = (
  { children, setCategory }: PropsWithChildren<
    { setCategory: (category: AllCategories) => void }
  >,
) => (
  <button
    type="button"
    className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 active"
    aria-controls="tabs-with-underline-1"
    role="tab"
    onClick={() => setCategory(children as AllCategories)}
  >
    {children}
  </button>
);
