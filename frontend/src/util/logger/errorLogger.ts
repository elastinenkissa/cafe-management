export const errorLogger = (error: any) => {
  console.log(
    error.message || error.response.data.message || 'Unknown error occured.'
  );
};
