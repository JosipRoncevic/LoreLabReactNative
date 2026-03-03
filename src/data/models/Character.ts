import { DocumentReference } from "@react-native-firebase/app/lib/internal/web/firebaseFirestore";
import { World } from "./World";

export interface Character {
  id: string;
  name: string;
  backstory:string;
  userId: string;
  worldRef: DocumentReference;
  world?: World | null;
  createdOn: Date;
  updatedOn: Date;
}