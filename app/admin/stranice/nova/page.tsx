import dynamic from "next/dynamic"

const StranicaForma = dynamic(
  () => import("@/app/admin/stranice/components/StranicaForma"),
  {
    ssr: false,
  }
)

const NovaStranica = () => {
  return <StranicaForma />
}

export default NovaStranica
