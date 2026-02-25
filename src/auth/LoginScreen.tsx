import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { CosmicTheme } from "../ui/themes/CosmicTheme";
import { useAuthViewModel } from "../auth/useAuthViewModel";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error, user } = useAuthViewModel();

  React.useEffect(() => {
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Worlds" }],
      });
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err) {
      Alert.alert("Login Failed", error || "Please try again");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={CosmicTheme.images.logo} style={styles.logoImage} />

      <Text style={CosmicTheme.text.heading}>Welcome Back!</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor={CosmicTheme.colors.starWhite + "88"}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={CosmicTheme.colors.starWhite + "88"}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={[styles.loginButton, loading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={CosmicTheme.colors.starWhite} />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      {error && <Text style={{ color: "red", marginTop: 8 }}>{error}</Text>}

      <Text style={styles.registerText}>
        Don’t have an account?{" "}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CosmicTheme.colors.deepSpace,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    backgroundColor: CosmicTheme.colors.cosmicPurple,
    color: CosmicTheme.colors.starWhite,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  loginButton: {
    width: "100%",
    backgroundColor: CosmicTheme.colors.galaxyPink,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  loginButtonText: {
    color: CosmicTheme.colors.starWhite,
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 20,
    color: CosmicTheme.colors.starWhite,
    fontSize: 14,
  },
  registerLink: {
    color: CosmicTheme.colors.galaxyPink,
    fontWeight: "600",
  },
  logoImage: {
    height: 300,
    width: 300,
    resizeMode: "cover",
  },
});