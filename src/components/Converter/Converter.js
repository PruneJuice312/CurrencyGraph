import { useEffect, useState } from 'react'
import { getRequestURL } from '../../rest/utils'

const Converter = () => {
  const [currencyList, setCurrencyList] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // I added this piece of state to hold the results of the conversion request.
  const [conversionAnswer, setConversionAnswer] = useState(null)
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

  const handleSubmit = (event) => {
    // onsubmit calls the passed function (handleSubmit in this case) 
    event.preventDefault()
    /*
    Step 1) Code for handling form data goes here, you should be able to extract the data from the event
    Remember, the name attribute on the `input` and `select`s are the corresponding names for the data in the form data.
    */

   /*
    Step 2) After getting data together, set queryParams based on the currencybeacon docs and use fetch with the appropriate endpoint
    in order to get the conversion data.
   */

    /*
    Step 3) Call setConversionAnswer with the results to set the answer in the component's state.
    */
  }
  
  return (
    <div className="converter-wrapper">
      <h1>Currency Converter</h1>
      <div className="form-wrapper">
      {/* a form's `onsubmit` attribute expects a function  */}
        <form name="converterData" onsubmit={handleSubmit}>
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