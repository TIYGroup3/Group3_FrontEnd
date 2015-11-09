import Backbone from 'backbone';
import Cookies from 'js-cookie';
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import {
  DeckModel,
  DeckCollection,
  CardModel,
  CardCollection
} from './resources';

import Register from './views/user/register';
import LoginPage from './views/user/login';
import AddDeckPage from './views/deck/addDeck';
import AddCardPage from './views/deck/addCard';
import DeckDetail from './views/deck/deckDetail';
import UserPage from './views/user/user_page';
// import Header from './views/user/header.js';

export default Backbone.Router.extend({

  routes: {
    ''         : 'home',

    'loginPage': 'loginPage',
    'login'    : 'login',
    'logout'   : 'logout',

    'registerPage' : 'registerPage',
    'register' : 'register',

    'userPage' : 'userPage',
    'addDeck' : 'addDeck',
    'addDeckPage' : 'addDeckPage',
    'getDeck' : 'getDeck',

    'deckDetail/:id' : 'deckDetail',
    'addCardPage/:id' : 'addCardPage',
    'addCard'  : 'addCard',

    'checkUser' : 'checkUser',

  },

  // initialize: function(appElement) {
  //   this.el = appElement;

  //   this.decks = new DeckCollection();

  //   this.cards = new CardCollection();

  //   let router = this;
  // },

  checkUser() {
    if (Cookies.get('user')) {
      this.redirect('userPage');
    } else {
      this.redirect('loginPage');
    }
  },

  home() {
    this.navigate('checkUser', {trigger: true});
  },

  start() {
    Backbone.history.start();
  },

  redirect(route) {
    this.navigate(route, {
      trigger: true,
      replace: true
    });
  },

  register() {
    let request = $.ajax({
      url: `https://guarded-ridge-7410.herokuapp.com/users/register`,
      method: 'POST',
      data: {
        username: $('#username').val(),
        fullname: $('#fullname').val(),
        email: $('#email').val(),
        password: $('#password').val(),
      }
    });
    $('.app').html('loading...');
    request.then((data) => {
      console.log('data:', data);
      Cookies.set('user', data);
      $.ajaxSetup({
        headers: {
          'Access-Key': data.user.access_key
        }
      });
      this.redirect('userPage');
    }).fail(() => {
      $('.app').html('Submit again');
    });
  },

  login() {
    let request = $.ajax({
      url: `https://guarded-ridge-7410.herokuapp.com/users/login`,
      method: 'POST',
      data: {
        username: $('#username').val(),
        password: $('#password').val(),
      }
    });
    $('.app').html('loading...');
    request.then((data) => {
      // console.log('data:', data);
      Cookies.set('user', data);
      $.ajaxSetup({
        headers: {
          'Access-Key': data.user.access_key
        }
      });
      this.redirect('userPage');
    }).fail(() => {
      $('.app').html('Try again');
    });
  },

  addDeck() {
    console.log(Cookies.getJSON('user'));

    let request = $.ajax({
      url: `https://guarded-ridge-7410.herokuapp.com/decks`,
      method: 'POST',
      data: {
        title: $('#deck').val(),
      }
    });

    $('.app').html('loading...');
    request.then((data) => {
      // console.log('data:', data);
      Cookies.set('user', data);
      $.ajaxSetup({
        headers: {
          auth_token: data.access_token
        }
      });
      this.redirect('userPage');
    }).fail(() => {
      $('.app').html('Oops..');
    });
  },

  getDeck() {
    console.log(JSON.parse(Cookies.get('user')).user.access_key);
    let request = $.ajax({
      url: `https://guarded-ridge-7410.herokuapp.com/decks`,
      method: 'GET',
      data: {
        owner: 'mine',
      }
    });
    $('.app').html('loading...');
    request.then((data) => {
      console.log('data:', data);
      Cookies.set('user', data);
      $.ajaxSetup({
        headers: {
          auth_token: data.access_token
        }
      });
      this.redirect('userPage');
    }).fail(() => {
      $('.app').html('Oops..');
    });
  },

  addCard() {

    let request = $.ajax({
      url: `https://guarded-ridge-7410.herokuapp.com/decks/:id/cards`,
      method: 'POST',
      data: {
        front: $('#cardFront').val(),
        back: $('#cardBack').val(),
        // deck_id: '69',
      }
    });
    $('.app').html('loading...');
    request.then((data) => {
      console.log('data:', data);
      Cookies.set('user', data);
      $.ajaxSetup({
        headers: {
          auth_token: data.access_token
        }
      });
      this.navigate('userPage', {trigger: true});
    }).fail(() => {
      $('.app').html('Oops..');
    });

    // console.log(Cookies.getJSON('user').deck.id);
  },

  logout() {
    Cookies.remove('user');
    $.ajaxSetup({
      headers: {
        auth_token: null
      }
    });
    this.redirect('');
  },

  loginPage() {
    // ReactDom.render(
    //   <Header
    //     user={Cookies.getJSON('user')}
    //     onLogoutClick={() => this.navigate('logout', {trigger: true})}
    //     onUserClick={() => this.navigate('userPage', {trigger: true})}/>,
    //   document.querySelector('.header')
    // );

    ReactDom.render( 
      <LoginPage
        user={Cookies.getJSON('user')}
        onLoginClick={() => this.navigate('login', {trigger: true})}
        onLogoutClick={() => this.navigate('logout', {trigger: true})}
        onRegisterPageClick={() => this.navigate('registerPage', {trigger: true})}/>,
      document.querySelector('.app')
    );
  },

  registerPage() {
    // ReactDom.render(
    //   <Header
    //     user={Cookies.getJSON('user')}
    //     onLogoutClick={() => this.navigate('logout', {trigger: true})}
    //     onUserClick={() => this.navigate('userPage', {trigger: true})}/>,
    //   document.querySelector('.header')
    // );

    ReactDom.render(
      <Register 
        user={Cookies.getJSON('user')}
        onRegisterClick={() => this.navigate('register', {trigger: true})}/>,
      document.querySelector('.app')
    );
  },

  userPage() {
    // ReactDom.render(
    //   <Header
    //     user={Cookies.getJSON('user')}
    //     onLogoutClick={() => this.navigate('logout', {trigger: true})}
    //     onUserClick={() => this.navigate('userPage', {trigger: true})}/>,
    //   document.querySelector('.header')
    // );

    let request = $.ajax({
      url: `https://guarded-ridge-7410.herokuapp.com/decks`,
      method: 'GET',
      data: {
        owner: 'mine',
      }
    });
    $('.app').html('loading...');
    request.then((data) => {
      // console.log('decks:', data);
      Cookies.set('user', data);
      $.ajaxSetup({
        headers: {
          auth_token: data.access_token
        }
      });
      ReactDom.render(
        <UserPage
          data={data.decks}
          user={Cookies.getJSON('user')}
          onDeckSelect={id => this.navigate(`deckDetail/${id}`, {trigger: true})}
          onAddDeckClick={() => this.navigate('addDeckPage', {trigger: true})}/>,
        document.querySelector('.app')
      );
    }).fail(() => {
      $('.app').html('Oops..');
    });
  },

  addDeckPage() {
    // ReactDom.render(
    //   <Header
    //     user={Cookies.getJSON('user')}
    //     onLogoutClick={() => this.navigate('logout', {trigger: true})}
    //     onUserClick={() => this.navigate('userPage', {trigger: true})}/>,
    //   document.querySelector('.header')
    // );

    console.log(Cookies.get('user'));

    ReactDom.render(
      <AddDeckPage
      onAddDeckClick={() => this.navigate('addDeck', {trigger: true})}/>,
      document.querySelector('.app')
    );
  },

  addCardPage(id) {

    // let request = $.ajax({
    //   url: `https://guarded-ridge-7410.herokuapp.com/decks`,
    //   method: 'GET',
    //   data: {
    //     owner: 'mine',
    //   }
    // });
    // $('.app').html('loading...');
    // request.then((data) => {
    //   console.log('decks:', data);
    //   Cookies.set('user', data);
    //   $.ajaxSetup({
    //     headers: {
    //       auth_token: data.access_token
    //     }
    //   });
    //   ReactDom.render(
    //     <AddCardPage
    //     onAddCardClick={id => this.navigate('addCard', {trigger: true})}/>,
    //     document.querySelector('.app')
    //   );
    // }).fail(() => {
    //   $('.app').html('Oops..');
    // });

    ReactDom.render(
      <AddCardPage
      onAddCardClick={id => this.navigate('addCard', {trigger: true})}/>,
      document.querySelector('.app')
    );
  },

  deckDetail(id) {
    // ReactDom.render(
    //   <Header
    //     user={Cookies.getJSON('user')}
    //     onLogoutClick={() => this.navigate('logout', {trigger: true})}
    //     onUserClick={() => this.navigate('userPage', {trigger: true})}/>,
    //   document.querySelector('.header')
    // );

    // function sendData (sData) {
    //   location.search = sData;
    // }

    // console.log(Cookies.getJSON('user'));
    // console.log(Cookies.getJSON('user').deck.id);
    let request = $.ajax({
      url: `https://guarded-ridge-7410.herokuapp.com/decks/${id}/cards`,
      method: 'GET',
      data: {
        // front: 'cardFront',
        // back: 'cardBack',
      }
    });
    $('.app').html('loading...');
    request.then((data) => {
      console.log('data:', data);
      Cookies.set('user', data);
      $.ajaxSetup({
        headers: {
          auth_token: data.access_token
          // 'Access-Key': data.user.access_key
        }
      });
      ReactDom.render(
        <DeckDetail
        // deck={this.deck.title}
        data={data.cards}
        user={Cookies.getJSON('user')}
        onAddCardClick={() => this.navigate(`addCardPage/${id}`, {trigger: true})}/>,
        document.querySelector('.app')
      );
    }).fail(() => {
      $('.app').html('Oops..');
    });

    // ReactDom.render(
    //   <DeckDetail
    //   // deck={this.deck.title}
    //   user={Cookies.getJSON('user')}
    //   onAddCardClick={() => this.navigate(`addCardPage/${id}`, {trigger: true})}/>,
    //   document.querySelector('.app')
    // );
  }
  
});
