import React from 'react';
import { Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Users } from '../pages/Users';
import { Compliments } from '../pages/Compliments';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    return(
        <AppTab.Navigator
            tabBarOptions={{
                activeTintColor: 'green',
                inactiveTintColor: 'black',
                labelPosition: 'beside-icon',
                style: {
                    paddingVertical: Platform.OS == 'ios'? 20 : 0,
                    height: 88
                }
            }}>
                <AppTab.Screen
                    name='Enviar um elogio'
                    component={Users}
                    options={{
                        tabBarIcon: (({ size=16, color='black' }) => (
                            <MaterialIcons
                                name="add-circle-outline"
                                size={size}
                                color={color}
                            />
                        ))
                    }}
                />

                <AppTab.Screen
                    name='Enviados/Recebidos'
                    component={Compliments}
                    options={{
                        tabBarIcon: (({ size=16, color='black' }) => (
                            <MaterialIcons
                                name="format-list-bulleted"
                                size={size}
                                color={color}
                            />
                        ))
                    }}
                />
            </AppTab.Navigator>
    )
}

export default AuthRoutes;