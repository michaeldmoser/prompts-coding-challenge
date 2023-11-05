# Getting setup and running

Node 20.8.1 was used to build the project. While it's likely that other versions
will if you're running into issues, try installing this version.

## To run

```bash
npm install
npm run dev
```

## To test

```bash
npm run test
```

## To run storybook and storybook tests

```bash
npm run storybook
```

To run the storybook tests open a seperate terminal and execute:

```bash
npm run test-storybook
```

# Preface / caveats

## The UI

I did very little to style the UI or consider usability and instead focused on
functionality. Normally, with access to a designer, I would have spent time
collaborating with them to create a more polished and usable UI.

## Testing

There are test and you'll find them in the `__tests__/` directories through the
directory structure. They are not comprehensive or highly polished themselves
but do provide a glimpse of how I approach testing in general. Certainly in a
production code base there would be more tests looking at edge cases and error
handling.

### Storybook tests

In you're not familiar with [Storybook](https://storybook.js.org/) it's a tool
for developing and testing UI components in isolation. It's a great tool for
building UIs and I've used it in the past to build out entire UIs. It's also a
great tool for testing UIs, documenting components, and enabling the creation of
a design system.

When you run storybook you can access it in the browser at
http://localhost:6006/. You'll find the tests in the `__tests__` directory with
a `.stories.tsx` extension in the storybook panel.

## Typescript

In the first technical interview I used javascript instead of typescript to
avoid having to consider all the nuaces of typing while live coding. For this
part I switched over to typescript as that's what I'd typically advocate for in
production code.

# Project structure notes

Most of the files should have documentation in them to describe a little more
about the file. So, see the individual files for more details. Here I'll just
try to describe some highlevel aspects and important notes.

This structure I find works well in the context of a React app. Using a
different framework would dictate a different structure depending on the
framework and it's opinions on how files should be organized. One concept I like
to stick to is colocating related functionality as much as possible within the
confines of the framework.

## `src/features/prompts`

This contains the bulk of the functionality surrounding the prompt dialog and
displaying and interacting with the prompts. I typically like to put big major
features into a `feaures/` directory. This helps colocate functionality related
to a feature in one place. In theory one should be able to take any of the
features in the directory and move them to another project without needing to
rewrite code, practically though that is rarely the case but the concept is
helpful to work towards.

## `src/backend/`

This sets up a fake backend server for use in the browser. Most time of time
this is used for testing only but works well in the use case here for a coding
challenge.

## `src/testing/`

This is a lot of helper functions surrounding testing and making it work well.

## `src/components`

Components which can be used separate from specific features. In the use case
here this sets up the UI toggle and context for selecting a language and the
base `<Dialog />` component.

## `src/utils/`

Contains small utilities that can be useful across most of the app. In this case
the only real utility is one to help with combining and merging tailwind classes
on elements. You can see a use of this in the `<PromptList />` in the
`promptlist.tsx` file.

## `src/libs/`

I typically like to wrap libraries that require calling setup function or some
other of setup in a component or function call to help abstract way all the
boilerplate involve there. The `libs/` directory is where I do most often do
that as seen with the react-query library.

## `src/providers/`

In the use case here this simply brings together the highlevel pieces of the app
and ties them together. In other projects I've also used this to create contexts
and other providers that general purpose across the entire app. Maybe something
like an authentication provider or user settings provider/context and so on.

## `src/types.d.ts`

Just created basic types surrounding the prompts. In most cases I'd colocate the
types with the code that uses them. However, in this example app the prompts are
fairly global so I made the types global.
