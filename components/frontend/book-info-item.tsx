const BookInfoItem = ({
  title,
  info,
  children,
}: {
  title?: string
  info?: string | number
  children?: React.ReactNode
}) => {
  return (
    <p className="mb-2 xl:mb-4 text-left">
      {title && <span className="font-bold block text-lg">{title}:</span>}{" "}
      {info} {children}
    </p>
  )
}

export default BookInfoItem
