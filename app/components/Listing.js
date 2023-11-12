import React from "react";
import { Card, Text } from "react-native-paper";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TouchableWithoutFeedback } from "react-native";
import api from "../utils/api";

const Listing = ({ item, loadListings }) => {
  const handleDelete = async (id) => {
    try {
      await api.delete(`product/${id}`);
      loadListings();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() => (
          <TouchableWithoutFeedback onPress={() => handleDelete(item.id)}>
            <View
              style={{
                width: 70,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons name="trash-can-outline" size={30} />
            </View>
          </TouchableWithoutFeedback>
        )}
      >
        <Card style={{ padding: 15 }}>
          <Card.Cover source={{ uri: item.photo }} />

          <Card.Content>
            <Text variant="titleMedium">{item.name}</Text>
            <Text variant="bodyMedium" style={{ color: "teal" }}>
              ${item.price}
            </Text>
          </Card.Content>
        </Card>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default Listing;
