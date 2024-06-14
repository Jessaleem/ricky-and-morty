interface FilterDetailProps {
  title: string;
  children: React.ReactNode;
}

export default function FilterDetail({ title, children }: FilterDetailProps) {
  return (
    <div className="flex flex-col gap-4 mt-14 mb-2 md:mt-6">
      <p className="text-[#6B7280]">{title}</p>
      <div className="flex gap-2 justify-between">{children}</div>
    </div>
  );
}
