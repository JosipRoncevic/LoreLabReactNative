import { useMemo, useState } from "react";
import { WorldRepository } from "../data/repository/WorldRepository";
import { WorldService } from "../data/services/WorldService";

export function useCreateWorldViewModel() {
  const repository = useMemo(
    () => new WorldRepository(new WorldService()),
    []
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createWorld(name: string, description: string) {
    try {
      setLoading(true);
      setError(null);
      await repository.createWorld(name, description);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function updateWorld(
    worldId: string,
    name: string,
    description: string
  ) {
    try {
      setLoading(true);
      setError(null);
      await repository.editWorld(worldId, name, description);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return {
    createWorld,
    updateWorld,
    loading,
    error,
  };
}