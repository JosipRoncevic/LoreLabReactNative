import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface World {
  id: string;
  name: string;
  description:string;
  createdOn: FirebaseFirestoreTypes.Timestamp,
  updatedOn: FirebaseFirestoreTypes.Timestamp,
  userId: string  
}


// export class WorldModel {
//   constructor(
//     public id: string,
//     public name: string,
//     public description: string,
//     public createdOn: FirebaseFirestoreTypes.Timestamp,
//     public updatedOn: FirebaseFirestoreTypes.Timestamp,
//     public userId: string
//   ) {}

//   static fromDoc(doc: FirebaseFirestoreTypes.DocumentSnapshot): WorldModel {
//     const data = doc.data() as any;
//     return new WorldModel(
//       doc.id,
//       data.name,
//       data.description,
//       data.createdOn ?? FirebaseFirestoreTypes.Timestamp.now(),
//       data.updatedOn ?? FirebaseFirestoreTypes.Timestamp.now(),
//       data.userId
//     );
//   }

//   toMap() {
//     return {
//       name: this.name,
//       description: this.description,
//       createdOn: this.createdOn,
//       updatedOn: this.updatedOn,
//       userId: this.userId,
//     };
//   }
