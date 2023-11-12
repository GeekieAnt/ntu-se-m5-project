import { ScrollView, View } from "react-native";
import { Button } from "react-native-paper";
import React, { useState, useEffect } from "react";
import api from "../utils/api";

const Header = () => {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    try {
      const { data } = await api.get(`category`);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCategories();
    console.log(categories);
  }, []);

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item) => (
          <Button
            // onPress={() => {
            //   loadListings(item._id);
            // }}
            key={item.id}
            mode="Contained-tonal"
            compact="true"
            style={{ marginHorizontal: 5 }}
          >
            {item.name}
          </Button>
        ))}
      </ScrollView>
    </View>
  );
};

export default Header;
