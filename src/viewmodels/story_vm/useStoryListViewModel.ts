import { useState } from "react";
import { Story } from "../../data/models/Story";
import { StoryRepository } from "../../data/repository/StoryRepository";
import { StoryService } from "../../data/services/StoryServices";

export function useStoryListViewModel() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const repository = new StoryRepository(new StoryService());

  async function loadStories() {
    try {
      setLoading(true);
      const storiesFromDb = await repository.fetchStories();
      setStories(storiesFromDb);
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
    stories,
    loading,
    error,
    loadStories,
  };
}