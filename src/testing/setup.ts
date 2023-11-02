/// <reference types="./chai.d.ts" />
/// <reference types="./types.d.ts" />
import { faker } from "@faker-js/faker";
import { beforeAll } from "vitest";
import "./mockbackend";
import "./chai";

beforeAll(() => {
  faker.seed(429487);
});

window.PointerEvent = class PointerEvent extends Event {};
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();

global.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

window.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.window = window;
global.window = window;
