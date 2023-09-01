const baseURL = "https://api.currencybeacon.com/v1"
const apiKey = "qW7l8LjVzs6PGSXXQ3y9VuCWl8YRuyqQ"

// This helper method converts an object into a string that can be passed to an API through the URL
// i.e. { offset: 10, symbol: USD } => '&offset=10&symbol=USD'
const getParamStringFromObject = (queryParams) => {
  const searchParams = new URLSearchParams(queryParams)
  return `&${searchParams.toString()}`
}

// This function returns a URL in the format given an endpoint and options
// endpoint is a string, and queryParmas is an optional object that contains parameters for the fetch
export const getRequestURL = (endpoint, queryParams) => {
  const queryParamString = queryParams != null 
    ? getParamStringFromObject(queryParams)
    : ''
  return `${baseURL}/${endpoint}?api_key=${apiKey}${queryParamString}`
}
