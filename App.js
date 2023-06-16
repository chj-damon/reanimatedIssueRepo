/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

import {hide as hideSplash} from 'react-native-bootsplash';

import {StatusBar, NavigationBar, SystemBars} from 'react-native-bars';
import Switch from './switch';

export default function App() {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await hideSplash({fade: true});
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{flex: 1, borderWidth: 1, borderColor: 'red'}}>
        <View>
          <Text>123</Text>
        </View>
        <Switch />
      </ScrollView>
    </SafeAreaView>
  );
}