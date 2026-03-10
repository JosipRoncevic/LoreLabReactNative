import { Story } from "../models/Story";
import auth from '@react-native-firebase/auth';
import { StoryService } from "../services/StoryServices";
import { World } from "../models/World";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Character } from "../models/Character";


export class StoryRepository {

  constructor(private service: StoryService){}

  async fetchStories(): Promise<Story[]> {
    const user = auth().currentUser;
  if (!user) throw new Error("User not authenticated");

  const data = await this.service.getAllStoriesByUser(user.uid);
  return Promise.all(
    data.map(async (item: any) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      userId: item.userId,
      worldRef: item.worldId ?? null,
      characterRefs: item.characterRefs ?? [],
      characters: item.characterRefs
  ? (
      await Promise.all(
        item.characterRefs.map(async (ref: FirebaseFirestoreTypes.DocumentReference) => {
          const doc = await ref.get();
          const data = doc.data();
          if (!data) return null; 
          return { id: doc.id, name: data.name ?? "Unnamed" };
        })
      )
    ).filter(Boolean)
  : [],
      createdOn: item.createdOn.toDate(),
      updatedOn: item.updatedOn.toDate(),
    }))
  );
}

async fetchAllStories(): Promise<Story[]> {
  const data = await this.service.getAllStories();

  return Promise.all(
    data.map(async (item: any) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      userId: item.userId,
      worldRef: item.worldId ?? null,
      characterRefs: item.characterRefs ?? [],
      characters: item.characterRefs
  ? (
      await Promise.all(
        item.characterRefs.map(async (ref: FirebaseFirestoreTypes.DocumentReference) => {
          const doc = await ref.get();
          const data = doc.data();
          if (!data) return null; 
          return { id: doc.id, name: data.name ?? "Unnamed" };
        })
      )
    ).filter(Boolean)
  : [],
      createdOn: item.createdOn.toDate(),
      updatedOn: item.updatedOn.toDate(),
    }))
  );
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
      characterRefs: data.characterRefs ?? [],
      createdOn: data.createdOn.toDate(),
      updatedOn: data.updatedOn.toDate(),
    };
  }

  async createStory(
  title: string,
  content: string,
  worldId: string | null,
  characterIds: string[] = []
): Promise<void> {
  const user = auth().currentUser;
  if (!user) throw new Error("User not authenticated");

  const worldRef = worldId
    ? firestore().collection("worlds").doc(worldId)
    : null;

  const characterRefs = characterIds.map(id =>
    firestore().collection("characters").doc(id)
  );

  await this.service.addStory({
    title,
    content,
    userId: user.uid,
    worldId: worldRef,
    characterRefs,
  });
}

async editStory(
  storyId: string,
  title: string,
  content: string,
  worldId: string | null,
  characterIds: string[] = []
): Promise<void> {
  const worldRef = worldId
    ? firestore().collection("worlds").doc(worldId)
    : null;

  const characterRefs = characterIds.map(id =>
    firestore().collection("characters").doc(id)
  );

  await this.service.updateStory(storyId, {
    title,
    content,
    worldId: worldRef,
    characterRefs,
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
  let characters: Character[] = [];

  // ---------- WORLD ----------
  if (data.worldId) {
    try {
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
      } else {
        // world was deleted
        world = null;
      }
    } catch {
      world = null;
    }
  }

  // ---------- CHARACTERS ----------
  if (data.characterRefs && data.characterRefs.length > 0) {
    try {
      const snaps = await Promise.all(
        data.characterRefs.map(
          (ref: FirebaseFirestoreTypes.DocumentReference) => ref.get()
        )
      );

      characters = snaps
        .filter(s => s.exists)
        .map(s => {
          const charData = s.data()!;

          return {
            id: s.id,
            name: charData.name ?? "Unnamed",
            backstory: charData.backstory ?? "",
            userId: charData.userId ?? "",
            worldRef: charData.worldId ?? null,
            createdOn: charData.createdOn.toDate(),
            updatedOn: charData.updatedOn.toDate(),
          };
        });

    } catch {
      characters = [];
    }
  }

  return {
    id: doc.id,
    title: data.title,
    content: data.content,
    userId: data.userId,

    worldRef: data.worldId ?? null,
    world,

    characterRefs: data.characterRefs ?? [],
    characters,

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