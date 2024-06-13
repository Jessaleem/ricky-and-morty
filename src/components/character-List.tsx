interface CharacterProps {
  title: string;
  children: React.ReactNode;
  quantity: number;
}

export function CharacterList({ title, children, quantity }: CharacterProps) {
  return (
    <section className="mt-8">
      <div className="border-b-2 py-4 mb-4">
        <h1 className="uppercase text-gray-400">
          {title} ({quantity})
        </h1>
      </div>
      <div>{children}</div>
    </section>
  );
}
