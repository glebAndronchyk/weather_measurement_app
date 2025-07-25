export const debounce = <TArgs extends Array<unknown>>(
  cb: (...args: TArgs) => void,
  t = 300,
) => {
  let timeout: number | NodeJS.Timeout;

  return (...args: TArgs) => {
    timeout = setTimeout(() => {
      cb(...args);
      clearTimeout(timeout);
    }, t);
  };
};
