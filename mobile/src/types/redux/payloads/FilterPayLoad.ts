import {PropertyFilter} from '../../Property';

type filterKeys = keyof PropertyFilter;
type filterValues = PropertyFilter[filterKeys];

type FilterPayLoad = {
  filterKey: filterKeys;
  value: filterValues;
};

export default FilterPayLoad;
