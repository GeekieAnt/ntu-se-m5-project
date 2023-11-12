import { FlatList, RefreshControl, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import Listing from "./Listing";
import api from "../utils/api";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadListings = async () => {
    try {
      const { data } = await api.get(`product`);
      setListings(data);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadListings();
    console.log(listings);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Listing key={item.key} item={item} loadListings={loadListings} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadListings} />
        }
      />
    </SafeAreaView>
  );
};

export default Listings;
