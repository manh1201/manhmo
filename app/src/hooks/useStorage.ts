import { useState, useEffect } from 'react';
import type { User, Product, Cart } from '@/types';
import { ADMIN_EMAIL, ADMIN_PASSWORD, NEW_USER_DISCOUNT } from '@/types';

// Initialize default admin account
const initializeAdmin = (): User => ({
  id: 'admin-001',
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
  name: 'Admin',
  isAdmin: true,
  createdAt: new Date().toISOString(),
  isNewUser: false,
  discountUsed: true,
});

// Initialize sample products
const initializeProducts = (): Product[] => [
  {
    id: 'prod-001',
    name: 'Netflix Premium 4K',
    description: 'Tài khoản Netflix Premium 4K, xem được trên 4 thiết bị cùng lúc, hỗ trợ 4K HDR',
    price: 99000,
    originalPrice: 260000,
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&auto=format&fit=crop&q=60',
    category: 'Streaming',
    stock: 50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-002',
    name: 'Spotify Premium',
    description: 'Spotify Premium 1 tháng, nghe nhạc không quảng cáo, chất lượng cao',
    price: 29000,
    originalPrice: 59000,
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=500&auto=format&fit=crop&q=60',
    category: 'Music',
    stock: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-003',
    name: 'YouTube Premium',
    description: 'YouTube Premium 1 tháng, xem video không quảng cáo, phát nền, tải video',
    price: 39000,
    originalPrice: 79000,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&auto=format&fit=crop&q=60',
    category: 'Streaming',
    stock: 80,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-004',
    name: 'Disney+ Hotstar',
    description: 'Disney+ Hotstar Premium, xem phim Marvel, Star Wars, Pixar, Disney',
    price: 79000,
    originalPrice: 150000,
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60',
    category: 'Streaming',
    stock: 40,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-005',
    name: 'Canva Pro',
    description: 'Canva Pro 1 tháng, thiết kế đồ họa chuyên nghiệp với 100+ triệu template',
    price: 49000,
    originalPrice: 99000,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&auto=format&fit=crop&q=60',
    category: 'Design',
    stock: 60,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-006',
    name: 'Adobe Creative Cloud',
    description: 'Adobe Creative Cloud All Apps, bộ 20+ ứng dụng sáng tạo chuyên nghiệp',
    price: 199000,
    originalPrice: 550000,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&auto=format&fit=crop&q=60',
    category: 'Design',
    stock: 30,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-007',
    name: 'ChatGPT Plus',
    description: 'ChatGPT Plus 1 tháng, truy cập GPT-4, tốc độ nhanh hơn, ưu tiên truy cập',
    price: 490000,
    originalPrice: 600000,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&auto=format&fit=crop&q=60',
    category: 'AI Tools',
    stock: 25,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-008',
    name: 'Midjourney',
    description: 'Midjourney Subscription, tạo hình ảnh AI chất lượng cao',
    price: 290000,
    originalPrice: 400000,
    image: 'https://images.unsplash.com/photo-1686191128892-3b37add4a934?w=500&auto=format&fit=crop&q=60',
    category: 'AI Tools',
    stock: 35,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Storage keys
const USERS_KEY = 'premium_store_users';
const PRODUCTS_KEY = 'premium_store_products';
const CART_KEY = 'premium_store_cart';
const CURRENT_USER_KEY = 'premium_store_current_user';

// Initialize storage with default data
export const initializeStorage = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([initializeAdmin()]));
  }
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initializeProducts()));
  }
  if (!localStorage.getItem(CART_KEY)) {
    localStorage.setItem(CART_KEY, JSON.stringify({ items: [], total: 0, discount: 0, finalTotal: 0 }));
  }
};

// Users
export const getUsers = (): User[] => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUser = (user: User): boolean => {
  const users = getUsers();
  if (users.find(u => u.email === user.email)) {
    return false;
  }
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
};

export const updateUser = (updatedUser: User): void => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

export const loginUser = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

export const logoutUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(CART_KEY);
};

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
};

// Products
export const getProducts = (): Product[] => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveProduct = (product: Product): void => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === product.id);
  if (index !== -1) {
    products[index] = product;
  } else {
    products.push(product);
  }
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const deleteProduct = (productId: string): void => {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== productId);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
};

// Cart
export const getCart = (): Cart => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : { items: [], total: 0, discount: 0, finalTotal: 0 };
};

export const addToCart = (product: Product, quantity: number = 1): void => {
  const cart = getCart();
  const existingItem = cart.items.find(item => item.product.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product, quantity });
  }
  
  updateCartTotals(cart);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const removeFromCart = (productId: string): void => {
  const cart = getCart();
  cart.items = cart.items.filter(item => item.product.id !== productId);
  updateCartTotals(cart);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const updateCartQuantity = (productId: string, quantity: number): void => {
  const cart = getCart();
  const item = cart.items.find(item => item.product.id === productId);
  
  if (item) {
    item.quantity = quantity;
    if (quantity <= 0) {
      cart.items = cart.items.filter(i => i.product.id !== productId);
    }
  }
  
  updateCartTotals(cart);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const clearCart = (): void => {
  localStorage.setItem(CART_KEY, JSON.stringify({ items: [], total: 0, discount: 0, finalTotal: 0 }));
};

const updateCartTotals = (cart: Cart): void => {
  const currentUser = getCurrentUser();
  cart.total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  // Apply 30% discount for new users
  if (currentUser && currentUser.isNewUser && !currentUser.discountUsed) {
    cart.discount = cart.total * NEW_USER_DISCOUNT;
  } else {
    cart.discount = 0;
  }
  
  cart.finalTotal = cart.total - cart.discount;
};

export const applyDiscount = (): void => {
  const cart = getCart();
  updateCartTotals(cart);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Hook for reactive storage
export const useStorage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, discount: 0, finalTotal: 0 });
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    initializeStorage();
    setUsers(getUsers());
    setProducts(getProducts());
    setCart(getCart());
    setCurrentUser(getCurrentUser());
  }, []);

  const refreshData = () => {
    setUsers(getUsers());
    setProducts(getProducts());
    setCart(getCart());
    setCurrentUser(getCurrentUser());
  };

  return {
    users,
    products,
    cart,
    currentUser,
    refreshData,
    saveUser: (user: User) => {
      const result = saveUser(user);
      refreshData();
      return result;
    },
    updateUser: (user: User) => {
      updateUser(user);
      refreshData();
    },
    loginUser: (email: string, password: string) => {
      const user = loginUser(email, password);
      refreshData();
      return user;
    },
    logoutUser: () => {
      logoutUser();
      refreshData();
    },
    saveProduct: (product: Product) => {
      saveProduct(product);
      refreshData();
    },
    deleteProduct: (productId: string) => {
      deleteProduct(productId);
      refreshData();
    },
    addToCart: (product: Product, quantity?: number) => {
      addToCart(product, quantity);
      refreshData();
    },
    removeFromCart: (productId: string) => {
      removeFromCart(productId);
      refreshData();
    },
    updateCartQuantity: (productId: string, quantity: number) => {
      updateCartQuantity(productId, quantity);
      refreshData();
    },
    clearCart: () => {
      clearCart();
      refreshData();
    },
  };
};
