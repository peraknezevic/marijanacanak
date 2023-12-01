import prisma from "@/prisma/client"
import ReactMarkdown from "react-markdown"

const Novosti = async () => {
  const novosti = await prisma.novost.findMany()
  return (
    <div>
      <h1>Novosti</h1>
      {novosti.length === 0 && (
        <p className="text-center">Trenutno nema novih objava</p>
      )}
      <ul>
        {novosti.map((item) => (
          <li key={item.id} className="prose lg:prose-xl mx-auto mb-24">
            <h2>{item.naslov}</h2>
            <ReactMarkdown className="text-left">{item.uvod}</ReactMarkdown>
            <ReactMarkdown className="text-left">{item.tekst}</ReactMarkdown>
            {item.link && (
              <p>
                <a href={item.link} className="btn btn-sm">
                  Više informacija
                </a>
              </p>
            )}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Novosti
