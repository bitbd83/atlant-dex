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

<template lang='pug'>
.token-info
  .token-info__container(v-scrollbar="")
    .token-info__ticker-row
      img(:src="ticker_icon")
      .token-info__ticker-change {{ change }}%
    .token-info__ticker-row
      .token-info__ticker-symbol {{ ticker }}
    .token-info__ticker-row
      h2 {{ address }}
    .token-info__ticker-description {{ description }}
    .token-info__ticker-row
      a.token-info__link(:href="link") {{ link }}
    .token-info__labels-row
      .token-info__label
        span Tokenised:
        span {{ tokenised }}
      .token-info__label.token-info__label--down
        span Volume 24h:
        span {{ volume | currency(' USD', 0, { thousandsSeparator: '.', decimalSeparator: ',', symbolOnLeft: false }) }}
    .token-info__labels-row
      .token-info__label.token-info__label--down
        span Current value:
        span {{ value | currency(' USD', 0, { thousandsSeparator: '.', decimalSeparator: ',', symbolOnLeft: false }) }}
      .token-info__label
        span Total Supply:
        span {{ total | currency(' ' + ticker, 0, { thousandsSeparator: '.', decimalSeparator: ',', symbolOnLeft: false }) }}
</template>

<script>
// import {mapState, mapGetters, mapActions} from 'vuex';
import {scrollbar} from '@/directives';

export default {
  data() {
    return {
      icon: '',
      ticker: 'BMD',
      ticker_icon: '/static/ticker_icons/bmd.png',
      address: '42 E 12th St, New York',
      description: 'This Greenwich Village penthouse loft captures the ultimate dream of living in Manhattan.',
      link: 'bmd.atlant.io',
      change: 4.6,
      tokenised: '21/9/2018',
      value: '4270786',
      volume: '860541',
      total: '920700',
    };
  },
  directives: {
    scrollbar,
  },
};
</script>

<style lang="scss">
@import 'variables';
.token-info {
  display: flex;
  width: 100%;
  background-color: $background__white;
  padding: 35px 45px;
  border-radius: 8px;
  border: 1px solid $color__grey_border;

  &__container {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-right: 15px;
  }
  &__ticker-row{
    display: flex;
    align-items: center;

    & h2{
      font-size: 20px;
      max-width: 200px;
      padding-bottom: 43px;
    }
  }

  &__ticker-symbol{
    padding: 35px 0 56px 19px;
    font-size: 16px;
    font-weight: 600;
  }

  &__ticker-description{
    max-width: 289px;
    font-family: "Century Gothic";
    line-height: 24px;
  }

  &__ticker-change {
    color: $token-info-ticker-color;
    font-size: 18px;
    position: relative;
    padding-left: 37px;
    font-weight: 100;
  }

  &__ticker-change:before{
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 4.5px 8px 4.5px;
    border-color: transparent transparent #00ce7c transparent;
    position: absolute;
    left: 16px;
    top: 6px;
  }

  &__link{
    font-family: "Century Gothic";
    font-weight: bold;
    padding: 40px 0 40px 37px;
    position: relative;
    text-decoration: none;
    color: $color_black;
  }

  &__link:before{
    content: '';
    display: block;
    position: absolute;
    font-family: "Century Gothic";
    font-size: 14px;
    width: 24px;
    height: 14px;
    left: 0;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjE0cHgiIHZpZXdCb3g9IjAgMCAyNCAxNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5ub3VuXzUzNDc3OF9jYzwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJNQUlOIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJXSURHRVRTIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjMwLjAwMDAwMCwgLTM5NjEuMDAwMDAwKSI+ICAgICAgICAgICAgPHJlY3QgZmlsbD0iI0ZGRiIgeD0iMCIgeT0iMCIgd2lkdGg9IjI1MDYiIGhlaWdodD0iNjI0OCI+PC9yZWN0PiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0yMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTU4LjAwMDAwMCwgMzQ3My4wMDAwMDApIiBmaWxsPSIjMDA0REZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPiAgICAgICAgICAgICAgICA8ZyBpZD0ibm91bl81MzQ3NzhfY2MiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDcyLjAwMDAwMCwgNDg4LjAwMDAwMCkiPiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE0LDEwIEwxMCwxMCBDOS40NDgsMTAgOSw5LjU1MyA5LDkgQzksOC40NDcgOS40NDgsOCAxMCw4IEwxNCw4IEMxNS42NTQsOCAxNyw2LjY1NCAxNyw1IEMxNywzLjM0NiAxNS42NTQsMiAxNCwyIEw1LDIgQzMuMzQ2LDIgMiwzLjM0NiAyLDUgQzIsNS45NTMgMi40NjQsNi44NTkgMy4yNDMsNy40MjYgQzMuNjg5LDcuNzUxIDMuNzg3LDguMzc3IDMuNDYzLDguODIzIEMzLjEzOCw5LjI2OCAyLjUxMiw5LjM2NyAyLjA2Niw5LjA0MyBDMC43NzIsOC4xMDIgMCw2LjU5IDAsNSBDMCwyLjI0MyAyLjI0MywwIDUsMCBMMTQsMCBDMTYuNzU3LDAgMTksMi4yNDMgMTksNSBDMTksNy43NTcgMTYuNzU3LDEwIDE0LDEwIFogTTE5LDE0IEwxMCwxNCBDNy4yNDMsMTQgNSwxMS43NTcgNSw5IEM1LDYuMjQzIDcuMjQzLDQgMTAsNCBMMTQsNCBDMTQuNTUzLDQgMTUsNC40NDggMTUsNSBDMTUsNS41NTIgMTQuNTUzLDYgMTQsNiBMMTAsNiBDOC4zNDYsNiA3LDcuMzQ2IDcsOSBDNywxMC42NTQgOC4zNDYsMTIgMTAsMTIgTDE5LDEyIEMyMC42NTQsMTIgMjIsMTAuNjU0IDIyLDkgQzIyLDguMDQ4IDIxLjUzNSw3LjE0MSAyMC43NTcsNi41NzQgQzIwLjMxMSw2LjI0OSAyMC4yMTIsNS42MjMgMjAuNTM3LDUuMTc3IEMyMC44Niw0LjczIDIxLjQ4Niw0LjYzMSAyMS45MzQsNC45NTcgQzIzLjIyOCw1Ljg5OCAyNCw3LjQxIDI0LDkgQzI0LDExLjc1NyAyMS43NTcsMTQgMTksMTQgWiIgaWQ9IlNoYXBlIj48L3BhdGg+ICAgICAgICAgICAgICAgIDwvZz4gICAgICAgICAgICA8L2c+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=);
  }

  &__label,
  &__labels-row{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__label{
    width: 349px;
    padding: 18px 22px 17px 19px;
    border: 1px solid $color__grey_border;
    border-radius: 3px;
    margin-bottom: 36px;
    cursor: pointer;
    font-size: 16px;
    color: $color__blue;

    &:hover{
      background: $fill__blue;
      color: $color__white;
    }

    span:first-child{
      font-weight: 600;
    }

    &--down span:last-child{
      position: relative;

      &:before{
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 6px 3.5px 0 3.5px;
        border-color: red transparent transparent transparent;
        position: absolute;
        top: 6px;
        left: -20px;
      }
    }
  }
}
</style>
