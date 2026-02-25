import auth from "@react-native-firebase/auth";

export class AuthService {
  async login(email: string, password: string) {
    return auth().signInWithEmailAndPassword(email, password);
  }

  async logout() {
    return auth().signOut();
  }

  getCurrentUser() {
    return auth().currentUser;
  }
}