import moment from 'moment';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native';
import { Colors } from '../common/colors';
export default function FeedItem(props) {
  const { item: { title, comments_count, user, domain, time_ago, time }, onItemPress } = props;
  const getDate = (timestamp) => {
    var date = new Date(timestamp);
    return moment.unix(timestamp).format('DD/MM/YYYY');
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onItemPress}
    >
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Title:</Text>
        <Text>{time_ago}</Text>
      </View>
      <Text
        style={styles.title}
        ellipsizeMode='tail'
        numberOfLines={3}
      >
        {title}
      </Text>
      <Text style={{ ...styles.heading, marginTop: 2 }}>Description:</Text>
      <Text>Total Comments: {comments_count}</Text>
      <Text>Source: {domain}</Text>
      <Text>Date: {getDate(time)}</Text>
      <Text>User: {user}</Text>
      <Text>Source: {domain}</Text>

    </TouchableOpacity>
  );
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    height: height * 0.3,
    margin: 5,
    borderRadius: 4,
    backgroundColor: Colors.primaryGreen,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 7.11,

    elevation: 14,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.darkBlue
  },
});
