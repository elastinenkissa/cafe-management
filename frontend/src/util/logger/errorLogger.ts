export const errorLogger = (error: any) => {
  console.log(
    error.response
      ? error.response.data.message
      : error.message || 'Unknown error occured'
  );
};
