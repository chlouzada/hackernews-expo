import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { TRPCProvider } from './utils/trpc';
import Navigation from './navigation';

export default function App() {
  return (
    <TRPCProvider>
      <SafeAreaProvider className='p-4 bg-custom-background'>
        <StatusBar backgroundColor="#2e2e2e"/>
        <Navigation />
      </SafeAreaProvider>
    </TRPCProvider>
  );
}

registerRootComponent(App);
