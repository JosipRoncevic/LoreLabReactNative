import { useMemo, useState } from "react";
import { StoryRepository } from "../../data/repository/StoryRepository";
import { StoryService } from "../../data/services/StoryServices";

export function useCreateStoryViewModel() {
  const repository = useMemo(
    () => new StoryRepository(new StoryService()),
    []
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createStory(
  title: string,
  content: string,
  worldId: string | null,
  characterIds: string[] = []
) {
  try {
    setLoading(true);
    setError(null);
    await repository.createStory(title, content, worldId, characterIds);
  } catch (e) {
    setError(e instanceof Error ? e.message : "Unknown error");
    throw e;
  } finally {
    setLoading(false);
  }
}

async function updateStory(
  storyId: string,
  title: string,
  content: string,
  worldId: string | null,
  characterIds: string[] = []
) {
  try {
    setLoading(true);
    setError(null);
    await repository.editStory(storyId, title, content, worldId, characterIds);
  } catch (e) {
    setError(e instanceof Error ? e.message : "Unknown error");
    throw e;
  } finally {
    setLoading(false);
  }
}

  return {
    createStory,
    updateStory,
    loading,
    error,
  };
}