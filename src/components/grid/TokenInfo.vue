// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
Tile(
  :name="data.name"
  :left="data.x"
  :top="data.y"
)
  TileHeader(
    :name="data.name"
  )

  TileContent(
    :height="data.height"
    :width="data.width"
    :name="data.name"
  )
    .tokenInfo
      .tokenInfo__container(v-scrollbar="")
        #mapid(@mouseleave="show_gradient = true")
        .tokenInfo__gradientBlock(v-if="show_gradient" @mouseenter="show_gradient = false")
          .tokenInfo__tickerRow
            img(:src="ticker_icon")
            .tokenInfo__tickerChange {{ change }}%
          .tokenInfo__tickerRow
            .tokenInfo__tickerSymbol {{ ticker }}
          .tokenInfo__tickerRow
            h2 {{ address }}
          .tokenInfo__tickerDescription {{ description }}
          .tokenInfo__tickerRow
            a.tokenInfo__link(:href="link") {{ link }}

        .tokenInfo__labelsRow.tokenInfo__labelsRow--first
          .tokenInfo__label
            span {{$t('tokenised')}}:
            span {{ tokenised }}
          .tokenInfo__label.tokenInfo__label--down
            span {{$t('volume_24h')}}:
            span {{ volume | currency(' USD', 0, { thousandsSeparator: '.', decimalSeparator: ',', symbolOnLeft: false }) }}
        .tokenInfo__labelsRow
          .tokenInfo__label.tokenInfo__label--down
            span {{$t('current_value')}}:
            span {{ value | currency(' USD', 0, { thousandsSeparator: '.', decimalSeparator: ',', symbolOnLeft: false }) }}
          .tokenInfo__label
            span {{$t('total_supply')}}:
            span {{ total | currency(' ' + ticker, 0, { thousandsSeparator: '.', decimalSeparator: ',', symbolOnLeft: false }) }}
</template>

<script>
import TileBase from '../../mixins/TileBase';
import {scrollbar} from '@/directives';
import 'leaflet';

export default {
  mixins: [TileBase],
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
      lat: 51.505,
      lng: -0.09,
      show_gradient: true,
      map: null,
    };
  },
  directives: {
    scrollbar,
  },
  mounted() {
    if (!this.map) {
      this.map = L.map(
        'mapid',
        {
          center: [this.lat, this.lng],
        }
      ).setView([this.lat - 0.002, this.lng - 0.01], 15);

      const myIcon = L.icon({
          iconUrl: '/static/imgs/pin.png',
          iconSize: [27, 38],
          iconAnchor: [27, 38],
          shadowAnchor: [27, 38],
      });

      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution: '',
          id: 'mapbox.streets',
        }).addTo(this.map);

      L.marker([this.lat, this.lng], {icon: myIcon}).addTo(this.map);
      // Hide copyrights
      document.getElementsByClassName('leaflet-control-attribution')[0].style.display = 'none';
    }
  },

};
</script>

<style lang="scss">
@import 'variables';
#mapid{
  position: absolute;
  width: 100%;
  height: 442px;
  z-index: 1;
}
.tokenInfo {
  display: flex;
  width: 100%;
  background-color: $background__white;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid $color__grey_border;

  &__gradientBlock{
    width: 100%;
    height: 442px;
    position: absolute;
    padding: 35px 45px 0;
    margin-bottom: 30px;
    z-index: 2;
    background: transparent;
    background: -moz-linear-gradient(left, rgba(252,252,252,1) 30%, rgba(5,171,224,0) 100%);
    background: -webkit-linear-gradient(left, rgba(252,252,252,1) 30%,rgba(5,171,224,0) 100%);
    background: linear-gradient(to right, rgba(252,252,252,1) 30%,rgba(5,171,224,0) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fcfcfc', endColorstr='#05abe0',GradientType=1 );
  }

  &__container {
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  &__tickerRow{
    display: flex;
    align-items: center;

    & h2{
      font-size: 20px;
      max-width: 200px;
      padding-bottom: 43px;
    }
  }

  &__tickerSymbol{
    padding: 35px 0 56px 19px;
    font-size: 16px;
    font-weight: 600;
  }

  &__tickerDescription{
    max-width: 289px;
    font-family: "Century Gothic";
    line-height: 24px;
  }

  &__tickerChange {
    color: $token-info-ticker-color;
    font-size: 18px;
    position: relative;
    padding-left: 37px;
    font-weight: 100;
  }

  &__tickerChange:before{
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
    padding: 40px 0 10px 37px;
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
  &__labelsRow{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__labelsRow{
    padding: 0 34px;

    &--first{
      margin-top: 472px;
    }
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
