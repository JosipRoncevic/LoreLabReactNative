import { useEffect, useState, useCallback } from "react";
import { CharacterRepository } from "../../data/repository/CharacterRepository";
import { CharacterService } from "../../data/services/CharacterService";
import { Character } from "../../data/models/Character";

const repo = new CharacterRepository(new CharacterService());

export function useWorldCharactersViewModel(worldId: string | null) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!worldId) {
      setCharacters([]);
      return;
    }

    setLoading(true);
    try {
      const data = await repo.fetchCharactersByWorld(worldId);
      setCharacters(data);
    } finally {
      setLoading(false);
    }
  }, [worldId]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    characters,
    loading,
    reload: load,
  };
}