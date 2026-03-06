import { Story } from "../models/Story";
import auth from '@react-native-firebase/auth';
import { StoryService } from "../services/StoryServices";
import { World } from "../models/World";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";


export class StoryRepository {

  constructor(private service: StoryService){}

  async fetchStories(): Promise<Story[]> {
    const user = auth().currentUser;
    if (!user) throw new Error('User not authenticated');

    const data = await this.service.getAllStoriesByUser(user.uid);
    return data as Story[];
  }

  async fetchAllStories(): Promise<Story[]> {
    const data = await this.service.getAllStories();
  
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      userId: item.userId,
      worldRef: item.worldId ?? null,
      createdOn: item.createdOn.toDate(),
      updatedOn: item.updatedOn.toDate(),
    }));
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
      worldRef: data.worldId,
      //characterRefs: data.characterRefs || [],
      createdOn: data.createdOn.toDate(),
      updatedOn: data.updatedOn.toDate(),
    };
  }

  async createStory(title: string, content: string, worldId: string | null): Promise<void> {
    const user = auth().currentUser;
    if (!user) throw new Error("User not authenticated");

    const worldRef = worldId ? firestore().collection("worlds").doc(worldId): null;

    await this.service.addStory({
      title,
      content,
      userId: user.uid,
      worldId: worldRef ?? null,
    });
  }

  async editStory(
    storyId: string,
    title: string,
    content: string,
    worldId: string | null
  ): Promise<void> {
  const worldRef = worldId
    ? firestore().collection("worlds").doc(worldId)
    : null;

    await this.service.updateStory(storyId, {
      title,
      content,
      worldId: worldRef ?? null,
    });
  }

  async deleteStory(storyId: string): Promise<void> {
    await this.service.deleteStory(storyId);
  }

    async getStoryWithWorld(storyId: string): Promise<Story> {
  const doc = await this.service.getStoryById(storyId);
  const data = doc.data();

  if (!data) throw new Error("Story not found");

  let world: World | null = null;

  if (data.worldId) {
    const worldSnap = await data.worldId.get();
    if (worldSnap.exists) {
      const worldData = worldSnap.data()!;
      world = {
      id: worldSnap.id,
      name: worldData.name,
      description: worldData.description,
      userId: worldData.userId,
      createdOn: worldData.createdOn.toDate(),
      updatedOn: worldData.updatedOn.toDate(),
    };
    }
  }

  return {
    id: doc.id,
    title: data.title,
    content: data.content,
    userId: data.userId,
    worldRef: data.worldId,
    world,
    //characterRefs:data.characterRefs ?? [],
    createdOn: data.createdOn.toDate(),
    updatedOn: data.updatedOn.toDate(),
  };
}

async fetchStoriesByWorld(worldId: string): Promise<Story[]> {
  const worldRef = firestore().collection('worlds').doc(worldId);

  const data = await this.service.getStoriesByWorld(worldRef);

  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
    content: item.content,
    userId: item.userId,
    worldRef: item.worldId,
    createdOn: item.createdOn.toDate(),
    updatedOn: item.updatedOn.toDate(),
  }));
}

}