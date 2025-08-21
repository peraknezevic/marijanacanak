"use client"

import { IKImage } from "imagekitio-react"

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT

// Safe Image wrapper to avoid rendering an <img> with empty src
const Image = (props: any) => {
  const { src, path } = props || {}

  // Determine validity (no empty strings or whitespace-only)
  const hasValidSrc =
    typeof src === "string" ? src.trim() !== "" : Boolean(src)
  const hasValidPath =
    typeof path === "string" ? path.trim() !== "" : Boolean(path)

  // If nothing valid to render, avoid rendering entirely
  if (!hasValidSrc && !hasValidPath) return null

  // If using path-based IK URLs but urlEndpoint is missing, avoid rendering
  if (hasValidPath && !urlEndpoint) return null

  // Prepare clean props without invalid src/path (avoid passing empty/undefined)
  const cleanProps: any = { ...props }
  if (!hasValidSrc && "src" in cleanProps) delete cleanProps.src
  if (!hasValidPath && "path" in cleanProps) delete cleanProps.path

  return (
    <IKImage
      urlEndpoint={urlEndpoint}
      lqip={{ active: true, quality: 20 }}
      {...cleanProps}
    />
  )
}

export default Image
