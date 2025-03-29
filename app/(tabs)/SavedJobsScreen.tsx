import { View, Text, StyleSheet } from "react-native";

export default function SavedJobsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>💼 Saved Jobs Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
