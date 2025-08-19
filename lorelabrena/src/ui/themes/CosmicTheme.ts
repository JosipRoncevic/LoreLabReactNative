// src/theme/CosmicTheme.ts

import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from "react-native";

export const CosmicTheme = {
  // 🎨 Colors
  colors: {
    deepSpace: "#0B0C1A",
    cosmicPurple: "#2D1B69",
    starWhite: "#F8FAFC",
    galaxyPink: "#EC4899",
    deleteRed: "rgb(224, 5, 5)",
    editGreen: "rgb(0, 166, 8)",
    characterBlue: "rgb(32, 209, 249)",
    storyGreen: "rgb(188, 251, 30)",
  },

  // 🌌 Gradients
  gradients: {
    background: ["#1E1B4B", "#0B0C1A"], // use with `react-native-linear-gradient`
  },

  // 🖼️ Images
  assets: {
    //logo: require("../assets/icon/logo.png"),
    //galaxy: require("../assets/icon/galaxy_image.png"),
  },

  // ✍️ Text styles
  text: StyleSheet.create<{ [key: string]: TextStyle }>({
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      color: "rgb(250, 231, 22)",
    },
    body: {
      fontSize: 16,
      color: "#F8FAFC",
    },
    listTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#F8FAFC",
    },
    listSubtitle: {
      fontSize: 14,
      color: "#E2E8F0",
    },
  }),

  // 📦 Decorations (use as container styles)
  containers: StyleSheet.create<{ [key: string]: ViewStyle }>({
    listItem1: {
      backgroundColor: "rgba(45, 27, 105, 0.3)", // cosmicPurple with opacity
      borderRadius: 12,
      borderWidth: 5,
      borderColor: "rgba(236, 72, 153, 0.2)", // galaxyPink with opacity
      shadowColor: "rgba(45, 27, 105, 0.2)",
      shadowOpacity: 1,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      elevation: 4,
    },
    listItem2: {
      backgroundColor: "rgba(45, 27, 105, 0.3)",
      borderRadius: 12,
      borderWidth: 5,
      borderColor: "rgba(32, 209, 249, 0.2)",
      shadowColor: "rgba(6, 12, 126, 0.2)",
      shadowOpacity: 1,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      elevation: 4,
    },
    listItem3: {
      backgroundColor: "rgba(45, 27, 105, 0.3)",
      borderRadius: 12,
      borderWidth: 5,
      borderColor: "rgba(188, 251, 30, 0.2)",
      shadowColor: "rgba(7, 149, 25, 0.2)",
      shadowOpacity: 1,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      elevation: 4,
    },
  }),
};
