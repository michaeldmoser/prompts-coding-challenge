import { PropsWithChildren } from "react";
import {
  Close,
  Content,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function Dialog({ children }: PropsWithChildren<{}>) {
  return (
    <Root>
      <Trigger asChild>
        <button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          Prompts
        </button>
      </Trigger>
      <Portal>
        <Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black bg-opacity-50" />
        <Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] w-9/12 max-w-4xl translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Title asChild>
            <div className="text-mauve12 m-0 grid grid-cols-2">
              <h2 className="text-4xl text-left">Prompts</h2>
            </div>
          </Title>
          {children}
          <Close asChild>
            <button
              className="text-violet-950 text-2xl hover:bg-violet-400 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] p-1 focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon className="w-[1em] h-[1em]" />
            </button>
          </Close>
        </Content>
      </Portal>
    </Root>
  );
}
