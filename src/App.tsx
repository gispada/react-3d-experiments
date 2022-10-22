import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Scene3D } from './pages/Scene3D'
import { ShipScene3D } from './pages/ShipScene3D'
import './main.css'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/3d" element={<Scene3D />} />
        <Route path="/ship-3d" element={<ShipScene3D />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
