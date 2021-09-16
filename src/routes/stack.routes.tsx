import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Tags } from '../pages/Tags';
import { Confirmation } from '../pages/Confirmation';
import { Users } from '../pages/Users';

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
            name="Users"
            component={Users}
        />

        <stackRoutes.Screen
            name="Tags"
            component={Tags}
        />

        <stackRoutes.Screen
            name="Confirmation"
            component={Confirmation}
        />

    </stackRoutes.Navigator>
)

export default AppRoutes;