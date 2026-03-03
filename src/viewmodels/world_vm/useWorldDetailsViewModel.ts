import { useCallback, useEffect, useMemo, useState } from "react";
import { World } from "../../data/models/World";
import { WorldRepository } from "../../data/repository/WorldRepository";
import { WorldService } from "../../data/services/WorldService";
import { Character } from "../../data/models/Character";

export function useWorldDetailsViewModel(worldId: string) {
  const [world, setWorld] = useState<World | null>(null);
  const [loading, setLoading] = useState(true);

  const repository = useMemo(
  () => new WorldRepository(new WorldService()),
  []
);

    const fetchWorld = useCallback(async () => {
    setLoading(true);
    try {
      const data = await repository.getWorld(worldId);
      setWorld(data);
    } finally {
      setLoading(false);
    }
  }, [repository, worldId]);

  useEffect(() => {
    fetchWorld();
  }, [fetchWorld]);

  return {
    world,
    loading,
    reload: fetchWorld,
  };
}