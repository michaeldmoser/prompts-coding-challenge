import { createContext, PropsWithChildren, useContext, useState } from "react";

type LanguageSelectorContextType = {
  language: "english" | "spanish";
  setLanguage: (language: "english" | "spanish") => void;
};

const LanguageSelectorContext = createContext<LanguageSelectorContextType>({
  language: "english",
  setLanguage: (_) => void (0),
});

export function useSelectedLanguage() {
  return useContext(LanguageSelectorContext).language;
}

export function useSetLanguage() {
  return useContext(LanguageSelectorContext).setLanguage;
}

export function Provider(
  { children, value = "english" }: PropsWithChildren<
    { value?: "english" | "spanish" }
  >,
) {
  const [language, setLanguage] = useState<"english" | "spanish">(value);
  return (
    <LanguageSelectorContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageSelectorContext.Provider>
  );
}
