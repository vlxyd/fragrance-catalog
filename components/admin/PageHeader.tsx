interface PageHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">
          {title}
        </h1>

        <p className="mt-2 text-stone-500">
          {description}
        </p>
      </div>

      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
}