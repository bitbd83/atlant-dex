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
.tokenInfo
  .tokenInfo__container(v-scrollbar="")
    #mapid(@mouseleave="show_gradient = true")
    .tokenInfo__gradientBlock(v-if="show_gradient" @mouseenter="show_gradient = false")
      .tokenInfo__ticker-row
        img(:src="ticker_icon")
        .tokenInfo__ticker-change {{ change }}%
      .tokenInfo__ticker-row
        .tokenInfo__ticker-symbol {{ ticker }}
      .tokenInfo__ticker-row
        h2 {{ address }}
      .tokenInfo__ticker-description {{ description }}
      .tokenInfo__ticker-row
        a.tokenInfo__link(:href="link") {{ link }}

    .tokenInfo__labels-row.tokenInfo__labels-row--first
      .tokenInfo__label
        span Tokenised:
        span {{ tokenised }}
      .tokenInfo__label.tokenInfo__label--down
        span Volume 24h:
        span {{ volume | currency(' USD', 0, { thousandsSeparator: '.', decimalSeparator: ',', symbolOnLeft: false }) }}
    .tokenInfo__labels-row
      .tokenInfo__label.tokenInfo__label--down
        span Current value:
        span {{ value | currency(' USD', 0, { thousandsSeparator: '.', decimalSeparator: ',', symbolOnLeft: false }) }}
      .tokenInfo__label
        span Total Supply:
        span {{ total | currency(' ' + ticker, 0, { thousandsSeparator: '.', decimalSeparator: ',', symbolOnLeft: false }) }}
</template>

<script>
import {scrollbar} from '@/directives';
import 'leaflet';

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
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
          shadowSize: [68, 95],
          shadowAnchor: [22, 94],
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '',
        id: 'mapbox.streets',
      }).addTo(this.map);

      L.marker([51.5, -0.09], {icon: myIcon}).addTo(this.map);
      // Hide copyrights
      document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';
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
  &__labels-row{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__labels-row{
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

/* Default icon URLs */
.leaflet-default-icon-path {
  background-image: url(/static/imgs/pin.png);
}

.leaflet-pane,
.leaflet-tile,
.leaflet-marker-icon,
.leaflet-marker-shadow,
.leaflet-tile-container,
.leaflet-pane > svg,
.leaflet-pane > canvas,
.leaflet-zoom-box,
.leaflet-image-layer,
.leaflet-layer {
  position: absolute;
  left: 0;
  top: 0;
  }
.leaflet-container {
  overflow: hidden;
  }
.leaflet-tile,
.leaflet-marker-icon,
.leaflet-marker-shadow {
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
    -webkit-user-drag: none;
  }
/* Safari renders non-retina tile on retina better with this, but Chrome is worse */
.leaflet-safari .leaflet-tile {
  image-rendering: -webkit-optimize-contrast;
  }
/* hack that prevents hw layers "stretching" when loading new tiles */
.leaflet-safari .leaflet-tile-container {
  width: 1600px;
  height: 1600px;
  -webkit-transform-origin: 0 0;
  }
.leaflet-marker-icon,
.leaflet-marker-shadow {
  display: block;
  }
/* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */
/* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */
.leaflet-container .leaflet-overlay-pane svg,
.leaflet-container .leaflet-marker-pane img,
.leaflet-container .leaflet-shadow-pane img,
.leaflet-container .leaflet-tile-pane img,
.leaflet-container img.leaflet-image-layer {
  max-width: none !important;
  max-height: none !important;
  }

.leaflet-container.leaflet-touch-zoom {
  -ms-touch-action: pan-x pan-y;
  touch-action: pan-x pan-y;
  }
.leaflet-container.leaflet-touch-drag {
  -ms-touch-action: pinch-zoom;
  /* Fallback for FF which doesn't support pinch-zoom */
  touch-action: none;
  touch-action: pinch-zoom;
}
.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
  -ms-touch-action: none;
  touch-action: none;
}
.leaflet-container {
  -webkit-tap-highlight-color: transparent;
}
.leaflet-container a {
  -webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);
}
.leaflet-tile {
  filter: inherit;
  visibility: hidden;
  }
.leaflet-tile-loaded {
  visibility: inherit;
  }
.leaflet-zoom-box {
  width: 0;
  height: 0;
  -moz-box-sizing: border-box;
       box-sizing: border-box;
  z-index: 800;
  }
/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */
.leaflet-overlay-pane svg {
  -moz-user-select: none;
  }

.leaflet-pane         { z-index: 400; }

.leaflet-tile-pane    { z-index: 200; }
.leaflet-overlay-pane { z-index: 400; }
.leaflet-shadow-pane  { z-index: 500; }
.leaflet-marker-pane  { z-index: 600; }
.leaflet-tooltip-pane   { z-index: 650; }
.leaflet-popup-pane   { z-index: 700; }

.leaflet-map-pane canvas { z-index: 100; }
.leaflet-map-pane svg    { z-index: 200; }

.leaflet-vml-shape {
  width: 1px;
  height: 1px;
  }
.lvml {
  behavior: url(#default#VML);
  display: inline-block;
  position: absolute;
  }


/* control positioning */

.leaflet-control {
  position: relative;
  z-index: 800;
  pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */
  pointer-events: auto;
  }
.leaflet-top,
.leaflet-bottom {
  position: absolute;
  z-index: 1000;
  pointer-events: none;
  }
.leaflet-top {
  top: 0;
  }
.leaflet-right {
  right: 0;
  }
.leaflet-bottom {
  bottom: 0;
  }
.leaflet-left {
  left: 0;
  }
.leaflet-control {
  float: left;
  clear: both;
  }
.leaflet-right .leaflet-control {
  float: right;
  }
.leaflet-top .leaflet-control {
  margin-top: 10px;
  }
.leaflet-bottom .leaflet-control {
  margin-bottom: 10px;
  }
.leaflet-left .leaflet-control {
  margin-left: 10px;
  }
.leaflet-right .leaflet-control {
  margin-right: 10px;
  }


/* zoom and fade animations */

.leaflet-fade-anim .leaflet-tile {
  will-change: opacity;
  }
.leaflet-fade-anim .leaflet-popup {
  opacity: 0;
  -webkit-transition: opacity 0.2s linear;
     -moz-transition: opacity 0.2s linear;
       -o-transition: opacity 0.2s linear;
          transition: opacity 0.2s linear;
  }
.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {
  opacity: 1;
  }
.leaflet-zoom-animated {
  -webkit-transform-origin: 0 0;
      -ms-transform-origin: 0 0;
          transform-origin: 0 0;
  }
.leaflet-zoom-anim .leaflet-zoom-animated {
  will-change: transform;
  }
.leaflet-zoom-anim .leaflet-zoom-animated {
  -webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);
     -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);
       -o-transition:      -o-transform 0.25s cubic-bezier(0,0,0.25,1);
          transition:         transform 0.25s cubic-bezier(0,0,0.25,1);
  }
.leaflet-zoom-anim .leaflet-tile,
.leaflet-pan-anim .leaflet-tile {
  -webkit-transition: none;
     -moz-transition: none;
       -o-transition: none;
          transition: none;
  }

.leaflet-zoom-anim .leaflet-zoom-hide {
  visibility: hidden;
  }


/* cursors */

.leaflet-interactive {
  cursor: pointer;
  }
.leaflet-grab {
  cursor: -webkit-grab;
  cursor:    -moz-grab;
  }
.leaflet-crosshair,
.leaflet-crosshair .leaflet-interactive {
  cursor: crosshair;
  }
.leaflet-popup-pane,
.leaflet-control {
  cursor: auto;
  }
.leaflet-dragging .leaflet-grab,
.leaflet-dragging .leaflet-grab .leaflet-interactive,
.leaflet-dragging .leaflet-marker-draggable {
  cursor: move;
  cursor: -webkit-grabbing;
  cursor:    -moz-grabbing;
  }

/* marker & overlays interactivity */
.leaflet-marker-icon,
.leaflet-marker-shadow,
.leaflet-image-layer,
.leaflet-pane > svg path,
.leaflet-tile-container {
  pointer-events: none;
  }

.leaflet-marker-icon.leaflet-interactive,
.leaflet-image-layer.leaflet-interactive,
.leaflet-pane > svg path.leaflet-interactive {
  pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */
  pointer-events: auto;
  }

/* visual tweaks */

.leaflet-container {
  background: #ddd;
  outline: 0;
  }
.leaflet-container a {
  color: #0078A8;
  }
.leaflet-container a.leaflet-active {
  outline: 2px solid orange;
  }
.leaflet-zoom-box {
  border: 2px dotted #38f;
  background: rgba(255,255,255,0.5);
  }


/* general typography */
.leaflet-container {
  font: 12px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;
  }


/* general toolbar styles */

.leaflet-bar {
  box-shadow: 0 1px 5px rgba(0,0,0,0.65);
  border-radius: 4px;
  }
.leaflet-bar a,
.leaflet-bar a:hover {
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  width: 26px;
  height: 26px;
  line-height: 26px;
  display: block;
  text-align: center;
  text-decoration: none;
  color: black;
  }
.leaflet-bar a,
.leaflet-control-layers-toggle {
  background-position: 50% 50%;
  background-repeat: no-repeat;
  display: block;
  }
.leaflet-bar a:hover {
  background-color: #f4f4f4;
  }
.leaflet-bar a:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  }
.leaflet-bar a:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom: none;
  }
.leaflet-bar a.leaflet-disabled {
  cursor: default;
  background-color: #f4f4f4;
  color: #bbb;
  }

.leaflet-touch .leaflet-bar a {
  width: 30px;
  height: 30px;
  line-height: 30px;
  }
.leaflet-touch .leaflet-bar a:first-child {
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  }
.leaflet-touch .leaflet-bar a:last-child {
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  }

/* zoom control */

.leaflet-control-zoom-in,
.leaflet-control-zoom-out {
  font: bold 18px 'Lucida Console', Monaco, monospace;
  text-indent: 1px;
  }

.leaflet-touch .leaflet-control-zoom-in, .leaflet-touch .leaflet-control-zoom-out  {
  font-size: 22px;
  }


/* layers control */

.leaflet-control-layers {
  box-shadow: 0 1px 5px rgba(0,0,0,0.4);
  background: #fff;
  border-radius: 5px;
  }
.leaflet-touch .leaflet-control-layers-toggle {
  width: 44px;
  height: 44px;
  }
.leaflet-control-layers .leaflet-control-layers-list,
.leaflet-control-layers-expanded .leaflet-control-layers-toggle {
  display: none;
  }
.leaflet-control-layers-expanded .leaflet-control-layers-list {
  display: block;
  position: relative;
  }
.leaflet-control-layers-expanded {
  padding: 6px 10px 6px 6px;
  color: #333;
  background: #fff;
  }
.leaflet-control-layers-scrollbar {
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 5px;
  }
.leaflet-control-layers-selector {
  margin-top: 2px;
  position: relative;
  top: 1px;
  }
.leaflet-control-layers label {
  display: block;
  }
.leaflet-control-layers-separator {
  height: 0;
  border-top: 1px solid #ddd;
  margin: 5px -10px 5px -6px;
  }


/* attribution and scale controls */

.leaflet-container .leaflet-control-attribution {
  background: #fff;
  background: rgba(255, 255, 255, 0.7);
  margin: 0;
  }
.leaflet-control-attribution,
.leaflet-control-scale-line {
  padding: 0 5px;
  color: #333;
  }
.leaflet-control-attribution a {
  text-decoration: none;
  }
.leaflet-control-attribution a:hover {
  text-decoration: underline;
  }
.leaflet-container .leaflet-control-attribution,
.leaflet-container .leaflet-control-scale {
  font-size: 11px;
  }
.leaflet-left .leaflet-control-scale {
  margin-left: 5px;
  }
.leaflet-bottom .leaflet-control-scale {
  margin-bottom: 5px;
  }
.leaflet-control-scale-line {
  border: 2px solid #777;
  border-top: none;
  line-height: 1.1;
  padding: 2px 5px 1px;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  -moz-box-sizing: border-box;
       box-sizing: border-box;

  background: #fff;
  background: rgba(255, 255, 255, 0.5);
  }
.leaflet-control-scale-line:not(:first-child) {
  border-top: 2px solid #777;
  border-bottom: none;
  margin-top: -2px;
  }
.leaflet-control-scale-line:not(:first-child):not(:last-child) {
  border-bottom: 2px solid #777;
  }

.leaflet-touch .leaflet-control-attribution,
.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
  box-shadow: none;
  }
.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
  border: 2px solid rgba(0,0,0,0.2);
  background-clip: padding-box;
  }


/* popup */

.leaflet-popup {
  position: absolute;
  text-align: center;
  margin-bottom: 20px;
  }
.leaflet-popup-content-wrapper {
  padding: 1px;
  text-align: left;
  border-radius: 12px;
  }
.leaflet-popup-content {
  margin: 13px 19px;
  line-height: 1.4;
  }
.leaflet-popup-content p {
  margin: 18px 0;
  }
.leaflet-popup-tip-container {
  width: 40px;
  height: 20px;
  position: absolute;
  left: 50%;
  margin-left: -20px;
  overflow: hidden;
  pointer-events: none;
  }
.leaflet-popup-tip {
  width: 17px;
  height: 17px;
  padding: 1px;

  margin: -10px auto 0;

  -webkit-transform: rotate(45deg);
     -moz-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
       -o-transform: rotate(45deg);
          transform: rotate(45deg);
  }
.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
  background: white;
  color: #333;
  box-shadow: 0 3px 14px rgba(0,0,0,0.4);
  }
.leaflet-container a.leaflet-popup-close-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 4px 0 0;
  border: none;
  text-align: center;
  width: 18px;
  height: 14px;
  font: 16px/14px Tahoma, Verdana, sans-serif;
  color: #c3c3c3;
  text-decoration: none;
  font-weight: bold;
  background: transparent;
  }
.leaflet-container a.leaflet-popup-close-button:hover {
  color: #999;
  }
.leaflet-popup-scrolled {
  overflow: auto;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
  }

.leaflet-oldie .leaflet-popup-content-wrapper {
  zoom: 1;
  }
.leaflet-oldie .leaflet-popup-tip {
  width: 24px;
  margin: 0 auto;

  -ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";
  filter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);
  }
.leaflet-oldie .leaflet-popup-tip-container {
  margin-top: -1px;
  }

.leaflet-oldie .leaflet-control-zoom,
.leaflet-oldie .leaflet-control-layers,
.leaflet-oldie .leaflet-popup-content-wrapper,
.leaflet-oldie .leaflet-popup-tip {
  border: 1px solid #999;
  }


/* div icon */

.leaflet-div-icon {
  background: #fff;
  border: 1px solid #666;
  }


/* Tooltip */
/* Base styles for the element that has a tooltip */
.leaflet-tooltip {
  position: absolute;
  padding: 6px;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 3px;
  color: #222;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.4);
  }
.leaflet-tooltip.leaflet-clickable {
  cursor: pointer;
  pointer-events: auto;
  }
.leaflet-tooltip-top:before,
.leaflet-tooltip-bottom:before,
.leaflet-tooltip-left:before,
.leaflet-tooltip-right:before {
  position: absolute;
  pointer-events: none;
  border: 6px solid transparent;
  background: transparent;
  content: "";
  }

/* Directions */

.leaflet-tooltip-bottom {
  margin-top: 6px;
}
.leaflet-tooltip-top {
  margin-top: -6px;
}
.leaflet-tooltip-bottom:before,
.leaflet-tooltip-top:before {
  left: 50%;
  margin-left: -6px;
  }
.leaflet-tooltip-top:before {
  bottom: 0;
  margin-bottom: -12px;
  border-top-color: #fff;
  }
.leaflet-tooltip-bottom:before {
  top: 0;
  margin-top: -12px;
  margin-left: -6px;
  border-bottom-color: #fff;
  }
.leaflet-tooltip-left {
  margin-left: -6px;
}
.leaflet-tooltip-right {
  margin-left: 6px;
}
.leaflet-tooltip-left:before,
.leaflet-tooltip-right:before {
  top: 50%;
  margin-top: -6px;
  }
.leaflet-tooltip-left:before {
  right: 0;
  margin-right: -12px;
  border-left-color: #fff;
  }
.leaflet-tooltip-right:before {
  left: 0;
  margin-left: -12px;
  border-right-color: #fff;
  }
</style>
