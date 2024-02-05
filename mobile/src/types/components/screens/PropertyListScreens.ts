import {PropertyListData} from '../property/PropertyListData';
import {ScreenNames} from '../../ScreenNames';
import {NavigationStackTypes} from '../../NavigationStackTypes';
import {tags} from '../../redux/Tags';
import {CreatedHeaderTitle, OwnedHeaderTitle} from '../listScreens/Titles';

export const PropertyListScreens: [
  PropertyListData,
  ScreenNames,
  NavigationStackTypes[ScreenNames],
][] = [
  [
    {
      name: 'Created',
      iconName: 'building',
      iconSize: 30,
    },
    ScreenNames.PropertyList,
    {
      tag: tags.CREATED,
      title: CreatedHeaderTitle.CREATED_HEADER_TITLE,
      onEmptyDataMessage: CreatedHeaderTitle.EMPTY_DATA_MESSAGE,
      onEmptyDataTitle: CreatedHeaderTitle.EMPTY_DATA_TITLE,
    },
  ],
  [
    {name: 'Owned', iconName: 'home', iconSize: 30},
    ScreenNames.PropertyList,
    {
      tag: tags.OWNED,
      title: OwnedHeaderTitle.OWNED_HEADER_TITLE,
      onEmptyDataMessage: OwnedHeaderTitle.EMPTY_DATA_MESSAGE,
      onEmptyDataTitle: OwnedHeaderTitle.EMPTY_DATA_TITLE,
    },
  ],
];
