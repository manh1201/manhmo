import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  Save,
  X
} from 'lucide-react';
import type { Product, User } from '@/types';

interface AdminProps {
  products: Product[];
  users: User[];
  onSaveProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export const Admin = ({ products, users, onSaveProduct, onDeleteProduct }: AdminProps) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const emptyProduct: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    image: '',
    category: 'Streaming',
    stock: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const handleAddNew = () => {
    setEditingProduct({ ...emptyProduct, id: `prod-${Date.now()}` });
    setIsDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      onSaveProduct({
        ...editingProduct,
        updatedAt: new Date().toISOString(),
      });
      setIsDialogOpen(false);
      setEditingProduct(null);
    }
  };

  const handleDelete = (productId: string) => {
    onDeleteProduct(productId);
    setDeleteConfirm(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const stats = {
    totalProducts: products.length,
    totalUsers: users.filter(u => !u.isAdmin).length,
    totalStock: products.reduce((sum, p) => sum + p.stock, 0),
    avgPrice: products.length > 0 ? products.reduce((sum, p) => sum + p.price, 0) / products.length : 0,
  };

  const categories = ['Streaming', 'Music', 'Design', 'AI Tools'];

  return (
    <section className="py-12">
      <div className="container max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Quản lý cửa hàng</h2>
            <p className="text-muted-foreground">Quản lý sản phẩm, ngườidùng và đơn hàng</p>
          </div>
          <Badge variant="secondary" className="text-sm">Admin Panel</Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tổng sản phẩm</p>
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ngườidùng</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tồn kho</p>
                  <p className="text-2xl font-bold">{stats.totalStock}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Giá trung bình</p>
                  <p className="text-2xl font-bold">{formatPrice(stats.avgPrice)}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">Sản phẩm</TabsTrigger>
            <TabsTrigger value="users">Ngườidùng</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Danh sách sản phẩm</h3>
              <Button onClick={handleAddNew} className="gap-2">
                <Plus className="w-4 h-4" />
                Thêm sản phẩm
              </Button>
            </div>

            <div className="grid gap-4">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold truncate">{product.name}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">{product.category}</Badge>
                              <span className="text-sm font-medium">{formatPrice(product.price)}</span>
                              {product.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                  {formatPrice(product.originalPrice)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(product)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => setDeleteConfirm(product.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <h3 className="text-lg font-semibold">Danh sách ngườidùng</h3>
            <div className="grid gap-4">
              {users.filter(u => !u.isAdmin).map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                          <span className="text-white font-medium">{user.name[0]}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {user.isNewUser && !user.discountUsed && (
                          <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                            Có giảm giá 30%
                          </Badge>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {users.filter(u => !u.isAdmin).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Chưa có ngườidùng nào
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit/Add Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct?.id && products.find(p => p.id === editingProduct.id) 
                  ? 'Chỉnh sửa sản phẩm' 
                  : 'Thêm sản phẩm mới'}
              </DialogTitle>
              <DialogDescription>
                Điền thông tin sản phẩm bên dưới
              </DialogDescription>
            </DialogHeader>
            {editingProduct && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tên sản phẩm</Label>
                  <Input
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    placeholder="VD: Netflix Premium"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Mô tả</Label>
                  <Input
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    placeholder="Mô tả sản phẩm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Giá bán</Label>
                    <Input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      placeholder="99000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Giá gốc (tùy chọn)</Label>
                    <Input
                      type="number"
                      value={editingProduct.originalPrice || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) || undefined })}
                      placeholder="260000"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Link ảnh</Label>
                  <Input
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Danh mục</Label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Số lượng tồn kho</Label>
                    <Input
                      type="number"
                      value={editingProduct.stock}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                      placeholder="50"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1 gap-2" onClick={() => setIsDialogOpen(false)}>
                    <X className="w-4 h-4" />
                    Hủy
                  </Button>
                  <Button className="flex-1 gap-2" onClick={handleSave}>
                    <Save className="w-4 h-4" />
                    Lưu
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Xác nhận xóa</DialogTitle>
              <DialogDescription>
                Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                Hủy
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Xóa
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
