import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Retrieve the list of prompts from the server. Of course, the server in the
 * situation is just a mock server provided by MSW
 */
export function useGetPromptsQuery() {
  return useQuery<PromptList>({
    queryKey: ["prompts"],
    queryFn: () => axios.get("/api/prompts").then((res) => res.data),
    initialData: [],
  });
}
