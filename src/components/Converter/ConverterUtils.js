const getFormattedAnswer = (conversionAnswer, currencyList) => {
  const { value, amount, from, to } = conversionAnswer
  const { name: fromName, symbol: fromSymbol } = currencyList.find((currency) => {
    return currency.short_code === from
  })
  const { name: toName, symbol: toSymbol } = currencyList.find((currency) => {
    return currency.short_code === to
  })
  return `${fromSymbol}${amount} ${fromName} is ${toSymbol}${value.toFixed(2)} ${toName}`
}
export default getFormattedAnswer