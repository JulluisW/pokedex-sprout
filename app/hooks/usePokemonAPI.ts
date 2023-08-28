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

  const getPokemonDetail = async (name: string): Promise<any> => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
      return res.json();
    } catch (error) {
      return error;
    }
  };

  const getPokemonSpecies = async (id: number): Promise<any> => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}/`
      );
      return res.json();
    } catch (error) {
      return error;
    }
  };

  const formatNumberToCode = (number: number) => {
    const formattedNumber = number.toString().padStart(3, "0");
    return `#${formattedNumber}`;
  };

  return {
    getPokemons,
    getPokemonDetail,
    getPokemonSpecies,
    formatNumberToCode,
  };
}
