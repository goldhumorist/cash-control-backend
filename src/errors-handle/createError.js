module.exports = (errorMessage, errorStatus) => {
  const error = new Error(errorMessage);
  error.status = errorStatus;

  return error;
};
