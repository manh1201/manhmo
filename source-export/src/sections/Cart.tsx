import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import type { User, Cart as CartType, View } from '@/types';

interface CartProps {
  cart: CartType;
  currentUser: User | null;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  setView: (view: View) => void;
}

export const Cart = ({ cart, currentUser, onUpdateQuantity, onRemoveItem, onClearCart, setView }: CartProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (cart.items.length === 0) {
    return (
      <section className="py-12 min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="container max-w-md text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Giỏ hàng trống</h2>
          <p className="text-muted-foreground mb-6">
            Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm của chúng tôi!
          </p>
          <Button 
            className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600"
            onClick={() => setView('products')}
          >
            <ShoppingBag className="w-4 h-4" />
            Tiếp tục mua sắm
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Giỏ hàng của bạn</h2>
            <p className="text-muted-foreground">
              {cart.items.length} sản phẩm trong giỏ hàng
            </p>
          </div>
          <Button variant="outline" onClick={onClearCart} className="gap-2">
            <Trash2 className="w-4 h-4" />
            Xóa tất cả
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <Card key={item.product.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold truncate">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.product.category}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => onRemoveItem(item.product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(item.product.price)} / sản phẩm
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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

                {currentUser?.isNewUser && !currentUser?.discountUsed && cart.discount > 0 && (
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <span className="text-purple-700">
                        Bạn đã tiết kiệm {formatPrice(cart.discount)}!
                      </span>
                    </div>
                  </div>
                )}

                {!currentUser && (
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <Sparkles className="w-4 h-4 inline mr-1" />
                      Đăng ký để nhận giảm giá 30% cho đơn hàng đầu tiên!
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button 
                  className="w-full gap-2 bg-gradient-to-r from-purple-600 to-blue-600"
                  onClick={() => setView('checkout')}
                >
                  Thanh toán
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setView('products')}
                >
                  Tiếp tục mua sắm
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
