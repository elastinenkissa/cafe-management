export const errorLogger = (error: any) => {
  console.log(
    error.response.data
      ? error.response.data.message
      : 'Unknown error occured.'
  );
};
