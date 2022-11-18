type Props = {
  title: string
  description: string
  imgSrc: string
  imgAlt: string
}

export const Card = ({ title, description, imgSrc, imgAlt }: Props) => {
  return (
    <div className="max-w-sm rounded-md overflow-hidden shadow-lg group bg-white">
      <div className="overflow-hidden">
        <img
          className="w-full group-hover:scale-110 transition-transform duration-500"
          src={imgSrc}
          alt={imgAlt}
        />
      </div>
      <div className="px-6 py-4">
        <div className="text-gray-700 font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-500 text-base">{description}</p>
      </div>
    </div>
  )
}
