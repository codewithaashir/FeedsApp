import React, {useReducer, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../common/colors';
import {Service} from '../config/service';
import FeedItem from './FeedItem';
import {ListHeaderComponent} from './Header';
import moment from 'moment';
import EmptyList from '../common/Empty';

const initialState = [];

let reducer = (state, action) => {
  switch (action.type) {
    case 'unload':
      return initialState;
    case 'fetchNewest':
      return action.payload;
    default:
      return state;
  }
};
const fetchNewest = data => ({
  type: 'fetchNewest',
  payload: data,
});
export default function NewestFeedList(props) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [newest, dispatch] = useReducer(reducer, initialState);
  const [isDesc, setIsDesc] = useState(false);

  useEffect(async () => {
    const newestData = await Service.getNewest(page, setLoading);
    dispatch(fetchNewest(newestData));
  }, []);
  const OnEnd = async () => {
    const onEndData = await Service.getNewest(page + 1, setLoading);
    if (onEndData && onEndData.length > 0) {
      let d = newest.concat(onEndData);
      dispatch(fetchNewest(d));
    }
    setPage(page + 1);
  };

  const webViewHandler = url => {
    props.navigation.navigate('NewestWebview', {url});
  };
  const sortByDateHandler = () => {
    dispatch(
      fetchNewest(
        newest.slice().sort((a, b) => {
          let aDateFormated = moment.unix(a.time).format('YYYY/MM/DD');
          let bDateFormated = moment.unix(b.time).format('YYYY/MM/DD');
          return isDesc
            ? new Date(bDateFormated) - new Date(aDateFormated)
            : new Date(aDateFormated) - new Date(bDateFormated);
        }),
      ),
    );
  };
  return (
    <>
      <FlatList
        data={newest}
        contentContainerStyle={styles.container}
        keyExtractor={(item, index) => item.id.toString()}
        ListHeaderComponent={
          <ListHeaderComponent pressHandler={sortByDateHandler} />
        }
        onEndReached={OnEnd}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyList />}
        renderItem={({item}) => (
          <FeedItem
            item={item}
            onItemPress={() =>
              webViewHandler(`https://news.ycombinator.com/item?id=${item.id}`)
            }
            {...props}
          />
        )}
      />
      {loading && (
        <View style={styles.loaderView}>
          <ActivityIndicator size={'small'} color={Colors.twitterBlue} />
        </View>
      )}
    </>
  );
}
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: Colors.feedItemBg,
    padding: 5,
  },
  loaderView: {
    justifyContent: 'center',
    alignItems: 'center',

    ...StyleSheet.absoluteFill,
  },
});
