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
 *     .....,,
 *   ],
 *   ..........
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


// const INVALID_PARAM_ERROR = 400;
//const SERVER_ERROR = 500;
// const SERVER_ERROR_MSG = 'Something went wrong on the server.';


// TODO: Implement /menu. Gets all menu items, organized by category and in alphabetical order.

// TODO: Implement /menu/:category. Gets all menu items in a given :category in alphabetical order.

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

const PORT = process.env.PORT || 3000;
app.listen(PORT);