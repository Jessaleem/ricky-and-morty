import { createContext, useEffect, useState } from "react";
import { Character, CharacterFav } from "../interfaces/character";
import { gql, useQuery } from "@apollo/client";
import { useLocalStorage } from "../hooks/useLocalStorage";

export interface CharacterContextType {
  characters: Character[];
  addFav: (character: Character) => void;
  deleteFav: (id: number) => void;
  deleteCharacter: (id: number) => void;
  favorites: Character[];
}

export const CharacterContext = createContext<CharacterContextType>({
  characters: [],
  addFav: () => {},
  deleteFav: () => {},
  deleteCharacter: () => {},
  favorites: [],
});

const characterQuery = gql`
  query {
    characters {
      info {
        count
      }
      results {
        id
        name
        species
        image
      }
    }
  }
`;

export function CharacterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [characters, setCharacters] = useState<CharacterFav[]>([]);
  const { data, loading } = useQuery(characterQuery);
  const [favorites, setFavorites] = useLocalStorage<Character[]>(
    "favorites",
    []
  );

  useEffect(() => {
    if (data) {
      setCharacters(data.characters.results);
    }
  }, [loading, data]);

  const addFav = (character: Character) => {
    const favoriteExtists = favorites.find((fav) => character.id === fav.id);
    if (favoriteExtists) {
      return;
    }
    setFavorites((prev) => [...prev, character]);
    deleteCharacter(character.id);
  };

  const deleteFav = (id: number) => {
    const filteredFavorites = favorites.filter(
      (favorite) => favorite.id !== id
    );
    setFavorites(filteredFavorites);
  };

  const deleteCharacter = (id: number) => {
    const filteredCharacters = characters.filter(
      (character) => character.id !== id
    );
    setCharacters(filteredCharacters);
  };

  return (
    <CharacterContext.Provider
      value={{ addFav, deleteFav, deleteCharacter, characters, favorites }}
    >
      {children}
    </CharacterContext.Provider>
  );
}
