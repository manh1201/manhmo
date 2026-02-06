import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Search, Plus, Check, Sparkles } from 'lucide-react';
import type { Product, User } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface ProductListProps {
  products: Product[];
  currentUser: User | null;
  onAddToCart: (product: Product) => void;
  cartItems: { product: Product; quantity: number }[];
}

export const ProductList = ({ products, currentUser, onAddToCart, cartItems }: ProductListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ['all', 'Streaming', 'Music', 'Design', 'AI Tools'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isInCart = (productId: string) => {
    return cartItems.some(item => item.product.id === productId);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Streaming': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Music': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Design': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'AI Tools': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <section className="py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Sản phẩm của chúng tôi
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Khám phá bộ sưu tập tài khoản premium chất lượng cao với giá tốt nhất thị trường.
            Tất cả sản phẩm đều được bảo hành và hỗ trợ 24/7.
          </p>
          
          {currentUser?.isNewUser && !currentUser?.discountUsed && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Bạn được giảm 30% cho đơn hàng đầu tiên!</span>
            </div>
          )}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'Tất cả' : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge 
                  className={`absolute top-3 left-3 ${getCategoryColor(product.category)}`}
                  variant="outline"
                >
                  {product.category}
                </Badge>
                {product.originalPrice && (
                  <Badge 
                    className="absolute top-3 right-3 bg-red-500 text-white"
                  >
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-2">
                <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              </CardHeader>

              <CardContent className="pb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Còn {product.stock} sản phẩm
                </p>
              </CardContent>

              <CardFooter className="pt-0 gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedProduct(product)}
                >
                  Chi tiết
                </Button>
                <Button
                  className="flex-1 gap-2"
                  onClick={() => onAddToCart(product)}
                  disabled={isInCart(product.id) || product.stock <= 0}
                  variant={isInCart(product.id) ? 'secondary' : 'default'}
                >
                  {isInCart(product.id) ? (
                    <>
                      <Check className="w-4 h-4" />
                      Đã thêm
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Thêm
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Không tìm thấy sản phẩm</h3>
            <p className="text-muted-foreground">Vui lòng thử tìm kiếm với từ khóa khác</p>
          </div>
        )}
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
            <DialogDescription>{selectedProduct?.description}</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getCategoryColor(selectedProduct.category)} variant="outline">
                  {selectedProduct.category}
                </Badge>
                <Badge variant={selectedProduct.stock > 0 ? 'default' : 'destructive'}>
                  {selectedProduct.stock > 0 ? `Còn ${selectedProduct.stock}` : 'Hết hàng'}
                </Badge>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">
                  {formatPrice(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-muted-foreground line-through">
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                )}
              </div>
              <Button 
                className="w-full gap-2"
                onClick={() => {
                  onAddToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                disabled={isInCart(selectedProduct.id) || selectedProduct.stock <= 0}
              >
                <ShoppingCart className="w-4 h-4" />
                {isInCart(selectedProduct.id) ? 'Đã trong giỏ hàng' : 'Thêm vào giỏ'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
