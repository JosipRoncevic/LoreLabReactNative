import { useEffect, useState, useCallback } from "react";
import { StoryRepository } from "../../data/repository/StoryRepository";
import { StoryService } from "../../data/services/StoryServices";
import { Story } from "../../data/models/Story";

const repo = new StoryRepository(new StoryService());

export function useWorldStoriesViewModel(worldId: string | null) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!worldId) {
      setStories([]);
      return;
    }

    setLoading(true);
    try {
      const data = await repo.fetchStoriesByWorld(worldId);
      setStories(data);
    } finally {
      setLoading(false);
    }
  }, [worldId]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    stories,
    loading,
    reload: load,
  };
}