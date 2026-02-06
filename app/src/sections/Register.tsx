import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, UserPlus, AlertCircle, Sparkles, Check } from 'lucide-react';
import type { View, User } from '@/types';

interface RegisterProps {
  onRegister: (user: User) => boolean;
  setView: (view: View) => void;
}

export const Register = ({ onRegister, setView }: RegisterProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email không hợp lệ');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        password,
        name,
        isAdmin: false,
        createdAt: new Date().toISOString(),
        isNewUser: true,
        discountUsed: false,
      };

      const success = onRegister(newUser);
      if (success) {
        setSuccess(true);
      } else {
        setError('Email đã được sử dụng');
      }
      setIsLoading(false);
    }, 500);
  };

  if (success) {
    return (
      <section className="py-12 min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="container max-w-md">
          <Card className="w-full">
            <CardContent className="pt-6 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Đăng ký thành công!</h2>
              <p className="text-muted-foreground mb-4">
                Chào mừng bạn đến với Premium Store. Bạn đã được tặng mã giảm giá 30% cho đơn hàng đầu tiên!
              </p>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-semibold">Ưu đãi đặc biệt</span>
                </div>
                <p className="text-3xl font-bold">GIẢM 30%</p>
                <p className="text-sm opacity-90">Cho đơn hàng đầu tiên</p>
              </div>
              <Button 
                className="w-full gap-2 bg-gradient-to-r from-purple-600 to-blue-600"
                onClick={() => setView('home')}
              >
                Bắt đầu mua sắm
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="container max-w-md">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Đăng ký tài khoản</CardTitle>
            <CardDescription>
              Tạo tài khoản mới để nhận ngay ưu đãi giảm 30%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span className="font-medium text-purple-700">
                    Đăng ký ngay - Nhận ngay giảm 30%
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full gap-2 bg-gradient-to-r from-purple-600 to-blue-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <UserPlus className="w-4 h-4" />
                )}
                {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Đã có tài khoản?{' '}
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="text-primary hover:underline font-medium"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
