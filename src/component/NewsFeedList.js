import axios from "axios";
import React, { useReducer, useEffect, useState } from "react";
import {FlatList, StyleSheet, Dimensions,View,ActivityIndicator} from 'react-native';
import { Colors } from '../common/colors';
import { Service } from "../config/service";
import FeedItem from './FeedItem';
import { ListHeaderComponent } from "./Header";
import moment from 'moment';

const initialState = [];

let reducer = (state, action) => {
  switch (action.type) {
    case "unload":
      return initialState;
    case "fetchNews":
      return action.payload;
    default:
      return state;
  }
};
const fetchNews = (data) => ({
  type: "fetchNews",
  payload: data
});
export default function NewsFeedList(props) {
  const [page,setPage] = useState(1);
  const [news, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const [isDesc,setIsDesc] = useState(false);
  useEffect(async () => {
     const newsData =  await Service.getNews(page,setLoading);  
     dispatch(fetchNews(newsData));
  }, []);
  const OnEnd = async () => {
    const onEndData =  await Service.getNews(page+1,setLoading);
    if(onEndData&&onEndData.length>0){ 
    let d = news.concat(onEndData);
    dispatch(fetchNews(d));
    }
    setPage(page + 1);
  };
  const webViewHandler = (url) => {
    props.navigation.navigate('NewsWebview', { url });
  };
  const sortByDateHandler = ()=> {
     setIsDesc(!isDesc);
     dispatch(fetchNews(news.slice().sort((a,b)=>{
      let aDateFormated = moment.unix(a.time).format('YYYY/MM/DD');
      let bDateFormated = moment.unix(b.time).format('YYYY/MM/DD');
      return isDesc? new Date(bDateFormated) - new Date(aDateFormated):new Date(aDateFormated) - new Date(bDateFormated)
     })));
  }

  return (
    <>
    <FlatList
      data={news}
      contentContainerStyle={styles.container}
      keyExtractor={(item,index)=>item.id.toString()+index}
      ListHeaderComponent={<ListHeaderComponent pressHandler={sortByDateHandler}/>}
      onEndReached={OnEnd}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <FeedItem item={item} onItemPress={()=>webViewHandler(`https://news.ycombinator.com/item?id=${item.id}`)} {...props} />}
    />
    {loading && (
      <View style={styles.loaderView}>
        <ActivityIndicator size={'small'} color={Colors.twitterBlue} />
      </View>
    )}
  </>
  )
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.feedItemBg,
    padding: 5,
  },
  loaderView: {
    justifyContent: 'center',
    alignItems: 'center',

    ...StyleSheet.absoluteFill,
  },
});
