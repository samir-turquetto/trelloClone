import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TaskScreen from './src/pages/TaskScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1, marginTop: 30}}>
        <Tab.Navigator>
          <Tab.Screen                     
            name="A Fazer" 
            component={TaskScreen} 
            initialParams={{current: 'todo', next:'doing'}}
          />
          <Tab.Screen 
            name="Em Andamento" 
            component={TaskScreen} 
            initialParams={{current: 'doing', next:'done'}}
          />
          <Tab.Screen 
            name="Concluído" 
            component={TaskScreen} 
            initialParams={{current: 'done', next: null}}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}