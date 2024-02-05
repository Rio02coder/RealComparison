import {Property} from '../src/types/Property';
import mockProperty from './MockProperty';

function mockRecommendations(): Promise<Property[]> {
  return new Promise<Property[]>(async (resolve, reject) => {
    resolve([mockProperty, {...mockProperty}]);
  });
}

export default mockRecommendations;

//   new Promise((resolve, reject) => resolve([mockProperty, {...mockProperty}]));
