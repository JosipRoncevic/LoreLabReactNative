// viewmodels/useWorldDetailsViewModel.ts
import { useEffect, useMemo, useState } from "react";
import { World } from "../data/models/World";
import { WorldRepository } from "../data/repository/WorldRepository";
import { WorldService } from "../data/services/WorldService";

export function useWorldDetailsViewModel(worldId: string) {
  const [world, setWorld] = useState<World | null>(null);
  const [loading, setLoading] = useState(true);

  const repository = useMemo(
  () => new WorldRepository(new WorldService()),
  []
);
  useEffect(() => {
    repository.getWorld(worldId)
      .then(setWorld)
      .finally(() => setLoading(false));
  }, [worldId]);

  return {
    world,
    loading,
  };
}