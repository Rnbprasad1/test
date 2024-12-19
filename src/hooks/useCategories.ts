import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Category } from '../types/category';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const categoriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Category));
      setCategories(categoriesData);
    } catch (err) {
      setError('Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (categoryData: Omit<Category, 'id'>) => {
    try {
      // Check for duplicate category names (case-insensitive)
      const existingCategory = categories.find(
        c => c.name.toLowerCase() === categoryData.name.toLowerCase()
      );

      if (existingCategory) {
        throw new Error('Category name already exists');
      }

      await addDoc(collection(db, 'categories'), {
        ...categoryData,
        createdAt: new Date().toISOString(),
        hiddenBy: []
      });

      await fetchCategories();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add category');
      return false;
    }
  };

  const updateCategory = async (categoryId: string, categoryData: Partial<Category>) => {
    try {
      // Check for duplicate names when updating
      if (categoryData.name) {
        const existingCategory = categories.find(
          c => c.id !== categoryId && 
              c.name.toLowerCase() === categoryData.name.toLowerCase()
        );

        if (existingCategory) {
          throw new Error('Category name already exists');
        }
      }

      await updateDoc(doc(db, 'categories', categoryId), categoryData);
      await fetchCategories();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update category');
      return false;
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      await deleteDoc(doc(db, 'categories', categoryId));
      await fetchCategories();
      return true;
    } catch (err) {
      setError('Failed to delete category');
      return false;
    }
  };

  const hideCategory = async (categoryId: string, userId: string) => {
    try {
      const category = categories.find(c => c.id === categoryId);
      if (!category) return;

      const hiddenBy = category.hiddenBy || [];
      const isHidden = hiddenBy.includes(userId);

      await updateDoc(doc(db, 'categories', categoryId), {
        hiddenBy: isHidden 
          ? hiddenBy.filter(id => id !== userId)
          : [...hiddenBy, userId]
      });

      await fetchCategories();
    } catch (err) {
      setError('Failed to update category visibility');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    hideCategory,
    refreshCategories: fetchCategories
  };
}