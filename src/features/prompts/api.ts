import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetPromptsQuery() {
  return useQuery<PromptList>({
    queryKey: ["prompts"],
    queryFn: () => axios.get("/api/prompts").then((res) => res.data),
    initialData: [],
  });
}
