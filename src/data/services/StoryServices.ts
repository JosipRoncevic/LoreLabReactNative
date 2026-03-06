import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";


export interface CreateStoryDto {
  title: string;
  content: string;
  userId: string;
  worldId?: FirebaseFirestoreTypes.DocumentReference | null; 
  characterRefs?: FirebaseFirestoreTypes.DocumentReference[];
}

export class StoryService {
 
  private collection = firestore().collection('stories');

  async getAllStories() {
    const snapshot = await this.collection
      .orderBy('createdOn','desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

   async getAllStoriesByUser(userId: string) {
    const snapshot = await this.collection
      .where('userId', '==', userId)
      .orderBy('createdOn','desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

async getStoryById(
   storyId: string
 ): Promise<FirebaseFirestoreTypes.DocumentSnapshot> {
   return firestore()
     .collection('stories')
     .doc(storyId)
     .get();
 }

 async addStory(data: CreateStoryDto): Promise<void> {
  await this.collection.add({
    ...data,
    characterRefs: data.characterRefs ?? [],
    createdOn: firestore.FieldValue.serverTimestamp(),
    updatedOn: firestore.FieldValue.serverTimestamp(),
  });
}

async updateStory(
  storyId: string,
  data: {
    title: string;
    content: string;
    worldId?: FirebaseFirestoreTypes.DocumentReference | null;
    characterRefs?: FirebaseFirestoreTypes.DocumentReference[];
  }
): Promise<void> {
  await this.collection.doc(storyId).update({
    title: data.title,
    content: data.content,
    worldId: data.worldId ?? null,
    characterRefs: data.characterRefs ?? [],
    updatedOn: firestore.FieldValue.serverTimestamp(),
  });
}

  async deleteStory(storyId: string): Promise<void> {
  await this.collection.doc(storyId).delete();
}

  async getStoriesByWorld(worldRef: FirebaseFirestoreTypes.DocumentReference) {
  const snapshot = await this.collection
    .where('worldId', '==', worldRef)
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

}
