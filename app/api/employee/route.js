export const GET = (request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(request);
    }, 1000);
  });
};
