import Backbone from 'backbone';

export default Backbone.Model.extend({

  urlRoot: 'https://guarded-ridge-7410.herokuapp.com/decks/:id/cards',

  idAttribute: 'id',

  templateData() {
    let data = this.toJSON();
    return data;
  }

});