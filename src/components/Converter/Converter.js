import { useEffect, useState } from 'react'
import { getRequestURL } from '../../rest/utils'

const Converter = () => {
  const [currencyList, setCurrencyList] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const queryParams = {
    type: 'fiat'
  }
  useEffect(() => {
    setLoading(true)
    fetch(getRequestURL('currencies',queryParams))
      .then((response) => {
        return response.json()
      })  
      .then((data) => {
        const formattedList = Object.keys(data).map((key) => data[key])
        setLoading(false)
        setCurrencyList(formattedList)
      })   
      .catch(err => {
        setError(err)
        console.error(err)
      })
  }, [])
  return (
    <div className="converter-wrapper">
      <h1>Currency Converter</h1>
      <div className="form-wrapper">
        <form name="converterData">
          <input type="number" name="amount" /> 
          <select name="base">
            {
              currencyList.map((currency)=> (
                <option value={currency.code}>{currency.name}</option>
              ))
            }
          </select>
          <span>To</span>
          <select name="destination">
            {
              currencyList.map((currency)=> (
                <option value={currency.code}>{currency.name}</option>
              ))
            }
          </select>
          
        </form>
      </div>

    </div>
  )
}
export default Converter