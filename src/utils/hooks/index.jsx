import { useState, useEffect } from 'react'

export function useFetch(url) {

  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [erreur, setErreur] = useState(false)

  useEffect(() => {
    if (!url) return

    setIsLoading(true)
    async function fetchData() {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setData(data)
      } catch (error) {
          console.log('------ erreur ------', error);
          setErreur(true)
      } finally {
          setIsLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { isLoading, data, erreur}
}


