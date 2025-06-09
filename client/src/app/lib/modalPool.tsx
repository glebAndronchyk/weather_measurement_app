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

export const modalPool = (
  key: string,
  component: FC<{ closeModal: VoidFunction }>,
  trigger: FC<{ openRelatedModal: VoidFunction; modalKey: string }>,
) => {
  modalsCache[key] = component;

  const open = () => {
    const { root, clearDOM } = createCustomPresentationLayer();
    const closeModalHandler = () => {
      root.unmount();
      clearDOM();
    };

    const Component = withCoreProviders(modalsCache[key]);

    root.render(<Component closeModal={closeModalHandler} />);
  };

  return () => trigger({ openRelatedModal: open, modalKey: key });
};
