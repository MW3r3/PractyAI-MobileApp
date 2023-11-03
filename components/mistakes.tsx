import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { AdminContext } from "../providers/AdminContext";
import { set } from "firebase/database";

const Mistakes = ({ onMistakePress, theme }) => {
  const [mistakes, setMistakes] = useState([]);
  const [newMistakeTime, setNewMistakeTime] = useState("");
  const [newMistakePersona, setNewMistakePersona] = useState("");
  const [newMistakeDescription, setNewMistakeDescription] = useState("");
  const { admin } = useContext(AdminContext);

  const handleAddMistake = () => {
    const newMistake = {
      time: newMistakeTime,
      persona: newMistakePersona,
      description: newMistakeDescription,
    };
    setMistakes([...mistakes, newMistake]);
    setNewMistakeTime("");
    setNewMistakePersona("");
    setNewMistakeDescription("");
  };

  const handleRemoveMistake = (index) => {
    setMistakes(mistakes.filter((_, i) => i !== index));
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => onMistakePress(item)} style={styles.item}>
      <View style={styles.items}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.persona}>{item.persona}</Text>
        <Text style={styles.time}>{item.time}</Text>
        <TouchableOpacity
          onPress={() => handleRemoveMistake(index)}
          style={styles.button}
        >
          <Ionicons name="trash-bin-outline" size={24} color={theme.item} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );


  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      flex: 1,
      padding: 10,
      width: "100%",
    },
    title: {
      color: theme.text,
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
    },
    item: {
      color: theme.text,
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom: 10,
    },
    text: {
      color: theme.text,
      textAlign: "center",
    },
    button: {
      color: theme.text,
      marginTop: 10,
    },
    input: {
      color: theme.text,
      height: 40,
      borderColor: theme.alert,
      borderWidth: 1,
      marginTop: 10,
    },
    items: {
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom: 10,
      position: "relative",
      width: "100%",
    },
    description: {
      color: theme.text,
      flex: 1,
    },
    persona: {
      color: theme.text,
      position: "absolute",
      top: 0,
      right: 0,
    },
    time: {
      color: theme.text,
      position: "absolute",
      bottom: 0,
      right: 0,
    },
    divider: {
    height: 1,
    width: "100%",
    backgroundColor: theme.text,
  },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mistakes</Text>
      <FlatList
        data={mistakes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        ListEmptyComponent={<Text style={styles.text}>No mistakes found.</Text>}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        
      />
      {admin && (
        <View>
          <TextInput
            style={styles.input}
            value={newMistakeTime}
            onChangeText={setNewMistakeTime}
            placeholder="Enter time"
            placeholderTextColor={theme.text}
          />
          <TextInput
            style={styles.input}
            value={newMistakePersona}
            onChangeText={setNewMistakePersona}
            placeholder="Enter persona"
            placeholderTextColor={theme.text}
          />
          <TextInput
            style={styles.input}
            value={newMistakeDescription}
            onChangeText={setNewMistakeDescription}
            placeholder="Enter description"
            placeholderTextColor={theme.text}
          />
          <Button title="Add Mistake" onPress={handleAddMistake} />
        </View>
      )}
    </View>
  );
};

export default Mistakes;
