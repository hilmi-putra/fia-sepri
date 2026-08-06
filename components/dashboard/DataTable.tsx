import type { ReactNode } from 'react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
  onAdd?: () => void;
  addLabel?: string;
  renderActions?: (item: T) => ReactNode;
}

export function DataTable<T extends { id: string }>({
  title,
  columns,
  data,
  onAdd,
  addLabel = 'Add New',
  renderActions,
}: DataTableProps<T>) {
  return (
    <div className="data-table-container">
      <div className="data-table-header">
        <h2 className="data-table-title">{title}</h2>
        {onAdd && (
          <button className="btn btn-primary btn-sm" onClick={onAdd}>
            {addLabel}
          </button>
        )}
      </div>

      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>
            ))}
            {renderActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (renderActions ? 1 : 0)} style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
                No data found.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render
                      ? col.render(item)
                      : String((item as Record<string, unknown>)[col.key] ?? '-')}
                  </td>
                ))}
                {renderActions && (
                  <td>
                    <div className="table-actions">{renderActions(item)}</div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
