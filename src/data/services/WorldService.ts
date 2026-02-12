import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";


export interface CreateWorldDto {
  name: string;
  description: string;
  userId: string;
}

export class WorldService {
 
  private collection = firestore().collection('worlds');

  async getAllWorlds() {
    const snapshot = await this.collection
      .orderBy('createdOn','desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

   async getAllWorldsByUser(userId: string) {
    const snapshot = await this.collection
      .where('userId', '==', userId)
      .orderBy('createdOn','desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

async getWorldById(
   worldId: string
 ): Promise<FirebaseFirestoreTypes.DocumentSnapshot> {
   return firestore()
     .collection('worlds')
     .doc(worldId)
     .get();
 }

 async addWorld(data: CreateWorldDto): Promise<void> {
  await this.collection.add({
    ...data,
    createdOn: firestore.FieldValue.serverTimestamp(),
    updatedOn: firestore.FieldValue.serverTimestamp(),
  });
}

async updateWorld(
    worldId: string,
    data: {
      name: string;
      description: string;
    }
  ): Promise<void> {
    await this.collection.doc(worldId).update({
      name: data.name,
      description: data.description,
      updatedOn: firestore.FieldValue.serverTimestamp(),
    });
  }

  async deleteWorld(worldId: string): Promise<void> {
  await this.collection.doc(worldId).delete();
}

}
