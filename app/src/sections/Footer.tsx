import { Facebook, MessageCircle, Phone, Mail, Crown, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FooterProps {
  setView: (view: 'home' | 'login' | 'register' | 'cart' | 'checkout' | 'admin' | 'products') => void;
}

export const Footer = ({ setView }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com/ducmanh1212010',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'TikTok',
      icon: MessageCircle,
      href: 'https://tiktok.com/@dk_m.1109',
      color: 'bg-black hover:bg-gray-800',
    },
    {
      name: 'Zalo',
      icon: Phone,
      href: 'https://zalo.me/0342370478',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
  ];

  return (
    <footer className="w-full border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Premium Store
                </h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Cung cấp tài khoản Premium chất lượng cao với giá tốt nhất. 
              Netflix, Spotify, YouTube, Adobe và nhiều hơn nữa.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="icon"
                    className={`${link.color} text-white`}
                  >
                    <link.icon className="w-4 h-4" />
                  </Button>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setView('home')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Trang chủ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setView('products')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Sản phẩm
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setView('cart')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Giỏ hàng
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setView('login')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Đăng nhập
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold">Danh mục</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Streaming (Netflix, Disney+)</li>
              <li className="text-sm text-muted-foreground">Music (Spotify, Apple Music)</li>
              <li className="text-sm text-muted-foreground">Design (Adobe, Canva)</li>
              <li className="text-sm text-muted-foreground">AI Tools (ChatGPT, Midjourney)</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Facebook className="w-4 h-4" />
                <a 
                  href="https://facebook.com/ducmanh1212010" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  @ducmanh1212010
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageCircle className="w-4 h-4" />
                <a 
                  href="https://tiktok.com/@dk_m.1109" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  @dk_m.1109
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <a 
                  href="https://zalo.me/0342370478" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  0342370478 (Zalo)
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>banducmanh2010@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} Premium Store. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Premium Store Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
