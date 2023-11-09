import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Verify from "../screens/auth/Verify";
import ForgotPassword from "../screens/auth/ForgotPassword";
import ForgotPasswordConatact from "../screens/auth/ForgotPasswordConatact";
import VerifyForgotPassword from "../screens/auth/VerifyForgotPassword";
import ResetPassword from "../screens/auth/ResetPassword";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <SafeAreaProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Login"}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen
          name="ForgotPasswordConatact"
          component={ForgotPasswordConatact}
        />
        <Stack.Screen
          name="VerifyForgotPassword"
          component={VerifyForgotPassword}
        />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default AuthStack;
