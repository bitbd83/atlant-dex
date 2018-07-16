// Copyright 2017, 2018 Tensigma Ltd.

// Licensed under the Microsoft Reference Source License (MS-RSL)

// This license governs use of the accompanying software. If you use the software, you accept this license.
// If you do not accept the license, do not use the software.

// 1. Definitions
// The terms "reproduce," "reproduction," and "distribution" have the same meaning here as under U.S. copyright law.
// "You" means the licensee of the software.
// "Your company" means the company you worked for when you downloaded the software.
// "Reference use" means use of the software within your company as a reference, in read only form, for the sole purposes
// of debugging your products, maintaining your products, or enhancing the interoperability of your products with the
// software, and specifically excludes the right to distribute the software outside of your company.
// "Licensed patents" means any Licensor patent claims which read directly on the software as distributed by the Licensor
// under this license.

// 2. Grant of Rights
// (A) Copyright Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free copyright license to reproduce the software for reference use.
// (B) Patent Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free patent license under licensed patents for reference use.

// 3. Limitations
// (A) No Trademark License- This license does not grant you any rights to use the Licensor’s name, logo, or trademarks.
// (B) If you begin patent litigation against the Licensor over patents that you think may apply to the software
// (including a cross-claim or counterclaim in a lawsuit), your license to the software ends automatically.
// (C) The software is licensed "as-is." You bear the risk of using it. The Licensor gives no express warranties,
// guarantees or conditions. You may have additional consumer rights under your local laws which this license cannot
// change. To the extent permitted under your local laws, the Licensor excludes the implied warranties of merchantability,
// fitness for a particular purpose and non-infringement.

/* eslint-disable */
import Vue from 'vue';

const props = [
  'firstName',
  'lastName',
  'country',
  'city',
  'address',
  'postCode',
  'phoneNumber',
  'dateOfBirth',
  'passportId',
  'passportScan',
  'selfie',
  'proofOfResidenceScan',
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class VerificationData {
  constructor(data) {
    this._init();
    this._dateOfBirth = null;
    this._day = '';
    this._month = '';
    this._year = '';
    if (data && typeof data === 'object') {
      this._setData(data);
    }
  };
  _init() {
    props.forEach((prop) => Vue.set(this, prop, ''));
  }
  _setData(data) {
    Object.keys(data).forEach((key) => {
      Vue.set(this, key, data[key]);
    });
  }
  _setDateOfBirth() {
    if (this._day && this._month && this._year) {
      this._dateOfBirth = new Date(`${this._year}-${this._month}-${this._day}`);
    }
  }
  set dateOfBirth(dateOfBirth) {
    this._dateOfBirth = new Date(dateOfBirth);
    this._day = this._dateOfBirth.getDate();
    this._month = (months[this._dateOfBirth.getMonth()]);
    this._year = this._dateOfBirth.getFullYear();
  }
  set day(day) {
    this._day = day;
  }
  set month(month) {
    this._month = month;
  }
  set year(year) {
    this._year = year;
  }
  get dateOfBirth() {
    return `${this._year}-${months.indexOf(this._month) + 1}-${this._day}`;
  }
  get day() {
    return this._day;
  }
  get month() {
    return this._month;
  }
  get year() {
    return this._year;
  }
  getFormData() {
    const formData = new FormData();
    props.forEach((prop) => {
      formData.append(prop, this[prop]);
    });
    return formData;
  }
}
