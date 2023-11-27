import dynamic from "next/dynamic"

const TekstForma = dynamic(
  () => import("@/app/admin/price/components/TekstForma"),
  {
    ssr: false,
  }
)

const NoviTekst = () => {
  return <TekstForma />
}

export default NoviTekst
