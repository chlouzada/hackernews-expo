import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { TRPCProvider } from './utils/trpc';
import Navigation from './navigation';

export default function App() {
  return (
    <TRPCProvider>
      <SafeAreaProvider style={{ padding: 16, backgroundColor: 'black' }}>
        <StatusBar />
        <Navigation />
      </SafeAreaProvider>
    </TRPCProvider>
  );
}

registerRootComponent(App);
