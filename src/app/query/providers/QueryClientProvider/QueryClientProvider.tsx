import { QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../settings.ts";
import type { FC, PropsWithChildren } from "react";

export const QueryClientProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
};
