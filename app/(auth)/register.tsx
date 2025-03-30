import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useRouter, Link } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from "react-native-reanimated";

export default function RegisterScreen() {
  const router = useRouter(); // Use expo-router navigation
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const logoScale = useSharedValue(1);
  const formOpacity = useSharedValue(0);

  useEffect(() => {
    logoScale.value = withSequence(
      withTiming(1.2, { duration: 500, easing: Easing.ease }),
      withTiming(1, { duration: 500, easing: Easing.ease })
    );
    formOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
  }));

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/(auth)/login"); // Redirect using expo-router
    } catch (err: any) {
      Alert.alert("Registration Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <View style={styles.logoCircle}>
            <Ionicons name="person-add" size={40} color="#5E72E4" />
          </View>
          <Text style={styles.logoText}>Create Account</Text>
          <Text style={styles.subText}>Sign up to get started</Text>
        </Animated.View>

        <Animated.View style={[styles.formContainer, formAnimatedStyle]}>
          <TextInput placeholder="Your Name" value={name} onChangeText={setName} style={styles.input} />
          <TextInput placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} style={styles.input} />
          <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
          <TextInput placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} />

          <TouchableOpacity onPress={handleRegister} style={styles.registerButton} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.registerButtonText}>Sign Up</Text>}
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text style={styles.loginText}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  logoContainer: { alignItems: "center", marginBottom: 40 },
  logoText: { fontFamily: "Poppins-Bold", fontSize: 28, color: "#333333", marginBottom: 8 },
  subText: { fontFamily: "Poppins-Regular", fontSize: 16, color: "#666666" },
  formContainer: { marginBottom: 40, paddingVertical: 20 },
  input: { fontFamily: "Poppins-Regular", fontSize: 16, color: "#333", borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 12, paddingHorizontal: 16, marginBottom: 20, height: 56, backgroundColor: "#F9F9F9" },
  registerButton: { backgroundColor: "#5E72E4", borderRadius: 12, height: 56, alignItems: "center", justifyContent: "center", elevation: 5 },
  registerButtonText: { fontFamily: "Poppins-SemiBold", color: "#FFFFFF", fontSize: 16 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 10 },
  footerText: { fontFamily: "Poppins-Regular", color: "#666", fontSize: 14 },
  loginText: { fontFamily: "Poppins-SemiBold", color: "#5E72E4", fontSize: 16 },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
});

