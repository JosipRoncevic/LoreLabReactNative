import React from "react";
import { AuthNavigator } from "./AuthNavigator";
import { MainNavigator } from "./MainNavigator";
import { useAuthViewModel } from "../auth/useAuthViewModel";

export const RootNavigator = () => {
  const { user, loading } = useAuthViewModel();

  if (loading) return null;

  return user ? <MainNavigator /> : <AuthNavigator />;
};