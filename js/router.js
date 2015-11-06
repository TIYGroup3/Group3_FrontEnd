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
import Table from './views/deck/table';
import UserPage from './views/user/user_page';
import Header from './views/user/header.js';

import Data from './dummy_data';

export default Backbone.Router.extend({

  routes: {
    ''         : 'home',
    'header' : 'header',

    'loginPage': 'loginPage',
    'login'    : 'login',
    'logout'   : 'logout',

    'registerPage' : 'registerPage',
    'register' : 'register',

    'userPage' : 'userPage',
    'addDeck' : 'addDeck',
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
          auth_token: data.access_token
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
          auth_token: data.access_token
        }
      });
      this.redirect('userPage');
    }).fail(() => {
      $('.app').html('Try again');
    });
  },

  addDeck() {
    console.log(JSON.parse(Cookies.get('user')).user.access_key);
    let request = $.ajax({
      url: `https://guarded-ridge-7410.herokuapp.com/decks`,
      method: 'POST',
      data: {
        title: $('#deck').val(),
      },
      headers: {
        'Access-Key': JSON.parse(Cookies.get('user')).user.access_key
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
      this.redirect('deckDetail/:id');
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
      },
      headers: {
        'Access-Key': JSON.parse(Cookies.get('user')).user.access_key
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
    ReactDom.render(
      <Header
        user={Cookies.getJSON('user')}
        onLogoutClick={() => this.navigate('logout', {trigger: true})}
      />,
      document.querySelector('.header')
    );

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
    ReactDom.render(
      <Header
        user={Cookies.getJSON('user')}
        onLogoutClick={() => this.navigate('logout', {trigger: true})}
      />,
      document.querySelector('.header')
    );

    ReactDom.render(
      <Register 
        user={Cookies.getJSON('user')}
        onRegisterClick={() => this.navigate('register', {trigger: true})}/>,
      document.querySelector('.app')
    );
  },

  initialize() {
    this.collection = new DeckCollection();
  },

  userPage() {
    ReactDom.render(
      <Header
        user={Cookies.getJSON('user')}
        onLogoutClick={() => this.navigate('logout', {trigger: true})}
      />,
      document.querySelector('.header')
    );

    ReactDom.render(
      <UserPage
      onAddDeckClick={() => this.navigate('addDeck', {trigger: true})}/>,
      document.querySelector('.app')
    );
  },

  // userPage() {
  //   this.collection.fetch().then(() => {
  //     ReactDom.render(
  //       <UserPage 
  //       onDeckSelect={id => this.navigate(`deckDetail/${id}`, {trigger: true})}
  //       onAddDeckClick={() => this.navigate('addDeck', {trigger: true})}
  //       data={this.collection.toJSON()}/>,
  //       document.querySelector('.app')
  //     );
  //   });
  // },

  deckDetail(id) {
    ReactDom.render(
      <Header
        user={Cookies.getJSON('user')}
        onLogoutClick={() => this.navigate('logout', {trigger: true})}
      />,
      document.querySelector('.header')
    );

    ReactDom.render(
      <Table 
      people={Data}
      onSubmitClick={() => this.navigate('addCard', {trigger: true})}/>,
      document.querySelector('.app')
    );
  }

});
