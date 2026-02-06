import { useState, useEffect } from 'react';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { Hero } from '@/sections/Hero';
import { ProductList } from '@/sections/ProductList';
import { Login } from '@/sections/Login';
import { Register } from '@/sections/Register';
import { Cart } from '@/sections/Cart';
import { Checkout } from '@/sections/Checkout';
import { Admin } from '@/sections/Admin';
import type { View, User, Product, Cart as CartType } from '@/types';
import { initializeStorage, getCurrentUser, getProducts, getCart } from '@/hooks/useStorage';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Storage state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartType>({ items: [], total: 0, discount: 0, finalTotal: 0 });
  const [users, setUsers] = useState<User[]>([]);

  // Initialize storage on mount
  useEffect(() => {
    initializeStorage();
    refreshData();
    setIsInitialized(true);
  }, []);

  const refreshData = () => {
    setCurrentUser(getCurrentUser());
    setProducts(getProducts());
    setCart(getCart());
    const storedUsers = localStorage.getItem('premium_store_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  };

  // Auth handlers
  const handleLogin = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('premium_store_users') || '[]');
    const user = users.find((u: User) => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('premium_store_current_user', JSON.stringify(user));
      setCurrentUser(user);
      toast.success(`Chào mừng ${user.name}!`, {
        description: user.isAdmin ? 'Bạn đang đăng nhập với quyền Admin' : 'Đăng nhập thành công',
      });
      setCurrentView('home');
      return true;
    }
    return false;
  };

  const handleRegister = (newUser: User): boolean => {
    const users = JSON.parse(localStorage.getItem('premium_store_users') || '[]');
    
    if (users.find((u: User) => u.email === newUser.email)) {
      return false;
    }
    
    users.push(newUser);
    localStorage.setItem('premium_store_users', JSON.stringify(users));
    localStorage.setItem('premium_store_current_user', JSON.stringify(newUser));
    setCurrentUser(newUser);
    setUsers(users);
    
    toast.success('Đăng ký thành công!', {
      description: 'Bạn đã nhận được giảm giá 30% cho đơn hàng đầu tiên',
    });
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem('premium_store_current_user');
    localStorage.removeItem('premium_store_cart');
    setCurrentUser(null);
    setCart({ items: [], total: 0, discount: 0, finalTotal: 0 });
    toast.info('Đã đăng xuất');
    setCurrentView('home');
  };

  // Cart handlers
  const handleAddToCart = (product: Product) => {
    if (!currentUser) {
      toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng');
      setCurrentView('login');
      return;
    }

    const currentCart = getCart();
    const existingItem = currentCart.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      toast.info('Sản phẩm đã có trong giỏ hàng');
      return;
    }

    currentCart.items.push({ product, quantity: 1 });
    updateCartTotals(currentCart);
    localStorage.setItem('premium_store_cart', JSON.stringify(currentCart));
    setCart(currentCart);
    toast.success('Đã thêm vào giỏ hàng');
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    const currentCart = getCart();
    const item = currentCart.items.find(item => item.product.id === productId);
    
    if (item) {
      item.quantity = quantity;
      if (quantity <= 0) {
        currentCart.items = currentCart.items.filter(i => i.product.id !== productId);
      }
    }
    
    updateCartTotals(currentCart);
    localStorage.setItem('premium_store_cart', JSON.stringify(currentCart));
    setCart(currentCart);
  };

  const handleRemoveFromCart = (productId: string) => {
    const currentCart = getCart();
    currentCart.items = currentCart.items.filter(item => item.product.id !== productId);
    updateCartTotals(currentCart);
    localStorage.setItem('premium_store_cart', JSON.stringify(currentCart));
    setCart(currentCart);
    toast.success('Đã xóa khỏi giỏ hàng');
  };

  const handleClearCart = () => {
    localStorage.setItem('premium_store_cart', JSON.stringify({ items: [], total: 0, discount: 0, finalTotal: 0 }));
    setCart({ items: [], total: 0, discount: 0, finalTotal: 0 });
    toast.success('Đã xóa giỏ hàng');
  };

  const updateCartTotals = (cart: CartType) => {
    const user = getCurrentUser();
    cart.total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    
    // Apply 30% discount for new users
    if (user && user.isNewUser && !user.discountUsed) {
      cart.discount = cart.total * 0.30;
    } else {
      cart.discount = 0;
    }
    
    cart.finalTotal = cart.total - cart.discount;
  };

  // Product handlers (Admin)
  const handleSaveProduct = (product: Product) => {
    const currentProducts = getProducts();
    const index = currentProducts.findIndex(p => p.id === product.id);
    
    if (index !== -1) {
      currentProducts[index] = product;
      toast.success('Đã cập nhật sản phẩm');
    } else {
      currentProducts.push(product);
      toast.success('Đã thêm sản phẩm mới');
    }
    
    localStorage.setItem('premium_store_products', JSON.stringify(currentProducts));
    setProducts(currentProducts);
  };

  const handleDeleteProduct = (productId: string) => {
    const currentProducts = getProducts();
    const filtered = currentProducts.filter(p => p.id !== productId);
    localStorage.setItem('premium_store_products', JSON.stringify(filtered));
    setProducts(filtered);
    toast.success('Đã xóa sản phẩm');
  };

  // Checkout handler
  const handleCompleteOrder = () => {
    // Mark discount as used for new user
    if (currentUser && currentUser.isNewUser && !currentUser.discountUsed) {
      const users = JSON.parse(localStorage.getItem('premium_store_users') || '[]');
      const userIndex = users.findIndex((u: User) => u.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex].discountUsed = true;
        users[userIndex].isNewUser = false;
        localStorage.setItem('premium_store_users', JSON.stringify(users));
        
        const updatedUser = { ...currentUser, discountUsed: true, isNewUser: false };
        localStorage.setItem('premium_store_current_user', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
      }
    }
    
    // Clear cart
    localStorage.setItem('premium_store_cart', JSON.stringify({ items: [], total: 0, discount: 0, finalTotal: 0 }));
    setCart({ items: [], total: 0, discount: 0, finalTotal: 0 });
    
    toast.success('Đơn hàng đã được gửi!', {
      description: 'Admin sẽ liên hệ với bạn sớm nhất',
    });
    setCurrentView('home');
  };

  // Render current view
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero setView={setCurrentView} isNewUser={!!(currentUser?.isNewUser && !currentUser?.discountUsed)} />
            <ProductList 
              products={products} 
              currentUser={currentUser} 
              onAddToCart={handleAddToCart}
              cartItems={cart.items}
            />
          </>
        );
      case 'products':
        return (
          <ProductList 
            products={products} 
            currentUser={currentUser} 
            onAddToCart={handleAddToCart}
            cartItems={cart.items}
          />
        );
      case 'login':
        return <Login onLogin={handleLogin} setView={setCurrentView} />;
      case 'register':
        return <Register onRegister={handleRegister} setView={setCurrentView} />;
      case 'cart':
        return (
          <Cart 
            cart={cart} 
            currentUser={currentUser}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            setView={setCurrentView}
          />
        );
      case 'checkout':
        return (
          <Checkout 
            cart={cart} 
            currentUser={currentUser}
            setView={setCurrentView}
            onCompleteOrder={handleCompleteOrder}
          />
        );
      case 'admin':
        if (!currentUser?.isAdmin) {
          setCurrentView('home');
          return null;
        }
        return (
          <Admin 
            products={products}
            users={users}
            onSaveProduct={handleSaveProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );
      default:
        return null;
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        currentView={currentView} 
        setView={setCurrentView} 
        currentUser={currentUser}
        cartItemCount={cart.items.reduce((sum, item) => sum + item.quantity, 0)}
        onLogout={handleLogout}
      />
      
      <main className="flex-1">
        {renderView()}
      </main>
      
      <Footer setView={setCurrentView} />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
