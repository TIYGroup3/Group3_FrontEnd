import $ from 'jquery';
import _ from 'underscore';
import moment from 'moment';

import Table from './views/deck/table';

import Data from './dummy_data';

import React from 'react';
import ReactDom from 'react-dom';

let tableElement = document.querySelector('.app');

ReactDom.render(
  <Table people={Data}/>,
  tableElement
);

console.log('Hello, World');

