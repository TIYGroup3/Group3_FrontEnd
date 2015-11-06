import Backbone from 'backbone';

export default Backbone.Model.extend({

  urlRoot: 'https://guarded-ridge-7410.herokuapp.com/decks',

  idAttribute: 'id',

  templateData() {
    let data = this.toJSON();
    return data;
  }

});