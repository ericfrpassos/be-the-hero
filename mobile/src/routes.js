import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator();

import Incidents from './pages/Incidents';
import IncidentDetails from './pages/Incidents/Details';

export default function Routes() {
    return (
        <NavigationContainer>

            <AppStack.Navigator screenOptions={{ headerShown: false }}>

                <AppStack.Screen component={Incidents} name="Incidents"></AppStack.Screen>
                <AppStack.Screen component={IncidentDetails} name="IncidentDetails"></AppStack.Screen>

            </AppStack.Navigator>

        </NavigationContainer>
    );
}