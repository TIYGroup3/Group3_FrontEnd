import Backbone from 'backbone';
import Cookies from 'js-cookie';
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import Register from './views/user/register';
import LoginPage from './views/user/login';
import Table from './views/deck/table';

import Data from './dummy_data';

export default Backbone.Router.extend({

  routes: {
    ''         : 'loginPage',
    'login'    : 'login',
    'logout'   : 'logout',

    'registerPage' : 'registerPage',
    'register' : 'register',

    'userPage' : 'userPage',

    'deckDetail'     : 'deckDetail',
    'addCard'  : 'addCard',

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
      this.redirect('');
    }).fail(() => {
      $('.app').html('Oops..');
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
      this.redirect('loginPage');
    }).fail(() => {
      $('.app').html('Oops..');
    });
  },

  // addCard() {
  //   let request = $.ajax({
  //     url: `https://guarded-ridge-7410.herokuapp.com/users/login`,
  //     method: 'POST',
  //     data: {
  //       username: 'jonnywarren',
  //       password: 'jonnywarren'
  //     }
  //   });
  //   $('.app').html('loading...');
  //   request.then((data) => {
  //     console.log('data:', data);
  //     Cookies.set('user', data);
  //     $.ajaxSetup({
  //       headers: {
  //         auth_token: data.access_token
  //       }
  //     });
  //     this.redirect('');
  //   }).fail(() => {
  //     $('.app').html('Oops..');
  //   });
  // },

  logout() {
    Cookies.remove('user');
    $.ajaxSetup({
      headers: {
        auth_token: null
      }
    });
    this.redirect('');
  },

  home() {
    //FIXME:  Add landing page
  },

  loginPage() {
    ReactDom.render(
      <LoginPage
        user={Cookies.getJSON('user')}
        onLoginClick={() => this.navigate('login', {trigger: true})}
        onLogoutClick={() => this.navigate('logout', {trigger: true})}/>,
      document.querySelector('.app')
    );
  },

  registerPage() {
    ReactDom.render(
      <Register 
        user={Cookies.getJSON('user')}
        onRegisterClick={() => this.navigate('register', {trigger: true})}/>,
      document.querySelector('.app')
    );
  },

  deckDetail() {
    ReactDom.render(
      <Table 
      people={Data}
      onSubmitClick={() => this.navigate('addCard', {trigger: true})}/>,
      document.querySelector('.app')
    );
  }

});
