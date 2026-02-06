import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Facebook, 
  MessageCircle, 
  Phone, 
  Check, 
  Copy, 
  ArrowLeft, 
  ShoppingBag,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import type { Cart as CartType, User, View } from '@/types';

interface CheckoutProps {
  cart: CartType;
  currentUser: User | null;
  setView: (view: View) => void;
  onCompleteOrder: () => void;
}

export const Checkout = ({ cart, currentUser, setView, onCompleteOrder }: CheckoutProps) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const contactMethods = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      username: '@ducmanh1212010',
      link: 'https://facebook.com/ducmanh1212010',
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Nhắn tin qua Facebook Messenger',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: MessageCircle,
      username: '@dk_m.1109',
      link: 'https://tiktok.com/@dk_m.1109',
      color: 'bg-black hover:bg-gray-800',
      description: 'Nhắn tin qua TikTok',
    },
    {
      id: 'zalo',
      name: 'Zalo',
      icon: Phone,
      username: '0342370478',
      link: 'https://zalo.me/0342370478',
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Nhắn tin qua Zalo',
    },
  ];

  const generateOrderMessage = () => {
    const items = cart.items.map(item => 
      `- ${item.product.name} x${item.quantity}: ${formatPrice(item.product.price * item.quantity)}`
    ).join('\n');

    return `Xin chào! Tôi muốn đặt hàng:\n\n${items}\n\nTạm tính: ${formatPrice(cart.total)}\n${cart.discount > 0 ? `Giảm giá: -${formatPrice(cart.discount)}\n` : ''}Tổng cộng: ${formatPrice(cart.finalTotal)}\n\nThông tin khách hàng:\nTên: ${currentUser?.name || 'Khách'}\nEmail: ${currentUser?.email || 'N/A'}`;
  };

  if (cart.items.length === 0) {
    return (
      <section className="py-12 min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="container max-w-md text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Giỏ hàng trống</h2>
          <p className="text-muted-foreground mb-6">
            Bạn chưa có sản phẩm nào để thanh toán.
          </p>
          <Button 
            className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600"
            onClick={() => setView('products')}
          >
            <ShoppingBag className="w-4 h-4" />
            Mua sắm ngay
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container max-w-3xl">
        <Button 
          variant="ghost" 
          className="mb-6 gap-2"
          onClick={() => setView('cart')}
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại giỏ hàng
        </Button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Thanh toán đơn hàng</h2>
          <p className="text-muted-foreground">
            Vui lòng chọn phương thức liên hệ để hoàn tất đơn hàng
          </p>
        </div>

        {/* Order Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Chi tiết đơn hàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                  </div>
                </div>
                <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
            
            <Separator />
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tạm tính</span>
              <span>{formatPrice(cart.total)}</span>
            </div>
            
            {cart.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-500" />
                  Giảm giá (30%)
                </span>
                <span className="text-green-600">-{formatPrice(cart.discount)}</span>
              </div>
            )}
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="font-semibold">Tổng cộng</span>
              <span className="font-bold text-xl text-primary">{formatPrice(cart.finalTotal)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Contact Methods */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Chọn phương thức liên hệ</h3>
          
          <div className="grid gap-4">
            {contactMethods.map((method) => (
              <Card 
                key={method.id}
                className={`cursor-pointer transition-all ${
                  selectedMethod === method.id ? 'ring-2 ring-primary' : 'hover:border-primary/50'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center`}>
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{method.name}</h4>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{method.username}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(method.username, method.id);
                          }}
                        >
                          {copied === method.id ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {selectedMethod && (
          <div className="mt-8 space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <AlertCircle className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Bạn đã chọn liên hệ qua {contactMethods.find(m => m.id === selectedMethod)?.name}. 
                Nhấn nút bên dưới để mở ứng dụng và gửi tin nhắn.
              </AlertDescription>
            </Alert>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="flex-1 gap-2 bg-gradient-to-r from-purple-600 to-blue-600"
                onClick={() => {
                  const method = contactMethods.find(m => m.id === selectedMethod);
                  if (method) {
                    const message = encodeURIComponent(generateOrderMessage());
                    let url = method.link;
                    if (method.id === 'facebook') {
                      url = `https://m.me/ducmanh1212010?text=${message}`;
                    } else if (method.id === 'zalo') {
                      url = `https://zalo.me/0342370478`;
                    }
                    window.open(url, '_blank');
                    onCompleteOrder();
                  }
                }}
              >
                <MessageCircle className="w-4 h-4" />
                Mở {contactMethods.find(m => m.id === selectedMethod)?.name} để thanh toán
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Hoặc copy nội dung đơn hàng:
              </p>
              <Button
                variant="outline"
                className="mt-2 gap-2"
                onClick={() => copyToClipboard(generateOrderMessage(), 'order')}
              >
                {copied === 'order' ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    Đã copy
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy nội dung đơn hàng
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Note */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Lưu ý:</strong> Sau khi liên hệ, admin sẽ xác nhận đơn hàng và gửi thông tin tài khoản 
            cho bạn trong thờigian sớm nhất. Vui lòng giữ liên lạc để nhận sản phẩm.
          </p>
        </div>
      </div>
    </section>
  );
};
