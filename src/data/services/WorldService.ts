import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

export class WorldService {
  
  private collection = firestore().collection('worlds');

  async getAllWorlds() {
    const snapshot = await this.collection
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

   async getAllWorldsByUser(userId: string) {
    const snapshot = await this.collection
      .where('userId', '==', userId)
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


  // static async createWorld(name: string,description: string,): Promise<void> {
  //   const userId = auth().currentUser;
  //   if (userId == null) {
  //       return;
  //   }else{
  //       await firestore().collection.add({
  //     name,
  //     description,
  //     userId,
  //     createdOn: FirebaseFirestoreTypes.FieldValue.serverTimestamp(),
  //     updatedOn: FirebaseFirestoreTypes.FieldValue.serverTimestamp(),
  //   });
  //   }
  // }

  // static async deleteWorld(worldId: string): Promise<void> {
  //   await firestore().collection(COLLECTION).doc(worldId).delete();
  // }
}
