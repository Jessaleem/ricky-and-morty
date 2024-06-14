import { gql, useQuery } from "@apollo/client";
import {
  IconArrowLeft,
  IconHeart,
  IconHeartFilled,
  IconSend,
  IconTrash,
} from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { CharacterDetail } from "../components/character-detail";
import { useCharacter } from "../hooks/useCharacter";
import { Divider } from "../components/ui/divider";
import { useState } from "react";

const characterDetailQuery = gql`
  query Character($id: ID!) {
    character(id: $id) {
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
`;

export function CharacterPage() {
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, addComentary, commentaries, removeCommentary } =
    useCharacter();

  const isFavorite = favorites.some((character) => +character.id === +id!);

  const { loading, data } = useQuery(characterDetailQuery, {
    variables: { id },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  const character = data.character;

  const charCommentaries = commentaries.filter(
    (commentary) => +commentary.characterId === +id!
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComentary({ characterId: +id!, message });
    setMessage("");
  };

  return (
    <section className="px-6 py-8 md:ml-8">
      <button onClick={() => navigate("..")} className="md:hidden">
        <IconArrowLeft color="#8054C7" />
      </button>
      <div className="rounded-full h-20 w-20 mt-5 mb-4 relative z-0">
        <img src={character.image} className="rounded-full" />
        <div className="absolute right-0 bottom-0 z-10 rounded-full pt-[0.2rem] bg-white">
          {isFavorite ? (
            <IconHeartFilled
              color="#63D838"
              width={"1.8rem"}
              height={"1.536rem"}
            />
          ) : (
            <IconHeart />
          )}
        </div>
      </div>
      <p className="font-bold text-2xl">{character.name}</p>
      <div className="mt-10">
        <CharacterDetail title="Specie" value={character.species} />
        <Divider />
        <CharacterDetail title="Status" value={character.status} />
        <Divider />
        <CharacterDetail title="Occupation" value={character.species} />
      </div>
      <form onSubmit={onSubmit} className="mt-12 max-w-4xl">
        <label htmlFor="comment">Add Commentary</label>
        <div className="flex rounded-lg bg-gray-200 border px-4 py-2 items-center gap-2">
          <input
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border-none bg-gray-200 indent-2  focus:outline-none"
          />
          <button type="submit" className="bg-primary100 p-1 rounded-lg">
            <IconSend size={24} color="#5A3696" />
          </button>
        </div>
      </form>
      {charCommentaries.length > 0 ? (
        <div className="mt-10 max-w-4xl">
          {charCommentaries.map((commentary) => (
            <div className="flex justify-between items-center gap-3 mb-2 border-b-2 py-3">
              <p>{commentary.message}</p>
              <button onClick={() => removeCommentary(commentary.id, +id!)}>
                <IconTrash />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-20"> No commentaries...</p>
      )}
    </section>
  );
}
