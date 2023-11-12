import { SafeAreaView } from "react-native";
import Header from "../components/Header";
import Listings from "../components/Listings";

import React from "react";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Listings />
    </SafeAreaView>
  );
};

export default HomeScreen;
