import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Story } from "../models/Story";
import auth from '@react-native-firebase/auth';
import { StoryService } from "../services/StoryServices";

export class StoryRepository {

  constructor(private service: StoryService){}

  async fetchStories(): Promise<Story[]> {
    const user = auth().currentUser;
    if (!user) throw new Error('User not authenticated');

    const data = await this.service.getAllStoriesByUser(user.uid);
    return data as Story[];
  }

  async fetchAllStories(): Promise<Story[]>{
    const data = await this.service.getAllStories();
    return data as Story[];
  }

  async getStory(storyId: string): Promise<Story> {
    const doc = await this.service.getStoryById(storyId);
    const data = doc.data();

    if (!data) throw new Error('Story not found');

    return {
      id: doc.id,
      title: data.title,
      content: data.content,
      userId: data.userId,
      worldRef: data.worldRef,
      characterRefs: data.characterRefs || [],
      createdOn: data.createdOn.toDate(),
      updatedOn: data.updatedOn.toDate(),
    };
  }

  async createStory(title: string, content: string): Promise<void> {
    const user = auth().currentUser;
    if (!user) throw new Error("User not authenticated");

    await this.service.addStory({
      title,
      content,
      userId: user.uid,
    });
  }

  async editStory(
    storyId: string,
    title: string,
    content: string
  ): Promise<void> {
    if (!title.trim()) {
      throw new Error("Story title cannot be empty");
    }

    await this.service.updateStory(storyId, {
      title,
      content,
    });
  }

  async deleteStory(storyId: string): Promise<void> {
    await this.service.deleteStory(storyId);
  }
}