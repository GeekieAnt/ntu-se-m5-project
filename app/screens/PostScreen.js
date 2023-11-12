import { SafeAreaView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import api from "../utils/api";

const PostScreen = () => {
  const [categories, setCategories] = useState([]);
  const loadCategories = async () => {
    try {
      const { data } = await api.get(`category`);
      let newArray = data.map((item) => {
        return { key: item.id, value: item.name };
      });
      setCategories(newArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <SafeAreaView>
      <Input categories={categories} />
    </SafeAreaView>
  );
};

export default PostScreen;
