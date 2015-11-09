import Backbone from 'backbone';
import Card from './card_model';

export default Backbone.Model.extend({

  url: 'https://guarded-ridge-7410.herokuapp.com/decks/:id/cards',

  model: Card,

  parse(data) {
    return data.results;
  }

});