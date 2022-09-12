import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import TopStories from "./src/views/TopStories";
import Story from "./src/views/Story";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* @ts-ignore */}
      <TailwindProvider utilities={utilities}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Top Stories">
            <Stack.Screen name="Top Stories" component={TopStories} />
            <Stack.Screen name="Story" component={Story} />
          </Stack.Navigator>
        </NavigationContainer>
      </TailwindProvider>
    </QueryClientProvider>
  );
}
