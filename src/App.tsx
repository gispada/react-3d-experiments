import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FrigateScene3D } from './pages/3dSceneFrigate'
import { ShowroomScene3D } from './pages/3dSceneShowroom'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import './main.css'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showroom-3d" element={<ShowroomScene3D />} />
        <Route path="/frigate-3d" element={<FrigateScene3D />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
