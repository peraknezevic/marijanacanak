"use client"

import { IKImage } from "imagekitio-next"

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT

const Image = (props) => (
  <IKImage
    urlEndpoint={urlEndpoint}
    lqip={{ active: true, quality: 20 }}
    {...props}
  />
)

export default Image
