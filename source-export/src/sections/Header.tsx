import { ShoppingCart, User, LogOut, Menu, X, Store, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { View, User as UserType } from '@/types';
import { useState } from 'react';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
  currentUser: UserType | null;
  cartItemCount: number;
  onLogout: () => void;
}

export const Header = ({ currentView, setView, currentUser, cartItemCount, onLogout }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Trang chủ', view: 'home' as View, icon: Store },
    { label: 'Sản phẩm', view: 'products' as View, icon: Crown },
  ];

  if (currentUser?.isAdmin) {
    navItems.push({ label: 'Quản lý', view: 'admin' as View, icon: Store });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setView('home')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Premium Store
            </h1>
            <p className="text-xs text-muted-foreground">Tài khoản Premium Giá Rẻ</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.view}
              variant={currentView === item.view ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView(item.view)}
              className="gap-2"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setView('cart')}
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {cartItemCount}
              </Badge>
            )}
          </Button>

          {/* User Actions */}
          {currentUser ? (
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium">{currentUser.name}</span>
                {currentUser.isAdmin && (
                  <Badge variant="secondary" className="text-xs">Admin</Badge>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={onLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setView('login')}>
                Đăng nhập
              </Button>
              <Button size="sm" onClick={() => setView('register')}>
                Đăng ký
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.view}
                variant={currentView === item.view ? 'default' : 'ghost'}
                className="w-full justify-start gap-2"
                onClick={() => {
                  setView(item.view);
                  setMobileMenuOpen(false);
                }}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
            
            {currentUser ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{currentUser.name}</span>
                  {currentUser.isAdmin && <Badge variant="secondary">Admin</Badge>}
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => {
                    setView('login');
                    setMobileMenuOpen(false);
                  }}
                >
                  Đăng nhập
                </Button>
                <Button 
                  className="w-full"
                  onClick={() => {
                    setView('register');
                    setMobileMenuOpen(false);
                  }}
                >
                  Đăng ký
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
