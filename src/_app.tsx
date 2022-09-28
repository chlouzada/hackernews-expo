import { registerRootComponent } from "expo";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import Navigation from "./navigation";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider style={{ padding: 16, backgroundColor: "black" }}>
        <StatusBar />
        <Navigation />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

registerRootComponent(App);
