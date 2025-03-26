import axios from "axios"
import { useState } from "react"

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

    async function refreshContent() {
        try {

            
            const response: responseProps = await axios.get("http://localhost:3000/api/v1/content", {
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
        
    }


    return { data, refreshContent, error, isLoading }
}