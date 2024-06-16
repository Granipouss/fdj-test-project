export const fetch = (uri: string) => {
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ?? '3000';
  const baseURL = `http://${host}:${port}`;
  return global.fetch(baseURL + uri);
};
