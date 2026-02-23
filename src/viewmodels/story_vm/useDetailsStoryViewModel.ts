import { useCallback, useEffect, useMemo, useState } from "react";
import { Story } from "../../data/models/Story";
import { StoryRepository } from "../../data/repository/StoryRepository";
import { StoryService } from "../../data/services/StoryServices";

export function useStoryDetailsViewModel(storyId: string) {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  const repository = useMemo(
    () => new StoryRepository(new StoryService()),
    []
  );

  const fetchStory = useCallback(async () => {
    setLoading(true);
    try {
      const data = await repository.getStory(storyId);
      setStory(data);
    } finally {
      setLoading(false);
    }
  }, [repository, storyId]);

  useEffect(() => {
    fetchStory();
  }, [fetchStory]);

  return {
    story,
    loading,
    reload: fetchStory,
  };
}