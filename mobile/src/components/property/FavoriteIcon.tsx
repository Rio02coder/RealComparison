import React from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import SelectedFavouriteIcon from 'react-native-vector-icons/AntDesign';
import FavouriteIconStyle from '../../styles/components/property/headerIcons/FavouriteIcon';
import {TouchableOpacity} from 'react-native';
import FilterIconProps from '../../types/components/property/FavoriteIcon';
import {tags} from '../../types/redux/Tags';
import {setUpdatedProperty} from '../../utilities/property/OwnedPropertyManager';

const FavoriteIcon = (props: FilterIconProps) => {
  const favoriteProperties = props.reduxProps.properties.get(tags.FAVORITE);
  const isFavorite = favoriteProperties
    ? favoriteProperties
        .map(property => property.id)
        .includes(props.propertyPayload.id)
    : false;

  return (
    <TouchableOpacity
      testID="favorite_btn"
      onPress={() => {
        if (isFavorite) {
          props.propertyPayload
            .unfavorite(props.reduxProps)
            .then(() => {
              setUpdatedProperty(
                props.reduxProps,
                props.propertyPayload.id,
                props.setProperty,
              );
            })
            .catch(err => console.log(err));
        } else {
          props.propertyPayload
            .favorite(props.reduxProps)
            .then(() => {
              setUpdatedProperty(
                props.reduxProps,
                props.propertyPayload.id,
                props.setProperty,
              );
            })
            .catch(err => console.log(err));
        }
      }}>
      {isFavorite ? (
        <SelectedFavouriteIcon
          testID="fav_selected"
          name="heart"
          style={FavouriteIconStyle.selectedIcon}
          size={33}
        />
      ) : (
        <Icon
          testID="fav_unselected"
          name="heart"
          style={FavouriteIconStyle.Icon}
          size={48}
        />
      )}
    </TouchableOpacity>
  );
};

export default FavoriteIcon;
