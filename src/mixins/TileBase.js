import Tile from '../components/grid/Tile';
import TileHeader from '../components/grid/TileHeader';
import TileContent from '../components/grid/TileContent';

export default{
  components: {
    Tile,
    TileHeader,
    TileContent,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
