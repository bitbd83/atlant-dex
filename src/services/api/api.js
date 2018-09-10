// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import axios from 'axios';
import store from '@/store';
import {baseURL, timeout} from '@/config';
import {serverNotification2} from '../notification';
import RFC4122 from 'rfc4122';

let UUIDGenerator = new RFC4122();

const instance = axios.create({
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const isLoggedIn = store.getters['membership/isLoggedIn'];
  const token = (isLoggedIn) ? store.state.membership.token : null;
  config.headers.Authorization = 'token ' + token;
  config.headers['X-Correlation-Id'] = UUIDGenerator.v4f();
  return config;
});

instance.interceptors.response.use((response) => {
  store.dispatch('membership/rememberLastAction');
  return response;
}, ({response, code}) => {
  if (code === 'ECONNABORTED') {
    response = {
      status: 408,
      data: {
        status: '408',
      },
    };
  }

  const {status, config} = response || {};

  if (status === 401) {
    return new Promise((resolve, reject) => {
      store.dispatch('membership/tryReconnect', {response}).then((res) => {
        const token = store.state.membership.token;
        config.headers.Authorization = 'token ' + token;
        resolve(axios(config));
      })
        .catch(console.error);
    });
  } else {
    serverNotification2(response);
    return Promise.reject(response);
  }
  return Promise.reject(response);
});

export default instance;
