interface GridProps {
  columns: number;
  items: { title: string; content: string }[];
}

export function Grid({ columns, items }: GridProps) {
  return (
    <div className={`grid grid-cols-${columns} gap-4 p-4`}>
      {items.map((item, index) => (
        <div key={index} className="bg-card p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
