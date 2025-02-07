import React, { useState } from 'react';
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  SelectChangeEvent
} from '@mui/material';
import { Film } from '../../types/types';

interface FilmSelectorProps {
  films: Film[];
  onSelectFilm: (filmId: number) => void;
}

function FilmSelector({ films, onSelectFilm }: FilmSelectorProps) {
  const [selectedFilm, setSelectedFilm] = useState<number | ''>('');

  const handleChange = (event: SelectChangeEvent<number>) => {
    const filmId = event.target.value as number;
    setSelectedFilm(filmId);
    onSelectFilm(filmId);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Выберите фильм</InputLabel>
        <Select
          value={selectedFilm}
          onChange={handleChange}
          label="Выберите фильм"
        >
          <MenuItem value="">
            <em>Не выбрано</em>
          </MenuItem>
          {films.map(film => (
            <MenuItem key={film.id} value={film.id}>
              {film.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default FilmSelector;
