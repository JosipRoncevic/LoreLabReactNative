import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { CosmicTheme } from "../ui/themes/CosmicTheme";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source ={require('../assests/logo.png')}
        style= {styles.logoImage}
      />
      <Text style={CosmicTheme.text.heading}>Welcome Back!</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor={CosmicTheme.colors.starWhite + "88"}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={CosmicTheme.colors.starWhite + "88"}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Don’t have an account? <Text style={styles.registerLink}>Register</Text>
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
  logoImage:{
    height: 300,
    width: 300,
    resizeMode:'stretch',
    //borderColor: CosmicTheme.colors.galaxyPink,
    //borderWidth:2,
    //borderRadius:40
  }
});
