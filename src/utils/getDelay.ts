const getDelay = (startLoadingTime: number) => {
  const elapsed = Date.now() - startLoadingTime;
  const minDelay = 1000;
  const delay = Math.max(0, minDelay - elapsed);
  return delay;
};
export default getDelay;
