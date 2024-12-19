import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Plus } from 'lucide-react';
import { db } from '../../lib/firebase';
import { useAuthStore } from '../../store/auth-store';
import { FoodCategory, MenuItem } from '../../types';
import { CategoryForm } from './menu/category-form';
import { CategoryCard } from './menu/category-card';
import { MenuItemForm } from './menu/menu-item-form';
import { MenuItemCard } from './menu/menu-item-card';

const defaultMenuItem: Partial<MenuItem> = {
  name: '',
  description: '',
  price: 0,
  imageURL: '',
  isVeg: true,
  isAvailable: true,
};

const defaultCategory: Partial<FoodCategory> = {
  name: '',
  iconURL: '',
};

export function MenuManagement() {
  const user = useAuthStore((state) => state.user);
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingMenuItem, setIsAddingMenuItem] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingMenuItem, setEditingMenuItem] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState<Partial<FoodCategory>>(defaultCategory);
  const [newMenuItem, setNewMenuItem] = useState<Partial<MenuItem>>(defaultMenuItem);
  const [editedCategory, setEditedCategory] = useState<FoodCategory | null>(null);
  const [editedMenuItem, setEditedMenuItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (!user) return;
    fetchCategories();
    fetchMenuItems();
  }, [user]);

  const fetchCategories = async () => {
    if (!user) return;
    const q = query(collection(db, 'categories'), where('restaurantId', '==', user.id));
    const querySnapshot = await getDocs(q);
    const categoriesData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FoodCategory));
    setCategories(categoriesData);
  };

  const fetchMenuItems = async () => {
    if (!user) return;
    const q = query(collection(db, 'menuItems'), where('restaurantId', '==', user.id));
    const querySnapshot = await getDocs(q);
    const menuItemsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as MenuItem));
    setMenuItems(menuItemsData);
  };

  const handleAddCategory = async () => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'categories'), {
        ...newCategory,
        restaurantId: user.id,
      });
      setNewCategory(defaultCategory);
      setIsAddingCategory(false);
      fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleUpdateCategory = async (categoryId: string) => {
    if (!editedCategory) return;
    try {
      await updateDoc(doc(db, 'categories', categoryId), {
        name: editedCategory.name,
        iconURL: editedCategory.iconURL,
      });
      setEditingCategory(null);
      setEditedCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteDoc(doc(db, 'categories', categoryId));
      const itemsToDelete = menuItems.filter(item => item.categoryId === categoryId);
      await Promise.all(itemsToDelete.map(item => deleteDoc(doc(db, 'menuItems', item.id))));
      fetchCategories();
      fetchMenuItems();
      if (selectedCategory === categoryId) {
        setSelectedCategory(null);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleAddMenuItem = async () => {
    if (!user || !selectedCategory) return;
    try {
      await addDoc(collection(db, 'menuItems'), {
        ...newMenuItem,
        categoryId: selectedCategory,
        restaurantId: user.id,
      });
      setNewMenuItem(defaultMenuItem);
      setIsAddingMenuItem(false);
      fetchMenuItems();
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const handleUpdateMenuItem = async (itemId: string) => {
    if (!editedMenuItem) return;
    try {
      await updateDoc(doc(db, 'menuItems', itemId), {
        name: editedMenuItem.name,
        description: editedMenuItem.description,
        price: editedMenuItem.price,
        imageURL: editedMenuItem.imageURL,
        isVeg: editedMenuItem.isVeg,
        isAvailable: editedMenuItem.isAvailable,
      });
      setEditingMenuItem(null);
      setEditedMenuItem(null);
      fetchMenuItems();
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  const handleDeleteMenuItem = async (menuItemId: string) => {
    try {
      await deleteDoc(doc(db, 'menuItems', menuItemId));
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const toggleItemAvailability = async (itemId: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'menuItems', itemId), {
        isAvailable: !currentStatus,
      });
      fetchMenuItems();
    } catch (error) {
      console.error('Error toggling item availability:', error);
    }
  };

  const startEditingCategory = (category: FoodCategory) => {
    setEditingCategory(category.id);
    setEditedCategory(category);
  };

  const startEditingMenuItem = (item: MenuItem) => {
    setEditingMenuItem(item.id);
    setEditedMenuItem(item);
  };

  return (
    <div className="space-y-6">
      {/* Categories Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Food Categories</h2>
          <button
            onClick={() => setIsAddingCategory(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-3 mr-2" />
            Add
          </button>
        </div>

        {isAddingCategory && (
          <CategoryForm
            category={newCategory}
            onSave={handleAddCategory}
            onCancel={() => setIsAddingCategory(false)}
            onChange={(field, value) => setNewCategory(prev => ({ ...prev, [field]: value }))}
            isNew
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            editingCategory === category.id ? (
              <CategoryForm
                key={category.id}
                category={editedCategory || category}
                onSave={() => handleUpdateCategory(category.id)}
                onCancel={() => {
                  setEditingCategory(null);
                  setEditedCategory(null);
                }}
                onChange={(field, value) => {
                  if (editedCategory) {
                    setEditedCategory({ ...editedCategory, [field]: value });
                  }
                }}
              />
            ) : (
              <CategoryCard
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.id}
                itemCount={menuItems.filter(item => item.categoryId === category.id).length}
                onSelect={() => setSelectedCategory(category.id)}
                onEdit={() => startEditingCategory(category)}
                onDelete={() => handleDeleteCategory(category.id)}
              />
            )
          ))}
        </div>
      </div>

      {/* Menu Items Section */}
      {selectedCategory && (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <img
                src={categories.find(c => c.id === selectedCategory)?.iconURL}
                alt="Category Icon"
                className="w-8 h-8 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold text-gray-900">
                {categories.find(c => c.id === selectedCategory)?.name} - Menu Items
              </h2>
            </div>
            <button
              onClick={() => setIsAddingMenuItem(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-3 mr-2" />
              Add 
            </button>
          </div>

          {isAddingMenuItem && (
            <MenuItemForm
              item={newMenuItem}
              onSave={handleAddMenuItem}
              onCancel={() => setIsAddingMenuItem(false)}
              onChange={(field, value) => setNewMenuItem(prev => ({ ...prev, [field]: value }))}
              isNew
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems
              .filter(item => item.categoryId === selectedCategory)
              .map((item) => (
                editingMenuItem === item.id ? (
                  <MenuItemForm
                    key={item.id}
                    item={editedMenuItem || item}
                    onSave={() => handleUpdateMenuItem(item.id)}
                    onCancel={() => {
                      setEditingMenuItem(null);
                      setEditedMenuItem(null);
                    }}
                    onChange={(field, value) => {
                      if (editedMenuItem) {
                        setEditedMenuItem({ ...editedMenuItem, [field]: value });
                      }
                    }}
                  />
                ) : (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onEdit={() => startEditingMenuItem(item)}
                    onDelete={() => handleDeleteMenuItem(item.id)}
                    onToggleAvailability={() => toggleItemAvailability(item.id, item.isAvailable)}
                  />
                )
              ))}
          </div>
        </div>
      )}
    </div>
  );
}