import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Tags } from '../pages/Tags';
import { Confirmation } from '../pages/Confirmation';
import { Users } from '../pages/Users';
import AuthRoutes from './tab.routes';
import { UserSend } from '../pages/UserSend';
import { UserRecive } from '../pages/UserRecive';
import { Message } from '../pages/Message';

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
            name="Compliments"
            component={AuthRoutes}
        />

        <stackRoutes.Screen
            name="Users"
            component={AuthRoutes}
        />

        <stackRoutes.Screen
            name="Tags"
            component={Tags}
        />

        <stackRoutes.Screen
            name="Message"
            component={Message}
        />

        <stackRoutes.Screen
            name="Confirmation"
            component={Confirmation}
        />

        <stackRoutes.Screen
            name="UserSend"
            component={UserSend}
        />

        <stackRoutes.Screen
            name="UserRecive"
            component={UserRecive}
        />

    </stackRoutes.Navigator>
)

export default AppRoutes;