import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Tags } from '../pages/Tags';

const stackRoutes = createNativeStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        /*headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: white
            }
        }}*/
    >
        <stackRoutes.Screen
            name="Welcome"
            component={Welcome}
        />

        <stackRoutes.Screen
            name="UserIdentification"
            component={UserIdentification}
        />

        <stackRoutes.Screen
            name="Tags"
            component={Tags}
        />

    </stackRoutes.Navigator>
)

export default AppRoutes;