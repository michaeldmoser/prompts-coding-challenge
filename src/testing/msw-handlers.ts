import { factory } from "./factory";
import { rest } from "msw";

const handlers = [
  // ...factory.prompts.toHandlers(
  //   "rest",
  //   "/api",
  // ),
  rest.get("/api/prompts", (req, res, ctx) => {
    return res(
      ctx.json(
        factory.prompts.getAll(),
      ),
    );
  }),
];

export default handlers;
