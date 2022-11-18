import { Link } from 'react-router-dom'
import { Card } from '../../components/Card'
import frigateSceneImg from '../../images/frigate-scene.jpg'

const scenes = [
  {
    title: '17th Century Frigate',
    description: 'Get on board and explore a 17th century frigate on the high seas.',
    imgUrl: frigateSceneImg,
    url: 'ship-3d'
  }
]

export const Home = () => {
  return (
    <div className="h-screen bg-slate-50">
      <div className="container mx-auto px-8 py-16">
        <h1 className="text-4xl text-gray-700 font-bold mb-5">React 3D Experiments</h1>
        <p className="text-gray-500 text-lg mb-5">
          Exploring <span className="font-bold">three.js</span> and
          <span className="font-bold"> react-three-fiber</span> to create 3D experiences
          in React applications.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenes.map(({ title, description, url, imgUrl }) => (
            <Link key={url} to={url}>
              <Card
                title={title}
                description={description}
                imgSrc={imgUrl}
                imgAlt={title}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
