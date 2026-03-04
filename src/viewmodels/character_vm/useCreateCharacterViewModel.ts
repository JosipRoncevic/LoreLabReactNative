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

  async function createCharacter(
  name: string,
  backstory: string,
  worldId: string | null
) {
  setLoading(true);
  setError(null);
  try {
    await repository.createCharacter(name, backstory, worldId);
  } finally {
    setLoading(false);
  }
}

async function updateCharacter(
  characterId: string,
  name: string,
  backstory: string,
  worldId: string | null
) {
  setLoading(true);
  setError(null);
  try {
    await repository.editCharacter(characterId, name, backstory, worldId);
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