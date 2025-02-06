"use server"

import axios from "axios"
import { API_URL } from "@/model"

export async function uploadFile(file: File): Promise<string | null> {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await axios.post(`${API_URL}/Media/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  } catch (error) {
    console.error("Error uploading file:", error)
    return null
  }
}

