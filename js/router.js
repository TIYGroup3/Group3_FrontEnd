import Backbone from 'backbone';
import Cookies from 'js-cookie';
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import Register from './views/user/register';
import LoginPage from './views/user/login';
import Table from './views/deck/table';
import UserPage from './views/user/user_page';

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

    'deckDetail/:id' : 'deckDetail',
    'addCard'  : 'addCard',

    'checkUser' : 'checkUser',

  },

  checkUser() {
    // console.log('sad panda');
    if (Cookies.get('user')) {
      this.redirect('userPage');
    } else {
      this.redirect('loginPage');
    }
  },

  home() {
    // if logged in, redirect to user page; else redirect to loginPage
    // function to find username, call in view page, $$$$???? blargenblahghernaoijasfdlikbncklxjnfal
    // this.redirect()
    // method check user: read cookie, if cookie, return user info
    // let user = this.props.user;
    this.navigate('checkUser', {trigger: true});
    // checkUser();
    // if (user) {
    //   this.redirect('userPage');
    // } else {
    //   this.redirect('loginPage');
    // }
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

  loginPage() {
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
      <Register 
        user={Cookies.getJSON('user')}
        onRegisterClick={() => this.navigate('register', {trigger: true})}/>,
      document.querySelector('.app')
    );
  },

  userPage() {
    ReactDom.render(
      <UserPage/>,
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
