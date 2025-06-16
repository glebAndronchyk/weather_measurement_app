import { createRoot } from "react-dom/client";
import type { FC } from "react";
import { withCoreProviders } from "./withCoreProviders.tsx";

const modalsCache = {};

const createCustomPresentationLayer = () => {
  const id = crypto.randomUUID();
  const container = document.createElement("div");
  container.id = `presentation-${id}`;

  document.body.appendChild(container);

  const clearDOM = () => {
    document.body.removeChild(container);
  };

  return { root: createRoot(container), clearDOM };
};

export const modalPool = <
  TRoot extends { closeModal?: VoidFunction },
  TTrigger extends Record<string, any>,
>(
  key: string,
  component: FC<TRoot>,
  trigger: FC<TTrigger>,
) => {
  modalsCache[key] = component;

  const open = (props?: object) => {
    const { root, clearDOM } = createCustomPresentationLayer();
    const closeModalHandler = () => {
      root.unmount();
      clearDOM();
    };

    const Component = withCoreProviders(modalsCache[key]) as FC<
      Record<string, unknown>
    >;

    root.render(
      <Component closeModal={closeModalHandler as never} {...props} />,
    );
  };

  return (
    props: TTrigger & { openRelatedModal?: VoidFunction; modalKey?: string },
  ) => trigger({ openRelatedModal: open, modalKey: key, ...props });
};
