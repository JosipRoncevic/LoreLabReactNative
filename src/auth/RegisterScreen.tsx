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

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register, loading, error } = useAuthViewModel();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    try {
      await register(email, password);
      // auth state listener will auto-switch to MainNavigator
    } catch (err) {
      Alert.alert("Registration Failed", error || "Please try again");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={CosmicTheme.images.logo} style={styles.logoImage} />

      <Text style={CosmicTheme.text.heading}>Create Account</Text>

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

      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        placeholderTextColor={CosmicTheme.colors.starWhite + "88"}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={[styles.registerButton, loading && { opacity: 0.7 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={CosmicTheme.colors.starWhite} />
        ) : (
          <Text style={styles.registerButtonText}>Register</Text>
        )}
      </TouchableOpacity>

      {error && <Text style={{ color: "red", marginTop: 8 }}>{error}</Text>}

      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.goBack()}
        >
          Login
        </Text>
      </Text>
    </View>
  );
};

export default RegisterScreen;

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
  registerButton: {
    width: "100%",
    backgroundColor: CosmicTheme.colors.galaxyPink,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  registerButtonText: {
    color: CosmicTheme.colors.starWhite,
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
    color: CosmicTheme.colors.starWhite,
    fontSize: 14,
  },
  loginLink: {
    color: CosmicTheme.colors.galaxyPink,
    fontWeight: "600",
  },
  logoImage: {
    height: 300,
    width: 300,
    resizeMode: "cover",
  },
});