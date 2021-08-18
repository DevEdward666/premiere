import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import styles from '../../Screens/Diagnostics/styles';
const CustomListFooter = ({customsubtotal}) => {
  return (
    <Card containerStyle={{marginBottom: 100, borderRadius: 5, elevation: 5}}>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
            padding: 20,
          },
        ]}>
        <View style={{flex: 5}}>
          <View
            style={[
              styles.container,
              {
                flexDirection: 'row',
                alignItems: 'center',
                margin: 10,
              },
            ]}>
            <View style={{flex: 5}}>
              <Text style={{fontSize: 16}}>Total</Text>
            </View>
            <View style={{flex: 3}}>
              <Text style={{fontSize: 16}}>Php: {customsubtotal}</Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};
export default CustomListFooter;
