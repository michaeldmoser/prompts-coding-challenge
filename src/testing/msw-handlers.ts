import { factory } from "./factory";

const handlers = [
  ...factory.prompts.toHandlers(
    "rest",
    "http://localhost:5173/api",
  ),
];

export default handlers;
