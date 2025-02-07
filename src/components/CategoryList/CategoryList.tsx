import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Category, Film } from '../../types/types';

interface CategoryListProps {
  categories: Category[];
  films: Film[];
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: number | null) => void;
}

const CategoryList = React.memo(
  ({
    categories,
    films,
    onEditCategory,
    onDeleteCategory
  }: CategoryListProps) => {
    return (
      <Box sx={{ width: '50%' }}>
        {categories.map(category => (
          <Box
            key={category.id}
            sx={{ mb: 3, border: '2px solid #848484', p: 2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0 }}>
              <ListItemText primary={category.name} />
              <Button
                variant="outlined"
                onClick={() => onEditCategory(category)}
              >
                Редактировать
              </Button>
              <IconButton
                onClick={() => onDeleteCategory(category.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <List sx={{ pl: 2 }}>
              {category.subCategories
                .filter(sub => !sub.deleted)
                .map(subCategory => (
                  <Box key={subCategory.id} sx={{ mb: 0 }}>
                    <ListItemText
                      primary={subCategory.name}
                      sx={{ fontWeight: 'bold' }}
                    />
                    <List sx={{ pl: 0 }}>
                      {subCategory.filmIds.map(filmId => (
                        <ListItem key={filmId}>
                          <ListItemText
                            primary={
                              films.find(film => film.id === filmId)?.name
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ))}
            </List>
          </Box>
        ))}
      </Box>
    );
  }
);

export default CategoryList;
