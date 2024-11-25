import './App.css'
import { ArtworkFr121 } from "./sketches/fr-121";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from './components/layout/layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/*" element={<ArtworkFr121 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
