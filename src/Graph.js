import { useEffect, useState } from 'react'
import { getRequestURL } from './rest/utils'

const Graph = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [shouldRefetch, setShouldRefetch] = useState(false)

  // this useEffect runs once when the component mounts
  useEffect(() => {
    setLoading(true)
    fetch(getRequestURL('latest'))
      .then((response) => {
        setLoading(false)
        setData(response.data)
        console.log('fetched from initial load')
        console.log(response)
      })
      .catch(err => {
        setError(err)
        console.error(err)
      })
  })

  // this useEffect runs when the piece of state 'refetch' changes and also on initial load but ONLY IF shouldRefetch is already true
  useEffect(() => {
    if (shouldRefetch) {
      setShouldRefetch(false)
      setLoading(true)
      setError(null)
      fetch(getRequestURL('latest'))
        .then((response) => {
          setLoading(false)
          setData(response.data)
          console.log('fetched from the button press')
          console.log(response)
        })
        .catch(err => {
          setError(err)
          console.error(err)
        })
    }
//This is called a 'dependency array' and when something in this array's value changes, this function gets run again
  }, [shouldRefetch])
  const refetch = () => setShouldRefetch(true)
  return  (
    <>
    <button onClick={refetch}>
      Click here to refetch
    </button>
     <div>
        { loading && !error
          ? 'Loading!!'
          : <div>
            <span>It has loaded</span>
            {data}
          </div> 
        }
        {
          error 
        }
     </div>
    </>
     )
}

export default Graph
