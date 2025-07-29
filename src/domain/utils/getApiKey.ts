export const getApiKey = (request: any): string => {
  const apiKey = request.headers['x-api-key'];

  if (!apiKey) {
    throw new Error('No api key provided');
  }

  return apiKey;
};
