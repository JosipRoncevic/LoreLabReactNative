import { World } from "../models/World";
import { WorldService } from "../services/WorldService";
import auth from '@react-native-firebase/auth';

export class WorldRepository {

  constructor(private service: WorldService){}

  async fetchWorlds(): Promise<World[]> {
    const user = auth().currentUser;
    if (!user) throw new Error('User not authenticated');

    const data = await this.service.getAllWorldsByUser(user.uid);
    return data as World[];
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
