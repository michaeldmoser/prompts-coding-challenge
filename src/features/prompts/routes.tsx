/**
 * Sets up the routes for prompts dialog. Nothing special here, just tells
 * react-router to render the prompts component
 */
import { Route, Routes } from "react-router-dom";
import Prompts from "@/features/prompts/components/prompts";

export default function PromptRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<Prompts />} />
    </Routes>
  );
}
