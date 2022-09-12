import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import TopStories from "./src/views/TopStories";
import Story from "./src/views/Story";
import { styled } from "nativewind";

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

const StyledText = styled(Text);

const Theme = ()=> {
return <StyledText className="bg-black">Teste</StyledText>
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Top Stories">
          <Stack.Screen name="Top Stories" component={TopStories} />
          <Stack.Screen name="Story" component={Story} />
          <Stack.Screen name="Theme" component={Theme} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
