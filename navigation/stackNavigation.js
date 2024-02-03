import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import MainScreen from '../screens/mainScreen';
import FormParameter from '../screens/sample/creteSampling';
import CollectView from '../screens/sample/collectSample';
import ViewData from '../screens/sample/viewData';



const StackNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                backgroundColor: 'white'
            }}
        >

            <Stack.Screen
                name="Main"
                component={MainScreen}
            />
            <Stack.Screen
                name="Params"
                component={FormParameter}
            />

            <Stack.Screen
                name="Collect"
                component={CollectView}
            />

            <Stack.Screen
                name="ListData"
                component={ViewData}
            />

        </Stack.Navigator>

    );
};

export default StackNavigation;
