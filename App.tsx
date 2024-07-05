import 'react-native-gesture-handler';
import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainAppStack } from './src/Presentation/navigator/MainAppStack';
import { UserProvider } from './src/Presentation/context/auth/UserContext';
import { StripeProvider } from '@stripe/stripe-react-native';
import { View } from 'react-native';
import FlashMessage from 'react-native-flash-message';

interface AppStateProps {
  children: ReactElement | ReactElement[] | null;
}

const AppState: React.FC<AppStateProps> = ({ children }) => {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  )
}
const App = () => {
  return (
    <StripeProvider publishableKey="YOUR_PUBLISHABLE_KEY">
      <NavigationContainer>
        <AppState>
          <View style={{ flex: 1 }}>
            <MainAppStack />
            <FlashMessage position="bottom" />
          </View>
        </AppState>
      </NavigationContainer>
    </StripeProvider>
  );
  
}

export default App;