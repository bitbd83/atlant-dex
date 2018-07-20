// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import api from './api';

export const getCandlesCollection = ({period, pair}) => api.get('/candlescollection?', {params: {period, pair}});
