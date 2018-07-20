// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import api from './api';

export const getCountries = () => api.get('geo/countries');
export const getCities = ({country}) => api.get(`geo/cities/${country}`);
