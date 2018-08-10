// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

export const birthdayDays = (() => {
  const numbers = [];
  for (let i = 1; i <= 31; i++) {
    numbers.push(i);
  }
  return numbers;
})();

export const birthdayYears = (() => {
  const numbers = [];
  const yearLimit = new Date().getFullYear() - 18;
  for (let i = yearLimit; i >= 1918; i--) {
    numbers.push(i);
  }
  return numbers;
})();
