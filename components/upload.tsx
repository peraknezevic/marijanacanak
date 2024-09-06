"use client"

import { IKUpload, ImageKitProvider } from "imagekitio-next"

import { useState } from "react"

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY
const authenticator = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/upload-auth")

    if (!res.ok) {
      throw new Error("Request failed" + res.text())
    }

    const data = await res.json()

    const { signature, expire, token } = data

    return { signature, expire, token }
  } catch (error) {
    throw new Error("Authentication request failed")
  }
}

const onError = (err: any) => {
  console.log("Error", err)
}

const onProgress = (progress: any) => {
  console.log("Progress", progress)
}

const Upload = () => {
  const [imageUrl, setImageUrl] = useState("")
  const onSuccess = (res: any) => {
    console.log("Success", res)

    setImageUrl(res.url)
  }
  return (
    <>
      <ImageKitProvider
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        <IKUpload
          useUniqueFileName
          onError={onError}
          onSuccess={onSuccess}
          onProgress={onProgress}
          folder={"/marijanacanak/slike/novosti"}
        />
      </ImageKitProvider>
      {imageUrl && <p>{imageUrl}</p>}
    </>
  )
}

export default Upload
