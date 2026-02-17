// viewmodels/useWorldDetailsViewModel.ts
import { useCallback, useEffect, useMemo, useState } from "react";
import { Character } from "../../data/models/Character";
import { CharacterRepository } from "../../data/repository/CharacterRepository";
import { CharacterService } from "../../data/services/CharacterService";

export function useCharacterDetailsViewModel(characterId: string) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  const repository = useMemo(
  () => new CharacterRepository(new CharacterService()),
  []
);
    const fetchCharacter = useCallback(async () => {
    setLoading(true);
    try {
      const data = await repository.getCharater(characterId);
      setCharacter(data);
    } finally {
      setLoading(false);
    }
  }, [repository, characterId]);

  useEffect(() => {
    fetchCharacter();
  }, [fetchCharacter]);

  return {
    character,
    loading,
    reload: fetchCharacter,
  };
}