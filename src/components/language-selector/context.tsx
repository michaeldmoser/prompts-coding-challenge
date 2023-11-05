import { createContext, PropsWithChildren, useContext, useState } from "react";

type LanguageSelectorContextType = {
  language: PromptLanguages;
  setLanguage: (language: PromptLanguages) => void;
};

const LanguageSelectorContext = createContext<LanguageSelectorContextType>({
  language: "english",
  setLanguage: (_) => void (0),
});

/**
 * Returns the currently selected language
 */
export function useSelectedLanguage() {
  return useContext(LanguageSelectorContext).language;
}

/**
 * Returns a function to set the language
 */
export function useSetLanguage() {
  return useContext(LanguageSelectorContext).setLanguage;
}

/**
 * Context provider for managing the selected language
 */
export function Provider(
  { children, language = "english" }: PropsWithChildren<
    { language?: PromptLanguages }
  >,
) {
  const [currentLanguage, setLanguage] = useState<PromptLanguages>(language);
  return (
    <LanguageSelectorContext.Provider
      value={{ language: currentLanguage, setLanguage }}
    >
      {children}
    </LanguageSelectorContext.Provider>
  );
}
