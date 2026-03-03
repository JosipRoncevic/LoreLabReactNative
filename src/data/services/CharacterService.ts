import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";


export interface CreateCharacterDto {
  name: string;
  backstory: string;
  userId: string;
}

export class CharacterService {
 
  private collection = firestore().collection('characters');

  async getAllCharacters() {
    const snapshot = await this.collection
      .orderBy('createdOn','desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

   async getAllCharactersByUser(userId: string) {
    const snapshot = await this.collection
      .where('userId', '==', userId)
      .orderBy('createdOn','desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

async getCharacterById(
   characterId: string
 ): Promise<FirebaseFirestoreTypes.DocumentSnapshot> {
   return firestore()
     .collection('characters')
     .doc(characterId)
     .get();
 }

 async addCharacter(data: CreateCharacterDto): Promise<void> {
  await this.collection.add({
    ...data,
    createdOn: firestore.FieldValue.serverTimestamp(),
    updatedOn: firestore.FieldValue.serverTimestamp(),
  });
}

async updateCharacter(
    characterId: string,
    data: {
      name: string;
      backstory: string;
    }
  ): Promise<void> {
    await this.collection.doc(characterId).update({
      name: data.name,
      backstory: data.backstory,
      updatedOn: firestore.FieldValue.serverTimestamp(),
    });
  }

  async deleteCharacter(characterId: string): Promise<void> {
  await this.collection.doc(characterId).delete();
}

  async getCharactersByWorld(worldRef: FirebaseFirestoreTypes.DocumentReference) {
  const snapshot = await this.collection
    .where('worldId', '==', worldRef)
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

}
