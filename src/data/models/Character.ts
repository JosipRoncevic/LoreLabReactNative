import { DocumentReference } from "@react-native-firebase/app/lib/internal/web/firebaseFirestore";

export interface Character {
  id: string;
  name: string;
  backstory:string;
  userId: string;
  worldRef: DocumentReference;
  createdOn: Date;
  updatedOn: Date;
}