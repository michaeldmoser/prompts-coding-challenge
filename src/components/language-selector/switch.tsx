import { useSetLanguage } from "./context";

export default function Switch() {
  const setLanguage = useSetLanguage();

  return (
    <div className="flex items-center">
      <label
        htmlFor="hs-basic-with-description"
        className="text-sm text-gray-500 mr-3 dark:text-gray-400"
      >
        English
      </label>
      <input
        type="checkbox"
        id="hs-basic-with-description"
        className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
        onChange={(e) => {
          setLanguage(e.target.checked ? "spanish" : "english");
        }}
      />
      <label
        htmlFor="hs-basic-with-description"
        className="text-sm text-gray-500 ml-3 dark:text-gray-400"
      >
        Español
      </label>
    </div>
  );
}
