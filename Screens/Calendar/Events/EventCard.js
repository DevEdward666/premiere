import React from 'react';
import {View, Dimensions} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import styles from './style';

const EventCard = ({title, description, image, date, time}) => {
  const LeftContent = (props) => (
    <Avatar.Icon
      style={{backgroundColor: '#0084FF'}}
      {...props}
      icon="calendar"
    />
  );
  const maxHeight = Dimensions.get('window').height; // or something else
  const maxWidth = Dimensions.get('window').width;

  return (
    <View style={{width: maxWidth, aspectRatio: 1 / 1, height: maxWidth}}>
      <Card style={{flex: 1, borderRadius: 15, marginEnd: 5, padding: 10}}>
        <Card.Title
          style={styles.EventListTitle}
          title={date}
          subtitle={time}
          left={LeftContent}
        />
        <Card.Cover source={{uri: image}} />
        <Card.Content>
          <Title style={styles.EventListTitle}>{title}</Title>
          <Paragraph style={styles.EventListTitle}>{description}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};
export default EventCard;
