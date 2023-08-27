export default function usePokemonAPI() {
  const getPokemons = async (offset: number, limit: number): Promise<any> => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
      );
      return res.json();
    } catch (error) {
      return error;
    }
  };

  const getPokemonDetail = async (name:string): Promise<any> => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}/`
      );
      return res.json();
    } catch (error) {
      return error
    }
  }

  return {
    getPokemons,
    getPokemonDetail
  };
}
