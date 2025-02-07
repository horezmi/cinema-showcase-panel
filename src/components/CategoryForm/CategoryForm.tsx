import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilmSelector from '../FilmSelector/FilmSelector';
import { Category, Film, SubCategory } from '../../types/types';

interface CategoryFormProps {
  category: Category;
  films: Film[];
  onSave: (updatedCategory: Category) => void;
  onCancel: () => void;
}

function CategoryForm({
  category,
  films,
  onSave,
  onCancel
}: CategoryFormProps) {
  const [name, setName] = useState(category.name);
  const [subCategories, setSubCategories] = useState<SubCategory[]>(
    category.subCategories
  );

  const handleAddSubCategory = () => {
    const newSubCategory: SubCategory = {
      id: null, 
      name: '',
      filmIds: [],
      isNew: true
    };
    setSubCategories(prev => [...prev, newSubCategory]);
  };

  const handleAddFilm = (subCategoryId: number | null, filmId: number) => {
    setSubCategories(prev =>
      prev.map(sub =>
        sub.id === subCategoryId
          ? { ...sub, filmIds: [...sub.filmIds, filmId] }
          : sub
      )
    );
  };

  const handleDeleteFilm = (subCategoryId: number | null, filmId: number) => {
    setSubCategories(prev =>
      prev.map(sub =>
        sub.id === subCategoryId
          ? { ...sub, filmIds: sub.filmIds.filter(id => id !== filmId) }
          : sub
      )
    );
  };

  const handleDeleteSubCategory = (subCategoryId: number | null) => {
    setSubCategories(prev =>
      prev.map(sub =>
        sub.id === subCategoryId ? { ...sub, deleted: true } : sub
      )
    );
  };

  const handleSave = () => {
    onSave({
      ...category,
      name,
      subCategories,
      updated: true
    });
  };

  return (
    <Box sx={{ width: '50%', mt: 2 }}>
      <TextField
        label="Название категории"
        value={name}
        onChange={e => setName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      {subCategories
        .filter(sub => !sub.deleted)
        .map(subCategory => (
          <Box
            key={subCategory.id}
            sx={{ mb: 2, border: '1px solid #ccc', p: 2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <TextField
                label="Название подкатегории"
                value={subCategory.name}
                onChange={e =>
                  setSubCategories(prev =>
                    prev.map(sub =>
                      sub.id === subCategory.id
                        ? { ...sub, name: e.target.value }
                        : sub
                    )
                  )
                }
                fullWidth
              />
              <IconButton
                onClick={() => handleDeleteSubCategory(subCategory.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <List>
              {subCategory.filmIds.map(filmId => (
                <ListItem key={filmId}>
                  <ListItemText
                    primary={films.find(f => f.id === filmId)?.name}
                  />
                  <IconButton
                    onClick={() => handleDeleteFilm(subCategory.id, filmId)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            <FilmSelector
              films={films.filter(
                film => !subCategory.filmIds.includes(film.id)
              )}
              onSelectFilm={filmId => handleAddFilm(subCategory.id, filmId)}
            />
          </Box>
        ))}
      <Button onClick={handleAddSubCategory} sx={{ mt: 2 }}>
        Добавить подкатегорию
      </Button>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleSave}>
          Сохранить
        </Button>
        <Button onClick={onCancel} sx={{ ml: 2 }}>
          Отмена
        </Button>
      </Box>
    </Box>
  );
}

export default CategoryForm;
