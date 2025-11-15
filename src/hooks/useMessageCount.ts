import { useCallback, useState } from "react"
import { API_URL } from "../constants/urls"

const useMessageCount = (chatId: number) => {
  const [messagesCount, setMessagesCount] = useState(0)
  const [error, setError] = useState('')
  const fetchMessagesCount = useCallback(async () => {
    const response = await fetch(`${API_URL}/api/messages/count?chatId=${chatId}`)
    if(!response.ok) {
      setError('Error fetching messages count')
    }

    const jsonMessagesResponse = await response.json()
    setMessagesCount(jsonMessagesResponse)
  }, [chatId])

  return {
    messagesCount,
    error,
    fetchMessagesCount
  }
}

export { useMessageCount }