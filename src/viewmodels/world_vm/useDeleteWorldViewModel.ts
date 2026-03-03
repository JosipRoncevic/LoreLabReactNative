import { useMemo, useState } from "react";
import { WorldRepository } from "../../data/repository/WorldRepository";
import { WorldService } from "../../data/services/WorldService";

export function useDeleteWorldViewModel() {
  const repository = useMemo(
    () => new WorldRepository(new WorldService()),
    []
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function deleteWorld(worldId: string) {
    try {
      setLoading(true);
      setError(null);
      await repository.deleteWorld(worldId);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete world");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return {
    deleteWorld,
    loading,
    error,
  };
}