import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface World {
  id: string;
  name: string;
  description:string;
  createdOn: Date;
  updatedOn: Date;
  userId: string;
}
