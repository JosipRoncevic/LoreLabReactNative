import { useState } from "react";
import { World } from "../data/models/World";
import { WorldRepository } from "../data/repository/WorldRepository";
import { WorldService } from "../data/services/WorldService";

export function useWorldListViewModel() {
  const [worlds, setWorlds] = useState<World[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const repository = new WorldRepository(new WorldService());

  async function loadWorlds() {
    try {
      setLoading(true);
      const worldsFromDb = await repository.fetchWorlds();
      setWorlds(worldsFromDb);
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
    worlds,
    loading,
    error,
    loadWorlds,
    //deleteWorld,
  };
}
