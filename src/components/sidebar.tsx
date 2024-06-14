import { SearchBar } from "../components/search-bar";
import { CharacterList } from "../components/character-List";
import { CharacterCard } from "../components/character-card";
import { useCharacter } from "../hooks/useCharacter";
import { CharacterFav } from "../interfaces/character";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function Sidebar() {
  const { characters, favorites, sortBy } = useCharacter();
  const [searchParams] = useSearchParams();

  const fav = searchParams.get("fav") ?? "";

  const sortedCharacters: CharacterFav[] = useMemo(() => {
    if (sortBy === "a-z") {
      return characters.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else if (sortBy === "z-a") {
      return characters.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
    } else {
      return characters;
    }
  }, [sortBy, characters]);

  return (
    <div className="px-6 py-8">
      <h1 className="font-bold text-2xl mb-8">Rick and Morty list</h1>
      <SearchBar />
      <div className="overflow-y-scroll max-h-screen mt-8">
        {favorites && (!fav || fav === "Starred") ? (
          <CharacterList title="STARRED CHARACTERS" quantity={favorites.length}>
            {favorites.map((character) => (
              <CharacterCard
                key={`favorite-${character.id}`}
                character={character}
                isFavorite={true}
              />
            ))}
          </CharacterList>
        ) : null}
        {!fav || fav === "Others" ? (
          <CharacterList
            title="CHARACTERS"
            quantity={
              sortedCharacters.filter((character) => !character.isFavorite)
                .length
            }
          >
            {sortedCharacters.map((character) => {
              if (!character.isFavorite) {
                return (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    isFavorite={false}
                  />
                );
              }
            })}
          </CharacterList>
        ) : null}
      </div>
    </div>
  );
}
