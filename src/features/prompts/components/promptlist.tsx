import cx from "@/utils/cx";
import { CheckIcon, PlusIcon } from "@radix-ui/react-icons";

/**
 * Displays a list of passed in Prompts defaulting to english
 */
export default function PromptList(
  {
    prompts,
    language = "english",
    onActivate = (_) => void (0),
    onDeactivate = (_) => void (0),
    active,
  }: {
    prompts: PromptList;
    language?: "english" | "spanish";
    onActivate: (promptId: number) => void;
    onDeactivate: (promptId: number) => void;
    active?: number | null;
  },
) {
  return (
    <ul>
      {prompts.map((prompt) => {
        const content = prompt.prompt[language] ?? prompt.prompt.english;
        const isActive = active === prompt.id;
        const addRemovePrompt = isActive ? "Deactivate" : "Activate";
        const title = `${addRemovePrompt} prompt "${content}"`;
        const onClick = () => {
          const fn = isActive ? onDeactivate : onActivate;
          fn(prompt.id);
        };

        return (
          <li key={prompt.id} className="text-xl p-1">
            {content}
            <button
              aria-label={title}
              title={title}
              onClick={onClick}
              className={cx(
                "ml-2 text-gray-500 hover:text-blue-600 outline outline-2 rounded-full",
                isActive && "text-green-600 outline-green-600",
              )}
            >
              {isActive
                ? <CheckIcon className="h-[1em] w-[1em]" fill="currentColor" />
                : <PlusIcon className="h-[1em] w-[1em]" fill="currentColor" />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
