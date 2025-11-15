import { useCallback, useState } from "react"
import { API_URL } from "../constants/urls"

const useChatsCount = () => {
  const [totalChats, setTotalChats] = useState(0)
  const [error, setError] = useState('')

  const fetchTotalChats = useCallback(async () => {
    const res = await fetch(`${API_URL}/api/chats/count`)
    if(!res.ok) {
      setError('Error fetching chats total')
    }
    const data = await res.json()
    setTotalChats(data)
  }, [])

  return {
    error,
    totalChats,
    fetchTotalChats
  }
}

export {
  useChatsCount
}