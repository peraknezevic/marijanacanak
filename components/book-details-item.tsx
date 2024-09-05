const BookDetailsItem = ({
  title,
  info,
}: {
  title: string
  info: string | number
}) => {
  return (
    <p className="mb-4 text-lg">
      <span>{title}:</span> {info}
    </p>
  )
}

export default BookDetailsItem
