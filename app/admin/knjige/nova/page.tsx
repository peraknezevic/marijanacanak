import dynamic from "next/dynamic"

const KnjigaForma = dynamic(
  () => import("@/app/admin/knjige/components/KnjigaForma"),
  {
    ssr: false,
  }
)

const NovaKnjiga = () => {
  return <KnjigaForma />
}

export default NovaKnjiga
