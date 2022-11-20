export const errorHandler = (error: any) => {
  if (error.response) {
    return error.response.data
  }
}