import React from 'react';

import { CartProvider } from './src/context/CartContext';

export const wrapPageElement = ({ element }) => <CartProvider>{element}</CartProvider>;
