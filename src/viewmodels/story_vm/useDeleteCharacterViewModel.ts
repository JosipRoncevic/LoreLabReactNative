import { useMemo, useState } from "react";
import { StoryRepository } from "../../data/repository/StoryRepository";
import { StoryService } from "../../data/services/StoryServices";

export function useDeleteStoryViewModel() {
  const repository = useMemo(
    () => new StoryRepository(new StoryService()),
    []
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function deleteStory(storyId: string) {
    try {
      setLoading(true);
      setError(null);
      await repository.deleteStory(storyId);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete story");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return {
    deleteStory,
    loading,
    error,
  };
}