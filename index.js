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
 *     ...
 *   ],
 *   ...
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



const PORT = process.env.PORT || 3000;
app.listen(PORT);