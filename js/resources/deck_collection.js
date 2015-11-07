import Backbone from 'backbone';
import Deck from './deck_model';

export default Backbone.Model.extend({

  url: 'https://guarded-ridge-7410.herokuapp.com',

  model: Deck,

  parse(data) {
    return data.results;
  }

});