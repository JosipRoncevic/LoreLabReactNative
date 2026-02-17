import { useState } from "react";
import { Character } from "../../data/models/Character";
import { CharacterRepository } from "../../data/repository/CharacterRepository";
import { CharacterService } from "../../data/services/CharacterService";


export function useCharacterListViewModel() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const repository = new CharacterRepository(new CharacterService());

  async function loadCharacters() {
    try {
      setLoading(true);
      const charactersFromDb = await repository.fetchAllCharacters();
      setCharacters(charactersFromDb);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  }

  

  return {
    characters,
    loading,
    error,
    loadCharacters,
  };
}
