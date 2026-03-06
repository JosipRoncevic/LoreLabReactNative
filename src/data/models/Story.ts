import { DocumentReference } from "@react-native-firebase/app/lib/internal/web/firebaseFirestore";
import { World } from "./World";
import { Character } from "./Character";

export interface Story {
  id: string;
  title: string;
  content:string;
  userId: string;
  worldRef: DocumentReference;
  world?: World | null;
  characterRefs?: DocumentReference[];
  characters?: Character[];
  createdOn: Date;
  updatedOn: Date;
}