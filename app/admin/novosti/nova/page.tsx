import dynamic from "next/dynamic"

const NovostForma = dynamic(
  () => import("@/app/admin/novosti/components/NovostForma"),
  {
    ssr: false,
  }
)

const NovaNovost = () => {
  return <NovostForma />
}

export default NovaNovost
