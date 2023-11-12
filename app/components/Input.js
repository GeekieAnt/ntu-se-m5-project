import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  Alert,
  Image,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, TextInput, ActivityIndicator } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import api from "../utils/api";

const Input = ({ categories }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [category, setCategory] = useState(null);
  const [activity, setActivity] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleFileUpload = async () => {
    console.log(image);
    const uploadData = new FormData();
    uploadData.append("image", {
      uri: image,
      name: name,
    });

    let response = await api.post(`upload`, uploadData);
    let urlString = response.data;

    return urlString;
  };

  const handlePress = () => {
    if (!image) pickImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => setImage(null) },
        { text: "No" },
      ]);
  };

  const handleCancel = () => {
    setImage(null);
    setName(null);
    setDescription(null);
    setPrice(null);
    setImage(null);
  };

  const handleSubmit = async () => {
    setActivity(true);
    const id = getIdFromCategory(category);
    console.log("category =>", category);
    console.log("id =>", id);
    await handleFileUpload().then((response) => {
      api
        .post(`product/category/${category}`, {
          name: name,
          description: description,
          price: price,
          quantity: 1,
          sold: 0,
          photo: response,
        })
        .then((response) => {
          setActivity(false);
          handleCancel();
          console.log(response);
        })
        .catch((error) => console.log(error));
    });
  };

  const getIdFromCategory = (category) => {
    for (const item of categories) {
      if (item.name === category) {
        return item.id;
      }
    }
    return null;
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={{ margin: 10 }}>
          {!image && <MaterialCommunityIcons name="camera" size={40} />}
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={{ marginLeft: 20 }}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 150 }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
      <ActivityIndicator animating={activity} size="large" />
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={{ margin: 10 }}
          mode="outlined"
          label="Name"
          left={<TextInput.Icon icon="pencil-outline" />}
          onChangeText={(text) => setName(text)}
          value={name}
        ></TextInput>
        <TextInput
          style={{ margin: 10 }}
          mode="outlined"
          label="Price"
          left={<TextInput.Icon icon="diamond-outline" />}
          onChangeText={(text) => setPrice(text)}
          value={price}
        ></TextInput>
        <TextInput
          style={{ margin: 10 }}
          mode="outlined"
          label="Description"
          left={<TextInput.Icon icon="calendar-text" />}
          onChangeText={(text) => setDescription(text)}
          value={description}
        ></TextInput>
        <View style={{ margin: 10 }}>
          <SelectList
            setSelected={(val) => setCategory(val)}
            data={categories}
            save="name"
          />
        </View>
        <Button style={{ margin: 10 }} mode="contained" onPress={handleSubmit}>
          POST
        </Button>
        <Button onPress={handleCancel}>Cancel</Button>
      </KeyboardAvoidingView>
    </>
  );
};

export default Input;
