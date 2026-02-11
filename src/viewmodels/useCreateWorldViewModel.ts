import { useMemo, useState } from "react";
import { WorldRepository } from "../data/repository/WorldRepository";
import { WorldService } from "../data/services/WorldService";
import { useWorldListViewModel } from "./useWorldListViewModel";

export function useCreateWorldViewModel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const repository = useMemo(
    () => new WorldRepository(new WorldService()),
    []
  );

  async function createWorld(
    name: string,
    description: string
  ): Promise<void> {
    try {
      setLoading(true);
      setError(null);

      await repository.createWorld(name, description);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unknown error");
      }
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return {
    createWorld,
    loading,
    error,
  };
}