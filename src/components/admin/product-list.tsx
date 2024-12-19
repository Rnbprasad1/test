import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Plus, Package, MapPin, Copy, Check } from 'lucide-react';
import { db } from '../../lib/firebase';
import { Product } from '../../types';
import { ProductForm } from './products/product-form';
import { ProductCard } from './products/product-card';
import { LocationCard } from './locations/location-card';
import { CategoryStats } from './products/category-stats';
import { CategoryForm } from './products/category-form';
import { DateFilter } from './products/date-filter';
import { cities } from '../../data/cities';

const defaultProduct: Partial<Product> = {
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
  category: '',
  stock: true,
  unit: 'kg',
  city: '',
  quantity: 0,
  lastUpdated: new Date().toISOString()
};

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>(defaultProduct);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copyingTo, setCopyingTo] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
      setProducts(productsData);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(productsData.map(p => p.category))).filter(Boolean);
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      // Check if product with same name exists in the same city
      const existingProduct = products.find(
        p => p.name.toLowerCase() === newProduct.name?.toLowerCase() && 
            p.city === newProduct.city
      );

      if (existingProduct) {
        setError('A product with this name already exists in this city');
        return;
      }

      const productToAdd = {
        ...newProduct,
        lastUpdated: new Date().toISOString()
      };

      await addDoc(collection(db, 'products'), productToAdd);
      setNewProduct(defaultProduct);
      setIsAddingProduct(false);
      setError(null);
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product');
    }
  };

  const handleUpdateProduct = async (productId: string, updatedProduct: Partial<Product>) => {
    try {
      // Check for duplicate product names in the same city
      const existingProduct = products.find(
        p => p.id !== productId && 
            p.name.toLowerCase() === updatedProduct.name?.toLowerCase() && 
            p.city === updatedProduct.city
      );

      if (existingProduct) {
        setError('A product with this name already exists in this city');
        return;
      }

      await updateDoc(doc(db, 'products', productId), {
        ...updatedProduct,
        lastUpdated: new Date().toISOString()
      });
      setEditingProductId(null);
      setError(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product');
    }
  };

  const handleAddCategory = async (categoryName: string) => {
    if (categories.includes(categoryName)) {
      setError('Category already exists');
      return;
    }
    setCategories([...categories, categoryName]);
    setIsAddingCategory(false);
    setError(null);
  };

  const toggleProductStock = async (productId: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'products', productId), {
        stock: !currentStatus,
        lastUpdated: new Date().toISOString()
      });
      fetchProducts();
    } catch (error) {
      console.error('Error toggling product stock:', error);
      setError('Failed to update product stock');
    }
  };

  const handleCopyToCity = async (productId: string, targetCity: string) => {
    try {
      const productToCopy = products.find(p => p.id === productId);
      if (!productToCopy) return;

      // Check if product with same name exists in target city
      const existingProduct = products.find(
        p => p.name.toLowerCase() === productToCopy.name.toLowerCase() && 
            p.city === targetCity
      );

      if (existingProduct) {
        setError(`Product "${productToCopy.name}" already exists in ${targetCity}`);
        return;
      }

      const { id, ...productData } = productToCopy;
      
      await addDoc(collection(db, 'products'), {
        ...productData,
        city: targetCity,
        lastUpdated: new Date().toISOString()
      });
      
      fetchProducts();
      setError(null);
    } catch (error) {
      console.error('Error copying product:', error);
      setError('Failed to copy product');
    }
  };

  const getProductsByCity = (city: string) => {
    return products.filter(product => 
      product.city?.toLowerCase() === city.toLowerCase()
    );
  };

  const filteredProducts = products
    .filter(product => selectedCity ? product.city?.toLowerCase() === selectedCity.toLowerCase() : true)
    .filter(product => selectedCategory === 'all' ? true : product.category === selectedCategory)
    .filter(product => {
      if (!selectedDate) return true;
      const productDate = product.lastUpdated ? new Date(product.lastUpdated).toISOString().split('T')[0] : null;
      return productDate === selectedDate;
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {/* Cities Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <MapPin className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">Cities</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <LocationCard
              key={city.name}
              city={city.name}
              imageUrl={city.imageUrl}
              restaurantCount={getProductsByCity(city.name).length}
              isSelected={selectedCity === city.name}
              onSelect={() => setSelectedCity(selectedCity === city.name ? null : city.name)}
              type="products"
            />
          ))}
        </div>
      </div>

      {/* Category Stats */}
      <CategoryStats
        categories={categories}
        products={selectedCity ? products.filter(p => p.city === selectedCity) : products}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddCategory={() => setIsAddingCategory(true)}
      />

      {/* Add New Category Form */}
      {isAddingCategory && (
        <CategoryForm
          onSave={handleAddCategory}
          onCancel={() => setIsAddingCategory(false)}
          existingCategories={categories}
        />
      )}

      {/* Date Filter */}
      <DateFilter
        products={selectedCity ? products.filter(p => p.city === selectedCity) : products}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      {/* Products Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <Package className="h-6 w-6 text-indigo-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedCity ? `Products in ${selectedCity}` : 'All Products'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddingProduct(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-3 mr-2" />
            Add
          </button>
        </div>

        {/* Add New Product Form */}
        {isAddingProduct && (
          <div className="mb-6">
            <ProductForm
              product={{ ...newProduct, city: selectedCity || cities[0].name }}
              onSave={handleAddProduct}
              onCancel={() => setIsAddingProduct(false)}
              onChange={(field, value) => setNewProduct(prev => ({ ...prev, [field]: value }))}
              isNew
              cities={cities}
            />
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id}>
              {editingProductId === product.id ? (
                <ProductForm
                  product={product}
                  onSave={() => handleUpdateProduct(product.id, product)}
                  onCancel={() => setEditingProductId(null)}
                  onChange={(field, value) => {
                    const updatedProducts = products.map(p => 
                      p.id === product.id ? { ...p, [field]: value } : p
                    );
                    setProducts(updatedProducts);
                  }}
                  cities={cities}
                />
              ) : (
                <ProductCard
                  product={product}
                  onEdit={() => setEditingProductId(product.id)}
                  onDelete={() => handleDeleteProduct(product.id)}
                  onToggleStock={() => toggleProductStock(product.id, product.stock)}
                  onCopyToCity={(targetCity) => handleCopyToCity(product.id, targetCity)}
                  cities={cities.filter(city => city.name !== product.city)}
                  copyingTo={copyingTo}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}