// Type guard to check if the error is an instance of Error
function isError(error: any): error is Error {
    return error instanceof Error;
};

//Type guard to check if the provided value is a string
function isString(value: any): value is string {
    return typeof value === 'string';
  };

export {
    isError,
    isString
};