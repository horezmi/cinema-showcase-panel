import React, { useCallback, useState } from 'react';
import { initialData } from './data/data';
import CategoryList from './components/CategoryList/CategoryList';
import CategoryForm from './components/CategoryForm/CategoryForm';
import { Box, Button } from '@mui/material';
import { Category, Film } from './types/types';
import { areArraysEqual } from './utils/areArraysEqual';

const App = () => {
  const [categories, setCategories] = useState<Category[]>(
    initialData.categories
  );
  const [films] = useState<Film[]>(initialData.films);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Логика сохранения
  const handleSave = useCallback(() => {
    const filteredCategories = categories.filter(
      cat => !(cat.deleted && !cat.id)
    );

    const getNewCategories = (categories: Category[]) => {
      return categories
        .map(cat => ({
          ...cat,
          id: cat.isNew ? null : cat.id
        }))
        .filter(cat => !cat.id && !cat.deleted)
        .map(cat => ({
          ...cat,
          subCategories: cat.subCategories
            .filter(sub => !sub.deleted)
            .map(sub => ({
              ...sub,
              id: sub.isNew ? null : sub.id
            }))
        }));
    };

    const getUpdatedCategories = (categories: Category[]) => {
      return categories
        .map(cat => ({
          ...cat,
          id: cat.isNew ? null : cat.id
        }))
        .filter(cat => cat.id && !cat.deleted)
        .filter(cat => {
          const originalCategory = initialData.categories.find(
            originalCat => originalCat.id === cat.id
          );
          if (!originalCategory) return false;

          return (
            originalCategory.name !== cat.name ||
            JSON.stringify(originalCategory.subCategories) !==
              JSON.stringify(cat.subCategories)
          );
        })
        .map(cat => {
          const originalCategory = initialData.categories.find(
            originalCat => originalCat.id === cat.id
          );

          const updatedSubCategories = cat.subCategories
            .filter(sub => !sub.deleted)
            .filter(sub => {
              if (!originalCategory) return true;

              const originalSubCategory = originalCategory.subCategories.find(
                originalSub => originalSub.id === sub.id
              );
              if (!originalSubCategory) return true;

              return (
                originalSubCategory.name !== sub.name ||
                !areArraysEqual(originalSubCategory.filmIds, sub.filmIds)
              );
            })
            .map(sub => ({
              ...sub,
              id: sub.isNew ? null : sub.id
            }));

          return {
            id: cat.id,
            name: cat.name,
            updatedSubCategories,
            deletedSubCategories: cat.subCategories
              .filter(sub => sub.deleted)
              .map(sub => sub.id!)
          };
        });
    };

    const getDeletedCategories = (categories: Category[]) => {
      return categories
        .map(cat => ({
          ...cat,
          id: cat.isNew ? null : cat.id
        }))
        .filter(cat => cat.deleted && cat.id)
        .map(cat => ({ id: cat.id! }));
    };

    const newCategories = getNewCategories(filteredCategories);
    const updatedCategories = getUpdatedCategories(filteredCategories);
    const deletedCategories = getDeletedCategories(filteredCategories);

    console.log({
      newCategories,
      updatedCategories,
      deletedCategories
    });

    setCategories(filteredCategories);
  }, [categories]);

  const handleAddCategory = useCallback(() => {
    const newCategory: Category = {
      id: Date.now(),
      name: 'Новая категория',
      subCategories: [],
      isNew: true,
      deleted: false
    };
    setCategories(prev => [...prev, newCategory]);
  }, []);

  const handleDeleteCategory = useCallback((categoryId: number | null) => {
    setCategories(prev =>
      prev.map(cat => (cat.id === categoryId ? { ...cat, deleted: true } : cat))
    );
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
      <Button variant="outlined" onClick={handleAddCategory}>
        Добавить категорию
      </Button>
      <Button variant="contained" onClick={handleSave}>
        Сохранить
      </Button>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <CategoryList
          categories={categories.filter(cat => !cat.deleted)}
          films={films}
          onEditCategory={setEditingCategory}
          onDeleteCategory={handleDeleteCategory}
        />
        {editingCategory && (
          <CategoryForm
            category={editingCategory}
            films={films}
            onSave={updatedCategory => {
              const updatedCategories = categories.map(cat =>
                cat.id === updatedCategory.id
                  ? {
                      ...cat,
                      name: updatedCategory.name,
                      subCategories: updatedCategory.subCategories,
                      updated:
                        cat.name !== updatedCategory.name ||
                        !areArraysEqual(
                          cat.subCategories,
                          updatedCategory.subCategories
                        )
                    }
                  : cat
              );
              setCategories(updatedCategories);
              setEditingCategory(null);
            }}
            onCancel={() => setEditingCategory(null)}
          />
        )}
      </Box>
    </Box>
  );
};

export default App;
