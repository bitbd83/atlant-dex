// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import {countryCurrencies} from '@/store/staticData/countryCurrencies';
import {countryData} from '@/store/staticData/countryData';

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

export const getCountryName = (countryCode) => {
  return countryData[countryCode].name;
};

export const getCountryCode = (countryCode) => {
  return countryData[countryCode].code;
};

export const getCountryCurrency = (countryCode) => {
  return countryCurrencies[countryCode];
};

export const getCountryByCurrency = (currency) => {
  let country = getKeyByValue(countryCurrencies, currency);
  return country ? country : 'us';
};
