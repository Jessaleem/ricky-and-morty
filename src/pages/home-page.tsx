import { SearchBar } from "../components/search-bar";
import { CharacterList } from "../components/character-List";
import { CharacterCard } from "../components/character-card";
import { useCharacter } from "../hooks/useCharacter";

export function HomePage() {
  const { characters, favorites } = useCharacter();

  if (!characters) {
    return null;
  }

  return (
    <div className="px-6 py-8">
      <h1 className="font-bold text-2xl mb-8">Rick and Morty list</h1>
      <SearchBar />
      {favorites && (
        <CharacterList title="STARRED CHARACTERS" quantity={favorites.length}>
          {favorites.map((character) => (
            <CharacterCard
              key={`favorite-${character.id}`}
              character={character}
              isFavorite={true}
            />
          ))}
        </CharacterList>
      )}
      <CharacterList title="CHARACTERS" quantity={characters.length}>
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isFavorite={false}
          />
        ))}
      </CharacterList>
    </div>
  );
}
