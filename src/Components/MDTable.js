import React, { useMemo } from "react";
import { useTable } from "react-table";
import "./table.css";

const MDTable = ({ COLUMNS, DATA }) => {
  const columns = useMemo(() => COLUMNS, [COLUMNS]);
  const data = useMemo(() => DATA, [DATA]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });
  return (
    <>
      <table className="dtable" {...getTableProps()}>
        <thead className="dhead">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="dbody" {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells[1].value === "-1" ? (
                  <td className="alert alert-danger empty-table">Click on a point to see additional information!</td>
                ) : (
                  row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default MDTable;
