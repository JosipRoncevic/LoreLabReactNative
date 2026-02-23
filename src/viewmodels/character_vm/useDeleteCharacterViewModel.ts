import { useMemo, useState } from "react";
import { CharacterRepository } from "../../data/repository/CharacterRepository";
import { CharacterService } from "../../data/services/CharacterService";


export function useDeleteCharacterViewModel() {
  const repository = useMemo(
    () => new CharacterRepository(new CharacterService()),
    []
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function deleteCharacter(characterId: string) {
    try {
      setLoading(true);
      setError(null);
      await repository.deleteCharacter(characterId);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete character");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return {
    deleteCharacter,
    loading,
    error,
  };
}