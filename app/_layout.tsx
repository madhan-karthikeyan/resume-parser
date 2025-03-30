import { Stack } from "expo-router";
import { AuthProvider } from "./(auth)/authContext"; 

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
