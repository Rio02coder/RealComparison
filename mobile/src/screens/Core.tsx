import React, {useState, createContext, useEffect} from 'react';
import {View} from 'react-native';
import SearchContainer from '../components/search/Container';
import {ScreenProps} from '../types/Screen';
import {ScreenNames} from '../types/ScreenNames';
import MapSearch from '../components/search/Map';
import connector from '../redux/connector';
import appStyles from '../styles/screens/Themes';
import {SearchScreenNames} from '../types/components/search/SearchScreens';
import {Property} from '../types/Property';
import SearchContext from '../types/components/screens/SearchContext';
import SessionManager from '../utilities/errors/backend/SessionManager';
import ENDPOINTS from '../service/endpoints';
import PropertyList from '../components/property/PropertyList';
import {manageSearchData} from '../components/search/Limiter';

const SEARCH_CONTAINER_HEIGHT = 135;

const getComponent = (
  props: ScreenProps<ScreenNames>,
  name: SearchScreenNames,
) => {
  switch (name) {
    case SearchScreenNames.MAP:
      return <MapSearch navigation={props.navigation} />;
    case SearchScreenNames.LIST:
      return <PropertyList navigation={props.navigation} />;
  }
};

export const SearchScreenContext = createContext<SearchContext>({
  setScreen: /* istanbul ignore next */ () => {},
  setData: /* istanbul ignore next */ () => {},
  data: [],
  currentScreen: SearchScreenNames.MAP,
  containerHeight: SEARCH_CONTAINER_HEIGHT,
  propertyToShow: null,
  setPropertyToShowOnMap: /* istanbul ignore next */ () => {},
  allSearchData: [],
  setAllSearchData: /* istanbul ignore next */ () => {},
});

const Core: React.FC<ScreenProps<ScreenNames.Core>> = props => {
  const [screenToShow, setScreenToShow] = useState<SearchScreenNames>(
    SearchScreenNames.MAP,
  );
  const [data, setData] = useState<Property[]>([]);
  const [allData, setAllData] = useState<Property[]>([]);
  const [propertyToShowOnMap, setPropertyToShowOnMap] =
    useState<Property | null>(null);
  /* istanbul ignore next */
  useEffect(() => {
    const initialSearch = new SessionManager<void, Property[]>(
      undefined,
      ENDPOINTS.PROPERTY.RETRIEVE,
      'GET',
      props,

      properties => {
        setAllData(properties);
        const newSearchData = manageSearchData(properties, 0, data);
        setData(newSearchData.newData);
      },
    );
    initialSearch.query();
  }, []);

  return (
    <SearchScreenContext.Provider
      value={{
        setScreen: setScreenToShow,
        setData: setData,
        currentScreen: screenToShow,
        data,
        propertyToShow: propertyToShowOnMap,
        containerHeight: SEARCH_CONTAINER_HEIGHT,
        setPropertyToShowOnMap: setPropertyToShowOnMap,
        allSearchData: allData,
        setAllSearchData: setAllData,
        core: props,
      }}>
      <View testID="search_screen" style={appStyles.mainAppTheme}>
        {getComponent(props as ScreenProps<ScreenNames>, screenToShow)}
        <SearchContainer />
      </View>
    </SearchScreenContext.Provider>
  );
};

export default connector(Core);
