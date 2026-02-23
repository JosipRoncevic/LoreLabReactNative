import { useMemo, useState } from "react";
import { CharacterRepository } from "../../data/repository/CharacterRepository";
import { CharacterService } from "../../data/services/CharacterService";

export function useCreateCharacterViewModel() {
  const repository = useMemo(
    () => new CharacterRepository(new CharacterService()),
    []
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createCharacter(name: string, backstory: string) {
    try {
      setLoading(true);
      setError(null);
      await repository.createCharacter(name, backstory);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function updateCharacter(
    characterId: string,
    name: string,
    backstory: string
  ) {
    try {
      setLoading(true);
      setError(null);
      await repository.editCharacter(characterId, name, backstory);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return {
    createCharacter,
    updateCharacter,
    loading,
    error,
  };
}