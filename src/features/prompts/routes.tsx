import { Route, Routes } from "react-router-dom";
import Prompts from "@/features/prompts/components/Prompts";

export default function PromptRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<Prompts />} />
    </Routes>
  );
}
