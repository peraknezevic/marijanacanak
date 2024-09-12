export const imageKitLoader = ({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) => {
  if (src[0] === "/") src = src.slice(1)
  const params = [`w-${width}`]
  if (quality) {
    params.push(`q-${quality}`)
  }
  const paramsString = params.join(",")
  var urlEndpoint = "https://ik.imagekit.io/tkrwfvazw"
  if (urlEndpoint[urlEndpoint.length - 1] === "/")
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1)
  return `${urlEndpoint}/${src}?tr=${paramsString}`
}
