
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomePage } from '../screens/homeScreen';

const BottomTab = createBottomTabNavigator()
export function HomePageNavigation(){
    return(
        <BottomTab.Navigator>
            <BottomTab.Screen name="homePage" component={HomePage} options={{ headerShown: false }} />
        </BottomTab.Navigator>
    )
}