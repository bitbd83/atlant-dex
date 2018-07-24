import {shallowMount} from '@vue/test-utils';
import Tile from '../src/components/grid/Tile.vue';

describe(
  'Tile.vue',
  () => {
    const wrapper = shallowMount(
      Tile,
      {
        propsData: {
          left: 100,
          top: 100,
          name: 'test name',
        },
      }
    );

    it(
      'should be visible',
      () => {
        expect(wrapper.isVisible()).toBe(true);
      }
    );

    it(
      'z-index should more than 0',
      () => {
        expect(wrapper.vm.getMaxZIndex()).toBeGreaterThan(0);
      }
    );

    it('should have a position x: 100px and y: 100px', () => {
      expect(wrapper.vm.style.left).toBe('100px');
      expect(wrapper.vm.style.top).toBe('100px');
    });
  }
);
