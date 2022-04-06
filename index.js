/* eslint-disable no-magic-numbers */
/*
 * API for a theoretical cafe.
 *
 * An API that can provide items from the cafe menu,
 * and submit cafe orders for processing.
 * *** Endpoint Documentation ***
 * Endpoint: /menu
 * Description: Provides all items on the menu, sorted into categories.
 *              Items within each category are in alphabetical order.
 * Request Type: GET
 * Response Type: JSON
 * Example Request: /menu
 * Example Response:
 *  {
 *   'Bakery': [
 *     {
 *       'name': 'Blueberry Scone',
 *       'subcategory': 'Scones',
 *       'price': 3.50
 *     },
 *     .......
 *   ],
 *   .....
 *  }
 * *************************************
 * Endpoint: /menu/:category
 * Description: Responds with an alphabetically sorted list of menu items in the :category.
 * Request Type: GET
 * Response Type: JSON
 * Example Request: /menu/Bakery
 * Example Response:
 *  [
 *    {
 *      'name': 'Blueberry Scone',
 *      'subcategory': 'Scones',
 *      'price': 3.50
 *    },
 *    ...
 *  ]
 * Error Handling: If there are no items for the given category, responds in text with 400 status.
 */

'use strict';

const express = require('express');
const app = express();

const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

const INVALID_PARAM_ERROR = 400;
const SERVER_ERROR = 500;
const SERVER_ERROR_MSG = 'Something went wrong on the server.';

/*
 * TODO: Implement /menu. Gets all menu items, organized by category and in alphabetical order.
 * Gets all menu items (JSON), organized by category alphabetically.
 */
app.get('/menu', async function(req, res) {
  try {
    let db = await getDBConnection();
    let menu = await db.all('SELECT name, category, subcategory, price FROM menu ORDER BY name;');
    await db.close();
    res.json(processMenu(menu));
  } catch (err) {
    res.type('text');
    res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

/*
 * TODO: Implement /menu/:category. Gets all menu items in a given :category in alphabetical order.
 * Gets all menu items (JSON) in a given :category.
 */
app.get('/menu/:category', async function(req, res) {
  try {
    let qry = 'SELECT name, subcategory, price FROM menu WHERE category =? ORDER BY name;';
    let db = await getDBConnection();
    let menu = await db.all(qry, req.params.category);
    await db.close();
    if (menu.length === 0) {
      res.type('text');
      res.status(INVALID_PARAM_ERROR).send('There are no records for that category!');
    } else {
      res.json(menu);
    }
  } catch (err) {
    res.type('text');
    res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
  }
});

/**
 * Takes an array of menu items and processes it into a category to item array mapping.
 * @param {array} menu - An array of menu items with fields category, subcategory, name, price.
 * @returns {object} - The formatted menu object.
 */
function processMenu(menu) {
  let result = {};
  for (let i = 0; i < menu.length; i++) {
    let name = menu[i]['name'];
    let subcategory = menu[i]['subcategory'];
    let price = menu[i]['price'];
    let category = menu[i]['category'];
    if (!result[category]) {
      result[category] = []; // Initialize an array at this category.
    }
    result[category].push({name: name, subcategory: subcategory, price: price});
  }
  return result;
}

/**
 * Establishes a database connection to a database and returns the database object.
 * Any errors that occur during connection should be caught in the function
 * that calls this one.
 * @returns {Object} - The database object for the connection.
 */
async function getDBConnection() {
  const db = await sqlite.open({
    filename: 'demo.db',
    driver: sqlite3.Database
  });
  return db;
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);