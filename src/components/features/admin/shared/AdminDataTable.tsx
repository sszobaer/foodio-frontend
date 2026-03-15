import React from "react";

export interface AdminTableColumn<T> {
  key: string;
  header: string;
  className?: string;
  render: (row: T, index: number) => React.ReactNode;
}

interface Props<T> {
  columns: AdminTableColumn<T>[];
  data: T[];
  emptyText?: string;
  rowKey: (row: T, index: number) => string;
}

export default function AdminDataTable<T>({
  columns,
  data,
  emptyText = "No data found.",
  rowKey,
}: Props<T>) {
  return (
    <div className="w-full overflow-hidden rounded-[12px] border border-[#E8E2D9] bg-white p-[1px]">
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="h-[39px]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={[
                    "border-b border-[#E8E2D9] bg-white px-4 text-left",
                    "text-[14px] font-semibold leading-5 tracking-[-0.15px] text-[#1F1F1F]",
                    column.className ?? "",
                  ].join(" ")}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={rowKey(row, index)} className="h-[49px]">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={[
                        "border-b border-[#E8E2D9] px-4 align-middle",
                        "text-[14px] font-medium leading-5 tracking-[-0.15px] text-[#2C2C2C]",
                        "last:border-b-0",
                        column.className ?? "",
                      ].join(" ")}
                    >
                      {column.render(row, index)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="h-[72px]">
                <td
                  colSpan={columns.length}
                  className="px-4 text-center text-[14px] font-medium text-[#7E7E7E]"
                >
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}