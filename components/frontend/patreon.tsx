const Patreon = ({ text }: { text: string }) => {
  return (
    <div className="grow text-center mt-8 lg:my-4 xl:my-0">
      <p>
        <a
          className="inline-block my-4 py-1 px-4 text-slate-100 font-medium bg-patreon uppercase tracking-wide hover:opacity-75 cursor-pointer hover:text-slate-100"
          href="https://www.patreon.com/MarijanaCanak"
        >
          {text}
        </a>
      </p>
    </div>
  )
}

export default Patreon
