import { createContext, useEffect, useState } from "react";
import { Character, CharacterFav, Commentary } from "../interfaces/character";
import { gql, useQuery } from "@apollo/client";
import { useLocalStorage } from "../hooks/useLocalStorage";

export interface CharacterContextType {
  characters: CharacterFav[];
  addFav: (character: CharacterFav) => void;
  deleteFav: (id: number) => void;
  deleteCharacter: (id: number) => void;
  favorites: CharacterFav[];
  name: string;
  handleName: (value: string) => void;
  species: string;
  gender: string;
  status: string;
  sortBy: string;
  handleSort: (value: string) => void;
  setFilter: (options: FilterOptions) => void;
  commentaries: Commentary[];
  addComentary: (
    comentary: Pick<Commentary, "characterId" | "message">
  ) => void;
  removeCommentary: (id: string, characterId: number) => void;
}

type FilterOptions = {
  species: string;
  gender: string;
  status: string;
};

export const CharacterContext = createContext<CharacterContextType>({
  characters: [],
  addFav: () => {},
  deleteFav: () => {},
  deleteCharacter: () => {},
  favorites: [],
  name: "",
  handleName: () => {},
  species: "",
  gender: "",
  status: "",
  sortBy: "",
  handleSort: () => {},
  setFilter: () => {},
  commentaries: [],
  addComentary: () => {},
  removeCommentary: () => {},
});

const characterQuery = gql`
  query Characters(
    $name: String
    $status: String
    $species: String
    $gender: String
  ) {
    characters(
      filter: {
        name: $name
        status: $status
        species: $species
        gender: $gender
      }
    ) {
      info {
        count
      }
      results {
        id
        name
        species
        status
        type
        gender
        origin {
          name
        }
        location {
          name
        }
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
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [species, setspecies] = useState("");
  const [gender, setGender] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [characters, setCharacters] = useState<CharacterFav[]>([]);
  const [commentaries, setCommentaries] = useLocalStorage<Commentary[]>(
    "commentaries",
    []
  );

  const { data, loading } = useQuery(characterQuery, {
    variables: {
      name,
      status,
      species,
      gender,
    },
  });
  const [favorites, setFavorites] = useLocalStorage<CharacterFav[]>(
    "favorites",
    []
  );

  useEffect(() => {
    if (data) {
      setCharacters(
        data.characters.results.map((character: Character) => {
          return {
            ...character,
            isFavorite: favorites.some((char) => +char.id === +character.id),
          };
        })
      );
    }
  }, [loading, data, favorites]);

  const addFav = (character: CharacterFav) => {
    const favoriteExtists = favorites.find((fav) => character.id === fav.id);
    if (favoriteExtists) {
      return;
    }
    setFavorites((prev) => [...prev, character]);
    const newCharacters = characters.map((char) => {
      if (char.id === character.id) {
        return {
          ...char,
          isFavorite: true,
        };
      }
      return char;
    });
    setCharacters(newCharacters);
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

  const handleSort = (value: string) => {
    setSortBy(value);
  };

  const handleName = (value: string) => {
    setName(value);
  };

  const setFilter = ({ species, gender, status }: FilterOptions) => {
    setspecies(species);
    setStatus(status);
    setGender(gender);
  };

  const addComentary = (
    commentary: Pick<Commentary, "characterId" | "message">
  ) => {
    const newCommentary = {
      ...commentary,
      id: crypto.randomUUID(),
    };
    setCommentaries((prev) => [...prev, newCommentary]);
    const newCharacters = characters.map((char) => {
      if (char.id === commentary.characterId) {
        return {
          ...char,
          commentaries: [...char.commentaries, newCommentary],
        };
      }
      return char;
    });
    setCharacters(newCharacters);
  };

  const removeCommentary = (id: string, characterId: number) => {
    const filteredComments = commentaries.filter(
      (comment) => comment.id !== id
    );
    setCommentaries(filteredComments);
    const newCharacters = characters.map((character) => {
      if (character.id === characterId) {
        character.commentaries = character.commentaries.filter(
          (commentary) => commentary.id !== id
        );
        return character;
      }
      return character;
    });
    setCharacters(newCharacters);
  };

  return (
    <CharacterContext.Provider
      value={{
        addFav,
        deleteFav,
        deleteCharacter,
        characters,
        favorites,
        name,
        gender,
        species,
        status,
        handleSort,
        sortBy,
        setFilter,
        commentaries,
        addComentary,
        removeCommentary,
        handleName,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}
