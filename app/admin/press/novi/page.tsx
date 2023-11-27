import dynamic from "next/dynamic"

const PressForma = dynamic(
  () => import("@/app/admin/press/components/PressForma"),
  {
    ssr: false,
  }
)

const NoviPress = () => {
  return <PressForma />
}

export default NoviPress
