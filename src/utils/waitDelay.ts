export const waitDelay = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
