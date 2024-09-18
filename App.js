import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AuthContext } from "@/app/AuthContext";
import AuthGuard from "@/app/components/main-app/ui/auth-guard/AuthGuard";

const HotelsPage = () => {
  // states
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("authToken");
    if (!isAuthenticated) {
      // Handle redirection logic for non-authenticated users
      // For testing purposes, we will just set error state here
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const fetchHotels = async () => {
      try {
        const response = await fetch("/api/getHotels", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (!currentUser) return <AuthGuard />;

  const toggleReadMore = id => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const truncateText = (text, lines = 3) => {
    if (typeof text !== "string") {
      return "";
    }
    const textLines = text.split(" ");
    if (textLines.length <= lines) {
      return text;
    }
    return textLines.slice(0, lines).join(" ") + "...";
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#dfa974" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const renderHotelItem = ({ item }) => {
    const truncatedText = truncateText(item.description, 20);
    const isTruncated =
      item.description && typeof item.description === "string"
        ? item.description.split(" ").length > 20
        : false;

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View
            style={[
              styles.descriptionContainer,
              { maxHeight: expanded[item.id] ? "none" : 72 },
            ]}
          >
            <Text style={styles.cardText}>
              {expanded[item.id] ? item.description : truncatedText}
            </Text>
          </View>
          {isTruncated && (
            <TouchableOpacity
              onPress={() => toggleReadMore(item.id)}
              style={styles.readMoreButton}
            >
              <Text style={styles.readMoreText}>
                {expanded[item.id] ? "See less" : "Read more"}
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.buttonContainer}>
            <Button
              title="More Details"
              onPress={() => alert("More Details pressed")}
              color="#dfa974"
            />
            <Button
              title="Reviews"
              onPress={() => alert("Reviews pressed")}
              color="#dfa974"
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hotels</Text>
      <FlatList
        data={hotels}
        renderItem={renderHotelItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descriptionContainer: {
    overflow: "hidden",
    position: "relative",
  },
  cardText: {
    margin: 0,
  },
  readMoreButton: {
    marginVertical: 8,
  },
  readMoreText: {
    color: "#dfa974",
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});

export default HotelsPage;
