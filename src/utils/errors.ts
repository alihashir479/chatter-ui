const handleError = (error: any) => {
  if(!error.errors) {
    return 'Unknwown error'
  }

  const errorMessage = error.errors[0]?.extensions?.originalError?.message
  return errorMessage
}

export {
  handleError
}