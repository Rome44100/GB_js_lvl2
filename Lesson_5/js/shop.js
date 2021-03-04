"use strict";

import './common.js';

import Button from "./button";

import AbstractList from "./abastractlist";

import GoodsItem from "./goodsitem";

import CartItem from "./cartitem";

import Cart from "./cart";

import List from "./list";

const CartInstance = new Cart();

new List(CartInstance);