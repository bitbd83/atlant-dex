// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import api from './api';

export const coinsInfo = ({period, currencies}) => api.get(`/exchange/coinsInfo?period=${period}${currencies}`);
