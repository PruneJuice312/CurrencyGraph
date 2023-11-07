import { useEffect, useState } from 'react'
import { getRequestURL } from '../../rest/utils'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import getFormattedAnswer from './ConverterUtils'

const Converter = () => {
  const [currencyList, setCurrencyList] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // I added this piece of state to hold the results of the conversion request.
  const [conversionAnswer, setConversionAnswer] = useState(null)

  useEffect(() => {
    const queryParams = {
      type: 'fiat'
    }
    setLoading(true)
    fetch(getRequestURL('currencies', queryParams))
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        const formattedList = Object.keys(data).map((key) => data[key])
        formattedList.sort((a,b) => {
          if(a.name > b.name) {
            return 1
          } else if(b.name > a.name) {
            return -1
          } else return 0
        })
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
    event.preventDefault();
    /*
    Step 1) Code for handling form data goes here, you should be able to extract the data from the event
    Remember, the name attribute on the `input` and `select`s are the corresponding names for the data in the form data.
    */
    const data = new FormData(event.target);
    const base = data.get("base");
    const amount = data.get("amount");
    const destination = data.get("destination");
    /*
     Step 2) After getting data together, set queryParams based on the currencybeacon docs and use fetch with the appropriate endpoint
     in order to get the conversion data.
    */
    const queryParams = {
      from: base,
      amount: amount,
      to: destination
    }
    setLoading(true)
    fetch(getRequestURL('convert', queryParams))
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setLoading(false)
        setConversionAnswer(data)
      })
      .catch(err => {
        setError(err)
        console.error(err)
      })
  }
  /*
Step 3) Call setConversionAnswer with the results to set the answer in the component's state.
*/

  return (
    <div className="converter-wrapper">
      <h1>Currency Converter</h1>
      <div className="form-wrapper">
        {/* a form's `onsubmit` attribute expects a function  */}
        <form name="converterData" onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <TextField type="number" placeholder='Amount' name="amount" />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id='base'>Base</InputLabel>
            <Select labelId='base' name="base" label='Base'>
              {
                currencyList?.map((currency) => (
                  <MenuItem key={currency.short_code} value={currency.short_code}>{currency.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <span>To</span>
          <FormControl fullWidth>
            <InputLabel id='destination'>Destination</InputLabel>
            <Select labelId='destination' name="destination" label='Destination'>
              {
                currencyList?.map((currency) => (
                  <MenuItem key={currency.short_code} value={currency.short_code}>{currency.name}</MenuItem>
                  ))
                }
            </Select>
          </FormControl>
          <Button type="submit">Convert</Button>
        </form>
        {
          conversionAnswer != null 
          ? 
           <div className='results-wrapper'>
            <span> {getFormattedAnswer(conversionAnswer,currencyList)} </span>
          </div>
          : null
        }
      </div>

    </div>
  )
}
export default Converter