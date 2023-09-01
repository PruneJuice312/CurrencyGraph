import { useEffect, useState } from 'react'
import { getRequestURL } from './rest/utils'

const Graph = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const queryParams = {
    base: 'USD',
    start_date: '1997-03-03',
    end_date: '1998-03-03'
  }
  // this useEffect runs once when the component mounts\
  useEffect(() => {
    if (shouldRefetch){
      setShouldRefetch(false)
      setLoading(true)
      fetch(getRequestURL('timeseries',queryParams))
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
    }
  },[shouldRefetch])
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
