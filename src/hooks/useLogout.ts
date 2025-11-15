import { client } from "../constants/apollo-clients"
import { API_URL } from "../constants/urls"

const useLogout = () => {
  const logout = async () => {
    await fetch(`${API_URL}/api/auth/logout`, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST'
    })

    client.resetStore()
  }

  return { logout }
}

export { useLogout }