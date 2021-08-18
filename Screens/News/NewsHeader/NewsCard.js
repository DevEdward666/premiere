import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image,ImageBackground } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import styles from './styles';

import { useDispatch, useSelector } from 'react-redux';
const NewsCard = ({title,img,description,userimg,UI}) => {


    return (
    
     
      <Card containerStyle={styles.cardmain}>
      <View style={styles.cardviewimage}>
        <View style={styles.cardviewimagesecond}>
        <Image
        progressiveRenderingEnabled={true}
        style={styles.image}
        source={require('../../../assets/icons/premiereicon.jpeg')}
        />
        </View>
        <View style={styles.cardtitle}>
        <Card.Title>{title}</Card.Title>
        </View>
        </View>
        <Card.Divider/>
        <Text numberOfLines={3} style={styles.carddesc}>
           {description}
          </Text>
        <Card.Image source={{uri: img, scale: 1}} style={{marginTop:10}}/>
      
         {UI}
      </Card>
    );
};

NewsCard.propTypes = {
    
};

export default NewsCard;