import Backbone from 'backbone';
import Cookies from 'js-cookie';
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import {
  DeckModel,
  DeckCollection
} from './resources';

import Register from './views/user/register';
import LoginPage from './views/user/login';
import AddDeckPage from './views/deck/addDeck';
import Table from './views/deck/table';
import UserPage from './views/user/user_page';
// import Header from './views/user/header.js';

import Data from './dummy_data';

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
    'addCard'  : 'addCard',

    'checkUser' : 'checkUser',

  },

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
      console.log('data:', data);
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
    let request = $.ajax({
      url: `https://guarded-ridge-7410.herokuapp.com/decks`,
      method: 'POST',
      data: {
        title: $('#deck').val(),
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
    // console.log(JSON.parse(Cookies.get('user')));
    let titleThing = Cookies.get('user');
    let ttObj = JSON.parse(titleThing);

    // console.log('cookie', Cookies.getJSON('user'));
    console.log(JSON.parse(Cookies.get('user')));

    let request = $.ajax({
      url: `https://guarded-ridge-7410.herokuapp.com/decks/:id/cards`,
      method: 'POST',
      data: {
        front: $('#cardFront').val(),
        back: $('#cardBack').val(),
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
      this.redirect('deckDetail/:id');
    }).fail(() => {
      $('.app').html('Oops..');
    });
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

    ReactDom.render(
      <UserPage
        user={Cookies.getJSON('user')}
        onAddDeckClick={() => this.navigate('addDeckPage', {trigger: true})}/>,
      document.querySelector('.app')
    );
  },

  addDeckPage() {
    // ReactDom.render(
    //   <Header
    //     user={Cookies.getJSON('user')}
    //     onLogoutClick={() => this.navigate('logout', {trigger: true})}
    //     onUserClick={() => this.navigate('userPage', {trigger: true})}/>,
    //   document.querySelector('.header')
    // );

    ReactDom.render(
      <AddDeckPage
      onAddDeckClick={() => this.navigate('addDeck', {trigger: true})}/>,
      document.querySelector('.app')
    );
  },

  deckDetail(id) {

    let getDeckId = Cookies.get('user');
    let DeckId = JSON.parse(getDeckId);
    console.dir(DeckId.deck.id);

    let titleThing = Cookies.get('user');
    let ttObj = JSON.parse(titleThing);
    console.dir(ttObj.deck.title);

    // ReactDom.render(
    //   <Header
    //     user={Cookies.getJSON('user')}
    //     onLogoutClick={() => this.navigate('logout', {trigger: true})}
    //     onUserClick={() => this.navigate('userPage', {trigger: true})}/>,
    //   document.querySelector('.header')
    // );

    ReactDom.render(
      <Table
        people={Data}
        title={ttObj.deck.title}
        user={Cookies.getJSON('user')}
        onAddCardClick={() => this.navigate('addCard', {trigger: true})}/>,
      document.querySelector('.app')
    );
  }
  
});
