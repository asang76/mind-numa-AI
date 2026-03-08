import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Stack } from "expo-router";

function RootLayoutWithAuth() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error("Add your Clerk Publishable Key to the .env file");
  }
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) {
    return null;
  }
  if (!isSignedIn) {
  }

  return (
    <Stack>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(protected)" />
      </Stack.Protected>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const publishkey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishkey) {
    return "";
  }
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishkey}>
      <RootLayoutWithAuth />
    </ClerkProvider>
  );
}
