import { World } from "../models/World";
import auth from '@react-native-firebase/auth';
import { CharacterService } from "../services/CharacterService";
import { Character } from "../models/Character";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";


export class CharacterRepository {

  constructor(
    private service: CharacterService,
  ) {}

  async fetchCharacters(): Promise<Character[]> {
  const user = auth().currentUser;
  if (!user) throw new Error("User not authenticated");

  const data = await this.service.getAllCharactersByUser(user.uid);

  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    backstory: item.backstory,
    userId: item.userId,
    worldRef: item.worldId ?? null,
    createdOn: item.createdOn.toDate(),
    updatedOn: item.updatedOn.toDate(),
  }));
}

  async fetchAllCharacters(): Promise<Character[]> {
  const data = await this.service.getAllCharacters();

  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    backstory: item.backstory,
    userId: item.userId,
    worldRef: item.worldId ?? null,
    createdOn: item.createdOn.toDate(),
    updatedOn: item.updatedOn.toDate(),
  }));
}

async getCharacterWithWorld(characterId: string): Promise<Character> {
  const doc = await this.service.getCharacterById(characterId);
  const data = doc.data();

  if (!data) {
    throw new Error("Character not found");
  }

  let world: World | null = null;

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
        world = null;
      }
    } catch (error) {
      world = null;
    }
  }

  return {
    id: doc.id,
    name: data.name,
    backstory: data.backstory,
    userId: data.userId,
    worldRef: data.worldId ?? null,
    world,
    createdOn: data.createdOn.toDate(),
    updatedOn: data.updatedOn.toDate(),
  };
}

   async getCharacter(characterId:string): Promise<Character> {
     const doc = await this.service.getCharacterById(characterId);
     const data = doc.data();

      if (!data) throw new Error('Character not found');

      return {
       id: doc.id,
       name: data.name,
       backstory: data.backstory,
       userId: data.userId,
       worldRef:data.worldId,
       createdOn: data.createdOn.toDate(),
       updatedOn: data.updatedOn.toDate(),
     };
   }

async createCharacter(
  name: string,
  backstory: string,
  worldId: string | null
): Promise<void> {
  const user = auth().currentUser;
  if (!user) throw new Error("User not authenticated");

  const worldRef = worldId
    ? firestore().collection("worlds").doc(worldId)
    : null;

  await this.service.addCharacter({
    name,
    backstory,
    userId: user.uid,
    worldId: worldRef ?? null,
  });
}

  async editCharacter(
  characterId: string,
  name: string,
  backstory: string,
  worldId: string | null
): Promise<void> {
  const worldRef = worldId
    ? firestore().collection("worlds").doc(worldId)
    : null;

  await this.service.updateCharacter(characterId, {
    name,
    backstory,
    worldId: worldRef ?? null,
  });
}

  async deleteCharacter(characterId: string): Promise<void> {
  await this.service.deleteCharacter(characterId);
  }

  async fetchCharactersByWorld(worldId: string): Promise<Character[]> {
  const worldRef = firestore().collection('worlds').doc(worldId);

  const data = await this.service.getCharactersByWorld(worldRef);

  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    backstory: item.backstory,
    userId: item.userId,
    worldRef: item.worldId,
    createdOn: item.createdOn.toDate(),
    updatedOn: item.updatedOn.toDate(),
  }));
}
}
