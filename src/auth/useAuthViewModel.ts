import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export function useAuthViewModel() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      setError(null);
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function register(email: string, password: string) {
    try {
      setLoading(true);
      setError(null);
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Registration failed");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      await auth().signOut();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Logout failed");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return {
    user,
    userEmail: user?.email ?? null,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    register,
    logout,
  };
}