import {Property} from '../../Property';
import {ScreenProps} from '../../Screen';
import {ScreenNames} from '../../ScreenNames';
import {SearchScreenNames} from '../search/SearchScreens';

export default interface SearchContext {
  currentScreen: SearchScreenNames;
  setScreen: (screen: SearchScreenNames) => void;
  setData: (data: Property[]) => void;
  data: Property[];
  containerHeight: number;
  propertyToShow: Property | null;
  setPropertyToShowOnMap: (property: Property | null) => void;
  core?: ScreenProps<ScreenNames.Core>;
  allSearchData: Property[];
  setAllSearchData: (data: Property[]) => void;
}
