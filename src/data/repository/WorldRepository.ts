import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { World } from "../models/World";
import { WorldService } from "../services/WorldService";
import auth from '@react-native-firebase/auth';

export class WorldRepository {

  constructor(private service: WorldService){}

  private mapToWorld(data: any): World {
    return {
      id: data.id,
      name: data.name,
      description:data.description,
      userId:data.userId,
      createdOn: data.createdAt.toDate(),
      updatedOn: data.updatedOn.toDate(),
    };
  }

  async fetchWorlds(): Promise<World[]> {
    const user = auth().currentUser;
    if (!user) throw new Error('User not authenticated');

    const data = await this.service.getAllWorldsByUser(user.uid);
    return data as World[];
  }

  async fetchAllWorlds(): Promise<World[]>{
    const data = await this.service.getAllWorlds();
    return data as World[];
  }

  async getWorld(worldId:string): Promise<World> {
    const doc = await this.service.getWorldById(worldId);
    const data = doc.data();

     if (!data) throw new Error('World not found');

     return {
      id: doc.id,
      name: data.name,
      description: data.description,
      userId: data.userId,
      createdOn: data.createdOn.toDate(),
      updatedOn: data.updatedOn.toDate(),
    };
  }

  // async addWorld(
  //   name: string,
  //   description: string,
  // ): Promise<void> {
  //   return WorldService.createWorld(name, description);
  // }

  // async removeWorld(worldId: string): Promise<void> {
  //   return WorldService.deleteWorld(worldId);
  // }
}
