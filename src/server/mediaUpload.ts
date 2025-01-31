"use server"

import axios from "axios"

export async function uploadMedia(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)

  try {
    const response = await axios.post("https://localhost:7194/api/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    if (response.status !== 200) {
      throw new Error(`Upload failed with status ${response.status}`)
    }

    return response.data.url
  } catch (error) {
    console.error("Error uploading file:", error)
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Upload failed: ${error.response.data}`)
    } else {
      throw new Error("Upload failed: Unknown error")
    }
  }
}

