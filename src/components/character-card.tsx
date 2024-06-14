import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { CharacterFav } from "../interfaces/character";
import { Link } from "react-router-dom";
import { useCharacter } from "../hooks/useCharacter";

interface CharacterProps {
  character: CharacterFav;
  isFavorite: boolean;
}

export function CharacterCard({ character, isFavorite }: CharacterProps) {
  const { addFav, deleteFav } = useCharacter();

  function handleClick() {
    if (isFavorite) {
      deleteFav(character.id);
    } else {
      addFav(character);
    }
  }

  return (
    <div className="flex items-center gap-4 py-4 border-b-2 pr-2">
      <Link
        to={`character/${character.id}`}
        className="rounded-full h-14 w-14 overflow-hidden"
      >
        <img src={character.image} alt={character.name} className="" />
      </Link>
      <Link to={`character/${character.id}`} className="flex-1">
        <p>{character.name}</p>
        <p>{character.species}</p>
      </Link>

      <button onClick={handleClick}>
        {isFavorite ? <IconHeartFilled color="#63D838" /> : <IconHeart />}
      </button>
    </div>
  );
}
