const Article = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="prose lg:prose-xl mx-auto py-8">{children}</article>
  )
}

export default Article
