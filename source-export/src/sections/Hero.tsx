import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Shield, Zap, Crown } from 'lucide-react';
import type { View } from '@/types';

interface HeroProps {
  setView: (view: View) => void;
  isNewUser: boolean;
}

export const Hero = ({ setView, isNewUser }: HeroProps) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container relative py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              {isNewUser && (
                <Badge 
                  variant="secondary" 
                  className="px-4 py-1.5 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  Giảm 30% cho thành viên mới!
                </Badge>
              )}
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                  Tài khoản Premium
                </span>
                <br />
                <span className="text-foreground">Giá Rẻ - Chất Lượng Cao</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Mua tài khoản Netflix, Spotify, YouTube Premium, Adobe Creative Cloud 
                và nhiều dịch vụ premium khác với giá tốt nhất thị trường.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={() => setView('products')}
              >
                <Crown className="w-5 h-5" />
                Xem sản phẩm
                <ArrowRight className="w-4 h-4" />
              </Button>
              
              {!isNewUser && (
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setView('register')}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Đăng ký ngay - Giảm 30%
                </Button>
              )}
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-500" />
                </div>
                <span>Bảo hành 100%</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-blue-500" />
                </div>
                <span>Giao hàng tức thì</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                </div>
                <span>Hỗ trợ 24/7</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 grid grid-cols-2 gap-4">
              {/* Card 1 - Netflix */}
              <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform">
                <div className="text-3xl font-bold mb-2">Netflix</div>
                <div className="text-red-200 text-sm">Premium 4K</div>
                <div className="mt-4 text-2xl font-bold">99K<span className="text-sm font-normal">/tháng</span></div>
              </div>

              {/* Card 2 - Spotify */}
              <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform mt-8">
                <div className="text-3xl font-bold mb-2">Spotify</div>
                <div className="text-green-200 text-sm">Premium</div>
                <div className="mt-4 text-2xl font-bold">29K<span className="text-sm font-normal">/tháng</span></div>
              </div>

              {/* Card 3 - YouTube */}
              <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform">
                <div className="text-3xl font-bold mb-2">YouTube</div>
                <div className="text-red-200 text-sm">Premium</div>
                <div className="mt-4 text-2xl font-bold">39K<span className="text-sm font-normal">/tháng</span></div>
              </div>

              {/* Card 4 - Adobe */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform mt-8">
                <div className="text-3xl font-bold mb-2">Adobe</div>
                <div className="text-blue-200 text-sm">Creative Cloud</div>
                <div className="mt-4 text-2xl font-bold">199K<span className="text-sm font-normal">/tháng</span></div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
