import axios from "axios"
import { useCallback, useState } from "react"
import dotenv from "dotenv"
dotenv.config()


const BACKEND_URL = process.env.BACKEND_URL

interface contentTypeProps {
    title: string,
    link: string,
    type: 'instagram' | 'twitter' | 'youtube' | 'document' | 'link',
    description: string
}

interface contentProps {
    content: Array<contentTypeProps>
}

interface responseProps {
    data: contentProps
}

export function useContent() {

    const [data, setData] = useState<Array<contentTypeProps>>([])
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshContent = useCallback(async () =>{
        try {

            
            const response: responseProps = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                withCredentials: true
            })

            if (response.data.content != undefined) {
                setData(response.data.content)
                setIsLoading(false)
            }
        }
        catch (e) {
            setError("failed to fetch content")
            console.log(e)
        }
        finally{

            setIsLoading(false)
        }
        
    }, []) 


    return { data, refreshContent, error, isLoading }
}