import { useParams } from "react-router-dom";

export function CharacterPage() {
  const { id } = useParams();

  return <div>character-page {id}</div>;
}
