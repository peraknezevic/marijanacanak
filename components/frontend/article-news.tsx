const NewsArticle = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="prose lg:prose-xl mx-auto mb-8 xl:mb-24">
      {children}
    </article>
  )
}

export default NewsArticle
