import { API_URL } from "../constants/urls"

const useUploadProfile = async (formData: FormData) => {
  const res = await fetch(`${API_URL}/api/user/image`, {
    method: 'POST',
    body: formData
  })

  if(!res.ok) {
    throw new Error('cannot upload profile')
  }

  return true
}

export { useUploadProfile }