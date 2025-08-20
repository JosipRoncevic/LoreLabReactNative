import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { CosmicTheme } from "../ui/themes/CosmicTheme";
import auth from "@react-native-firebase/auth"

const RegisterScreen = ({navigation}) => {

    const registerTestFn= () =>{
        auth().createUserWithEmailAndPassword(email, password).then(()=>{
            Alert.alert("User created: Please login");
            navigation.navigate("Login")
        })
        .catch((err)=>{
            console.log(err.nativeErrorMessage);
            Alert.alert(err.nativeErrorMessage)
        })
    }

    const [email, setEmail] =useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


  return (
    <View style={styles.container}>
      <Image
        source ={require('../assests/logo.png')}
        style= {styles.logoImage}
      />
      <Text style={CosmicTheme.text.heading}>Welcome!</Text>

      <TextInput
        value={email}
        onChangeText={text =>setEmail(text)}
        placeholder="Username"
        placeholderTextColor={CosmicTheme.colors.starWhite + "88"}
        style={styles.input}
      />

      <TextInput
        value={password}
        onChangeText={text =>setPassword(text)}
        placeholder="Password"
        placeholderTextColor={CosmicTheme.colors.starWhite + "88"}
        secureTextEntry
        style={styles.input}
      />
        <TextInput
        value={confirmPassword}
        //onChangeText={text =>setConfirmPassword(text)}
        placeholder="Confirm Password"
        placeholderTextColor={CosmicTheme.colors.starWhite + "88"}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={registerTestFn} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Already have an account? <Text style={styles.registerLink}>Log in</Text>
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
