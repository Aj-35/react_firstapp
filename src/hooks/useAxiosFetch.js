import { useEffect, useState } from 'react'
import axios from 'axios'

const useAxiosFetch = (dataURL) => {
    const [data,setdata] = useState([])
    const [fetchError,setFetchEror]=useState(null)
    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {
        let isMounted = true
        const source = axios.CancelToken.source()

        const fetchData = async (URL) => {
            setIsLoading(true)
            try{
                const response = await axios.get(URL,{
                    cancelToken : source.token
                })
                if(isMounted){
                    setdata(response.data)
                    setFetchEror(null)
                }
            }catch(err){
                if(isMounted){
                setFetchEror(err.message)
                setdata([])
                }
            }finally{
                isMounted && setTimeout(() => setIsLoading(false),2000)
            }
        }

        fetchData(dataURL)

        const cleanUp = () => {
            isMounted = false
            source.cancel()
        }

        return cleanUp
    },[dataURL])


  return {data,fetchError,isLoading}
}

export default useAxiosFetch