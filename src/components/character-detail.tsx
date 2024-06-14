interface CharacterDetail {
  title: string;
  value: string;
}

export function CharacterDetail({ title, value }: CharacterDetail) {
  return (
    <div className="my-4">
      <p>{title}</p>
      <p className="text-[#6B7280]">{value}</p>
    </div>
  );
}
