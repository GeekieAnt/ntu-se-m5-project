import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import HomeScreen from "../screens/HomeScreen";
import PostScreen from "../screens/PostScreen";

const HomeRoute = () => <HomeScreen />;

const PostRoute = () => <PostScreen />;

const AppNavigator = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    { key: "post", title: "Post", focusedIcon: "plus-thick" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    post: PostRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default AppNavigator;
