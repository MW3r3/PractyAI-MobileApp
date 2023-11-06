import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import * as Progress from "react-native-progress";
import { ThemeProvider } from "styled-components";

interface UsageInfoProps {
  theme: {
    background?: string;
    text?: string;
    primary?: string;
    white?: string;
    secondary?: string;
  };
}

const UsageInfo: React.FC<UsageInfoProps> = ({ theme }) => {
  const [spLimit, setSpLimit] = useState(null);
  const [spUsage, setSpUsage] = useState(null);
  const [messageLimit, setMessageLimit] = useState(null);
  const [messageUsage, setMessageUsage] = useState(null);

  useEffect(() => {
    const fetchUsageData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getDatabase();
      const usageRef = ref(db, "users/" + user.uid);

      onValue(usageRef, (snapshot) => {
        const data = snapshot.val();
        setSpLimit(data.spLimit);
        setSpUsage(data.spUsage);
        setMessageLimit(data.messageLimit);
        setMessageUsage(data.messageUsage);
      });
    };

    fetchUsageData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
			height: 175,
      justifyContent: "center",
      paddingHorizontal: 10,
      backgroundColor: "#212124",
			borderWidth: 1,
			borderColor: theme.secondary,
			margin: 10,
			marginHorizontal: 15,
			borderTopLeftRadius: 10,
			borderTopRightRadius: 10,
			borderBottomLeftRadius: 20,
			borderBottomRightRadius: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
    },
    progressBarContainer: {
      position: "relative",
      width: "100%",
      height: 40,
      marginBottom: 15,
    },
    progressBar: {
      position: "absolute",
      width: "100%",
      top: 0,
      left: 0,
			borderRadius: 20,
    },
    progressBarText: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      textAlign: "center",
      lineHeight: 40, 
      color: theme.text,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <View style={styles.progressBarContainer}>
          <Progress.Bar
            progress={
              messageUsage && messageLimit ? messageUsage / messageLimit : 0
            }
            height={40}
            width={null}
            color={theme.secondary}
            style={styles.progressBar}
          />
          <Text style={styles.progressBarText}>
            Message Usage: {messageUsage} / Message Limit: {messageLimit}
          </Text>
        </View>

        <View style={styles.progressBarContainer}>
          <Progress.Bar
            progress={spUsage && spLimit ? spUsage / spLimit : 0}
            width={null}
            height={40}
            color={theme.secondary}
            style={styles.progressBar}
          />
          <Text style={styles.progressBarText}>
            Super Power Usage: {spUsage} / {spLimit}
          </Text>
        </View>
      </View>
    </ThemeProvider>
  );
};

export default UsageInfo;
