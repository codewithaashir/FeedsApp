import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from '../common/colors';
import NewsFeedList from '../component/NewsFeedList';
import NewestFeedList from '../component/NewestFeedList';
import FeedWebview from '../component/FeedWebview';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

const Tab = createMaterialTopTabNavigator();
const TabOption = {
  activeTintColor: Colors.white,
  inactiveTintColor: Colors.navy,
  labelStyle: { 
    fontSize: 11, 
    fontWeight: 'bold' 
  },
  style: {
    backgroundColor: Colors.primaryGreen,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 7.11,

    elevation: 14,
  },
  indicatorStyle: {
    backgroundColor: Colors.white

  }
}
const NewsStack = createStackNavigator();
const NewestStack = createStackNavigator();
const News  = () => (
  <NewsStack.Navigator
      screenOptions={(params) => ({
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      })}
      mode="card"
      headerMode="none"
      initialRouteName="News"
  >
      <NewsStack.Screen
          name="News"
          component={NewsFeedList}
      />
      <NewsStack.Screen
          name="NewsWebview"
          component={FeedWebview}
      />
  </NewsStack.Navigator>
);

const Newest = () => (
  <NewestStack.Navigator
      screenOptions={(params) => ({
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      })}
      mode="card"
      headerMode="none"
      initialRouteName="Newest"
  >
      <NewestStack.Screen
          name="Newest"
          component={NewestFeedList}
      />
      <NewestStack.Screen
          name="NewestWebview"
          component={FeedWebview}
      />
  </NewestStack.Navigator>
);
export default function AppTabs(props) {
  return (
    <Tab.Navigator tabBarOptions={TabOption}>
      <Tab.Screen name="Newest" component={Newest} />
      <Tab.Screen name="News" component={News} />
      
      {/* <Tab.Screen name="Ask" component={FeedList} />
      <Tab.Screen name="Show" component={FeedList} />
      <Tab.Screen name="Jobs" component={FeedList} /> */}

      {/* <Tab.Screen name="Ask" component={()=><FeedList title={'Ask'}/>} {...props} />
      <Tab.Screen name="Show" component={()=><FeedList title={'Show'} {...props}/>} />
      <Tab.Screen name="Jobs" component={()=><FeedList title={'Jobs'} {...props}/>} /> */}
    </Tab.Navigator>
  );
}