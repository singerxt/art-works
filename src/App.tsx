import './App.css'
import { ArtworkFr121 } from "./sketches/fr-121";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from './components/layout/layout';
import { Things } from "@/pages/things.tsx";
import { Name } from "@/sketches/name";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/*" element={<Things />} />
          <Route path="/fr-121" element={<ArtworkFr121 />} />
          <Route path="/name" element={<Name />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
