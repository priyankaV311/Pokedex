
import { Routes ,Route } from "react-router-dom";
import Pokedex from "../componets/Pokedex/Pokedex";
import PokedexDetail from "../componets/PokemonDetail/PokemonDetail";

const CustomRoutes = () => {
    return (
      <Routes>
          <Route path="/" element={<Pokedex/>} />
          <Route path="/pokemon/:id" element={< PokedexDetail/>} />
      </Routes>
    )
  }
  
  export default CustomRoutes