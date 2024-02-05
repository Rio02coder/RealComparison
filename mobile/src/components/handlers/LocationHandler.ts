/* istanbul ignore file */

import {Permission} from 'react-native';
import Permissions from '../../types/permissions/permissions';
import GetLocation from 'react-native-get-location';
import Coordinate from '../../types/components/Coordinate';
import {permissionHandler} from './PermissionHandler';
import getOS from './PlatformHandler';
import {positionStack} from '../../service/server';
import Config from 'react-native-config';
import axios, {AxiosRequestConfig} from 'axios';
import {mapquest} from '../../service/server';

export async function getUserCoordinate(): Promise<Coordinate> {
  return new Promise<Coordinate>(async (resolve, reject) => {
    await permissionHandler(Permissions.LOCATION[getOS()] as Permission[]);
    try {
      const userLocation = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 20000,
      });
      console.log(
        'This is what I find in geo locator',
        userLocation.latitude,
        userLocation.longitude,
      );
      resolve(
        getCoordinateObject(userLocation.latitude, userLocation.longitude),
      );
    } catch (err) {
      console.log('error from geo locator', err);
    }
  });
}

export async function getCountry(
  latitude: number,
  longitude: number,
): Promise<String> {
  return new Promise<string>(async (resolve, reject) => {
    const urlToAccess: string = getReverseGeoCodingBaseURL();
    const GeoCodingParameters = getGeoCodingParameters(latitude, longitude);
    try {
      let response = (await mapquest.get(urlToAccess, GeoCodingParameters))
        .data;
      response = response.results[0].locations[0];
      resolve(`${response.adminArea1}`);
    } catch (err) {
      console.log('Error from the mapbox stack', err);
    }
  });
}

function getReverseGeoCodingBaseURL(): string {
  return 'reverse';
}

function getGeoCodingParameters(
  latitude: number,
  longitude: number,
): AxiosRequestConfig {
  return {
    params: {
      key: Config.MAPQUEST_API_KEY,
      location: `${latitude},${longitude}`,
    },
  };
}

function getCoordinateObject(latitude: number, longitude: number): Coordinate {
  return {latitude, longitude};
}
