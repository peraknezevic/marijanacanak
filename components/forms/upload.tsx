"use client"

import { IKUpload, ImageKitProvider } from "imagekitio-next"

import Button from "../ui/button"
import { useCopyToClipboard } from "usehooks-ts"
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
  const [copiedText, copy] = useCopyToClipboard()
  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        console.log("Copied!", { text })
      })
      .catch((error) => {
        console.error("Failed to copy!", error)
      })
      .finally(() => {
        setImageUrl("")
      })
  }
  const onSuccess = (res: any) => {
    console.log("Success", res)

    setImageUrl(res.name)
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
          folder={"/marijanacanak/slike/vesti"}
        />
        {imageUrl && (
          <Button
            onClick={handleCopy(imageUrl)}
            type="small"
            title="kopiraj sliku"
            button
          />
        )}
      </ImageKitProvider>
    </>
  )
}

export default Upload
