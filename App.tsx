import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TopStories from "./src/pages/TopStories";
import Story from "./src/pages/Story";
import Search from "./src/pages/Search";

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Search"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Top Stories" component={TopStories} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Story" component={Story} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
