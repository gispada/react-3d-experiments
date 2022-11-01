import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-hero h-screen bg-cover flex items-center">
      <div className="container mx-auto bg-gray-200 rounded-xl p-8 bg-opacity-75">
        <h1 className="text-3xl text-gray-700 font-bold mb-5">React 3D</h1>
        <p className="text-gray-500 text-lg mb-5">
          3D experiments with 3D with <strong>three.js</strong> and
          <strong> react-three</strong>
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('ship-3d')}
        >
          Start
        </button>
      </div>
    </div>
  )
}
