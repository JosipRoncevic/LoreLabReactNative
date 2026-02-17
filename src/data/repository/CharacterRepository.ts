import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { World } from "../models/World";
import { WorldService } from "../services/WorldService";
import auth from '@react-native-firebase/auth';
import { CharacterService } from "../services/CharacterService";
import { Character } from "../models/Character";

export class CharacterRepository {

  constructor(private service: CharacterService){}

  async fetchCharacters(): Promise<Character[]> {
    const user = auth().currentUser;
    if (!user) throw new Error('User not authenticated');

    const data = await this.service.getAllCharactersByUser(user.uid);
    return data as Character[];
  }

  async fetchAllCharacters(): Promise<Character[]>{
    const data = await this.service.getAllCharacters();
    return data as Character[];
  }

   async getCharater(characterId:string): Promise<Character> {
     const doc = await this.service.getCharacterById(characterId);
     const data = doc.data();

      if (!data) throw new Error('Character not found');

      return {
       id: doc.id,
       name: data.name,
       backstory: data.backstory,
       userId: data.userId,
       worldRef:data.worldRef,
       createdOn: data.createdOn.toDate(),
       updatedOn: data.updatedOn.toDate(),
     };
   }

  async createCharacter(name: string, backstory: string): Promise<void> {
  const user = auth().currentUser;
  if (!user) throw new Error("User not authenticated");

  await this.service.addCharacter({
    name,
    backstory,
    userId: user.uid,
  });
  }

  async editCharacter(
    characterId: string,
    name: string,
    backstory: string
  ): Promise<void> {
    if (!name.trim()) {
      throw new Error("Character name cannot be empty");
    }

    await this.service.updateCharacter(characterId, {
      name,
      backstory,
    });
  }

  async deleteCharacter(characterId: string): Promise<void> {
  await this.service.deleteCharacter(characterId);
  }
}
