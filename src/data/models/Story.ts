import { DocumentReference } from "@react-native-firebase/app/lib/internal/web/firebaseFirestore";

export interface Story {
  id: string;
  title: string;
  content:string;
  userId: string;
  worldRef: DocumentReference;
  characterRefs: DocumentReference[];
  createdOn: Date;
  updatedOn: Date;
}