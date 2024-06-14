type ButtonProps = {
  children: React.ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function FilterButton({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`px-5 py-[0.4rem] border-solid border-[1px] border-[#E5E7EB] rounded-md font-semibold ${className}`}
    >
      {children}
    </button>
  );
}
