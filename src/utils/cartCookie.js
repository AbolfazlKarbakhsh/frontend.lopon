import Cookies from 'js-cookie';

const CART_COOKIE_NAME = 'cart';
const COOKIE_EXPIRES_DAYS = 30;

/**
 * Reads and returns the cart array from the Cookie.
 * Safely handles missing cookies and JSON parsing errors.
 * @returns {Array} Array of cart items
 */
export const getCart = () => {
  try {
    const cartData = Cookies.get(CART_COOKIE_NAME);
    if (!cartData) {
      return [];
    }
    const parsed = JSON.parse(cartData);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    console.error('Error reading cart cookie:', error);
    Cookies.remove(CART_COOKIE_NAME);
    return [];
  }
};

/**
 * Saves the cart array to the Cookie.
 * If the cart is empty, removes the Cookie.
 * @param {Array} cart - The cart array to save
 * @returns {Array} Saved cart array
 */
export const saveCart = (cart) => {
  try {
    if (!cart || (Array.isArray(cart) && cart.length === 0)) {
      Cookies.remove(CART_COOKIE_NAME);
      return [];
    }
    Cookies.set(CART_COOKIE_NAME, JSON.stringify(cart), {
      expires: COOKIE_EXPIRES_DAYS,
      path: '/',
    });
    return cart;
  } catch (error) {
    console.error('Error saving cart cookie:', error);
    return cart;
  }
};

/**
 * Adds an item to the cart.
 * If the item already exists (by id), increases its quantity.
 * Otherwise, adds full item details to the cart.
 * @param {Object} item - Item object containing at least an `id`
 * @returns {Array} Updated cart array
 */
export const addToCart = (item) => {
  if (!item) return getCart();

  const currentCart = getCart();
  const itemId = typeof item === 'object' ? item.id : item;

  if (itemId === undefined || itemId === null) {
    return currentCart;
  }

  const existingIndex = currentCart.findIndex((i) => i.id === itemId);

  let updatedCart;
  if (existingIndex > -1) {
    const existingItem = currentCart[existingIndex];
    const addQty = (typeof item === 'object' && item.quantity) ? item.quantity : 1;
    const newQty = (existingItem.quantity || 1) + addQty;
    
    const mergedItem = typeof item === 'object' 
      ? { ...existingItem, ...item, quantity: newQty } 
      : { ...existingItem, quantity: newQty };
    
    updatedCart = [...currentCart];
    updatedCart[existingIndex] = mergedItem;
  } else {
    const newItem = typeof item === 'object' ? { ...item } : { id: item };
    newItem.quantity = newItem.quantity || 1;
    updatedCart = [...currentCart, newItem];
  }

  return saveCart(updatedCart);
};

/**
 * Removes an item from the cart by its id.
 * @param {string|number} id - Item ID to remove
 * @returns {Array} Updated cart array
 */
export const removeFromCart = (id) => {
  const currentCart = getCart();
  const updatedCart = currentCart.filter((i) => i.id !== id);
  return saveCart(updatedCart);
};

/**
 * Updates the quantity of a specific item in the cart by id.
 * If quantity <= 0, removes the item from cart.
 * @param {string|number} id - Item ID
 * @param {number} quantity - New quantity
 * @returns {Array} Updated cart array
 */
export const updateQuantity = (id, quantity) => {
  if (quantity <= 0) {
    return removeFromCart(id);
  }

  const currentCart = getCart();
  const existingIndex = currentCart.findIndex((i) => i.id === id);

  if (existingIndex === -1) {
    return currentCart;
  }

  const updatedCart = currentCart.map((i) =>
    i.id === id ? { ...i, quantity } : i
  );

  return saveCart(updatedCart);
};

/**
 * Clears the cart completely and removes the Cookie.
 * @returns {Array} Empty array
 */
export const clearCart = () => {
  Cookies.remove(CART_COOKIE_NAME);
  return [];
};
