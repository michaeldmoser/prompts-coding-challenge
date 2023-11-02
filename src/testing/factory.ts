import { faker } from "@faker-js/faker";

import { drop, factory as mswFactory, primaryKey } from "@mswjs/data";

import {
  Air,
  Community,
  Habitat,
  Health,
  Heat,
  Water,
} from "@/backend/categories";
/**
 * Factory for creating mock data. This is a wrapper around `@mswjs/data` that adds some additional functionality.
 */
export const factory = mswFactory({
  prompts: {
    id: primaryKey(autoIncrementingIdFactory()),
    emoji: faker.internet.emoji,
    prompt: {
      english: faker.lorem.sentence,
      spanish: faker.lorem.sentence,
    },
    origin: () => "static",
    // @ts-ignore
    categories: () =>
      Array(faker.number.int({ min: 1, max: 4 })).fill(null).map(() =>
        faker.helpers.arrayElement([
          Air,
          Community,
          Habitat,
          Health,
          Heat,
          Water,
        ])
      ),
  },
});

/**
 * Creates a function that returns an auto-incrementing id.
 */
function autoIncrementingIdFactory(startingId = 1) {
  let id = startingId;
  return () => id++;
}

/**
 * Fetch a record from the mock database by it's ID. This pretty much wraps `db.record.findFirst({where: { id: { equals: id } }})`
 *
 * @param  id ID of the record to fetch
 * @returns
 */
function fetchById(this: FactoryReturn, id: string | number) {
  return this.findFirst(whereById(id));
}

/**
 * Creates `count` randomly populated records
 *
 * @param count The number of records to create
 * @param properties The properties to be set on each created record. Any property not passed in will be auto-generated.
 *
 * @returns The list of generated records.
 */
function createMany(
  this: FactoryReturn,
  count: number = 1,
  properties: any = {},
) {
  return Array(count).fill(null).map(() => this.create(properties));
}

/**
 * Patch each of the entities with the following functions
 *  - createMany()
 *  - fetchById()
 */
Object.entries(factory).forEach((args) =>
  Object.assign(args[1], { createMany, fetchById })
);

export function whereById(id: number | string) {
  return {
    where: { id: { equals: parseInt(id.toString(), 10) } },
  };
}

/**
 * Forces the database to reset before each test ensuring we have a clean environment to work with.
 */
if (typeof beforeEach === "function") {
  beforeEach(() => {
    drop(factory);
  });
}

type FactoryReturn = ReturnType<typeof mswFactory>;
