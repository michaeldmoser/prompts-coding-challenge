import { rest, setupWorker } from "msw";
import { faker } from "@faker-js/faker";
faker.seed(9876234598);

import { Air, Community, Habitat, Health, Heat, Water } from "./categories";

// PROMPTS
const StaticStoryPrompts = [
  {
    id: 1,
    emoji: "🖼",
    prompt: {
      english:
        "What are the most beautiful places in your community? What do you find beautiful about them?",
      spanish:
        "¿Cuáles son los lugares más bonitos de su comunidad? ¿Qué le parece bonito de ellos?",
    },
    origin: "static",
    categories: [Community],
  },
  {
    id: 2,
    emoji: "⬆️",
    prompt: {
      english:
        "What are the most important improvements you would make in your community?",
      spanish:
        "¿Cuáles son las mejoras más importantes que haría en su comunidad?",
    },
    origin: "static",
    categories: [Community, Health, Heat, Habitat, Water, Air],
  },
  {
    id: 3,
    emoji: "💯",
    prompt: {
      english:
        "What would you like to see more of in your neighborhood? Where would you like to see it?",
      spanish:
        "¿Qué le gustaría ver en mayor cantidad en su barrio? ¿Dónde le gustaría verlo?",
    },
    origin: "static",
    categories: [Air, Community, Habitat, Health, Heat, Water],
  },
  {
    id: 4,
    emoji: "📸",
    prompt: {
      english:
        "What parts of your community do you show people when they visit?",
      spanish:
        "¿Qué partes de su comunidad le muestra a la gente cuando va de visita?",
    },
    origin: "static",
    categories: [Community],
  },
  {
    id: 5,
    emoji: "🚫",
    prompt: {
      english:
        "Are there any places you avoid? Where are they and why do you avoid them?",
      spanish:
        "¿Hay lugares que usted evita? ¿Dónde están y por qué los evita?",
    },
    origin: "static",
    categories: [Community, Health],
  },
  {
    id: 6,
    emoji: "💔",
    prompt: {
      english:
        "What places do you wish were more beautiful? How would you make them more beautiful?",
      spanish:
        "¿Qué lugares le gustaría que fueran más bonitos? ¿Qué haría para embellecerlos?",
    },
    origin: "static",
    categories: [Community],
  },
  {
    id: 7,
    emoji: "🧺",
    prompt: {
      english: "What types of amenities do you wish your gathering spaces had?",
      spanish:
        "¿Qué tipo de instalaciones desearía que tuvieran los lugares de reunión?",
    },
    origin: "static",
    categories: [Community],
  },
  {
    id: 8,
    emoji: "🏆",
    prompt: {
      english:
        "What’s a moment that exemplified the best your community could be? Where did this event take place?",
      spanish:
        "¿Qué momento ejemplificó lo mejor de su comunidad? ¿Dónde se hizo ese evento?",
    },
    origin: "static",
    categories: [Community],
  },
  {
    id: 9,
    emoji: "🏃",
    prompt: {
      english: "Where do you do physical activities? What are they?",
      spanish: "¿Dónde realiza actividades físicas? ¿Cuáles son?",
    },
    origin: "static",
    categories: [Community, Health],
  },
  {
    id: 10,
    emoji: "🌞",
    prompt: {
      english:
        "Where do you find yourself spending time that’s too hot or sunny? Where do you wish there were more shade?",
      spanish:
        "¿Qué lugares de los que frecuenta considera muy calurosos o con mucho sol? ¿Dónde le gustaría que hubiera más sombra?",
    },
    origin: "static",
    categories: [Heat],
  },
  {
    id: 11,
    emoji: "🎀",
    prompt: {
      english: "Where do you go for special occasions? Why?",
      spanish: "¿Adónde va para ocasiones especiales? ¿Por qué?",
    },
    origin: "static",
    categories: [Community],
  },
  {
    id: 21,
    emoji: "📉",
    prompt: {
      english:
        "Where do you see signs of negative change in your community? Describe them.",
      spanish:
        "¿Dónde observa señales de cambio positivo en su comunidad? Descríbalas.",
    },
    origin: "static",
    categories: [Air, Community, Habitat, Health, Heat, Water],
  },
  {
    id: 31,
    emoji: "📈",
    prompt: {
      english:
        "Where do you see signs of positive change in your community? Describe them.",
      spanish:
        "¿Dónde observa señales de cambio positivo en su comunidad? Descríbalas.",
    },
    origin: "static",
    categories: [Air, Community, Habitat, Health, Heat, Water],
  },
  {
    id: 41,
    emoji: "🤝",
    prompt: {
      english: "Where do you typically see people gathering?",
      spanish:
        "¿En qué lugares observa que se reúnen generalmente las personas?",
    },
    origin: "static",
    categories: [Community],
  },
  {
    id: 51,
    emoji: "🚈",
    prompt: {
      english: "Where do you wish you had more access to transit? What type?",
      spanish:
        "¿Adónde le gustaría tener más acceso para circular? ¿De qué tipo?",
    },
    origin: "static",
    categories: [Community],
  },
  {
    id: 61,
    emoji: "🗑",
    prompt: {
      english: "Where have you noticed accumulations of trash?",
      spanish: "¿Dónde ha observado acumulación de basura?",
    },
    origin: "static",
    categories: [Habitat, Health],
  },
  {
    id: 71,
    emoji: "💨",
    prompt: {
      english: "Where have you noticed poor air quality?",
      spanish: "¿Dónde ha notado mala calidad de aire?",
    },
    origin: "static",
    categories: [Air, Habitat, Health],
  },
  {
    id: 81,
    emoji: "☣️",
    prompt: {
      english: "Where have you noticed water pollution?",
      spanish: "¿Dónde ha notado contaminación en el agua?",
    },
    origin: "static",
    categories: [Habitat, Health, Water],
  },
  {
    id: 91,
    emoji: "🌊",
    prompt: {
      english: "Where have you seen flooding?",
      spanish: "¿Dónde ha visto inundaciones?",
    },
    origin: "static",
    categories: [Water],
  },
  {
    id: 101,
    emoji: "🦋",
    prompt: {
      english:
        "Where do you see plants and animals? Which ones do you see there?",
      spanish: "¿Dónde ve plantas y animales? ¿Cuáles ve?",
    },
    origin: "static",
    categories: [Habitat],
  },
];

const worker = setupWorker(
  rest.get(
    "/api/prompts",
    (_req, res, ctx) => res(ctx.status(200), ctx.json(StaticStoryPrompts)),
  ),
);
worker.start({
  onUnhandledRequest: "bypass",
});
