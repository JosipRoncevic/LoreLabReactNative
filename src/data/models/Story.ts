import { DocumentReference } from "@react-native-firebase/app/lib/internal/web/firebaseFirestore";
import { World } from "./World";

export interface Story {
  id: string;
  title: string;
  content:string;
  userId: string;
  worldRef: DocumentReference;
  world?: World | null;
  //characterRefs: DocumentReference[];
  createdOn: Date;
  updatedOn: Date;
}