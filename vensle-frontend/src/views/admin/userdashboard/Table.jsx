import React, { useState } from "react";
import { useTable, useRowSelect, usePagination, useSortBy, useFilters, useGlobalFilter } from "react-table";

import PreviewPopup from "components/previewPopup/PreviewPopup";
 
const Table = ({ columns, data }) => {
 const [open, setOpen] = useState(false)
 const [selectedProduct, setSelectedProduct] = useState(null)

 const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   page,
   nextPage,
   canNextPage,
   canPreviousPage,
   previousPage,
   pageOptions,
   gotoPage,
   pageCount,
   selectedFlatRows,
   prepareRow,
   state,
   setGlobalFilter,
 } = useTable(
	 { columns, data, initialState: {
	    globalFilter: ""
	 }},
	 useFilters, //For column-specific filter
	 useGlobalFilter, //For global filter
	 useSortBy,
	 usePagination,
	 useRowSelect,
 )

  const handleProductQuickView = (product) => {
      setSelectedProduct(product)
      setOpen(true);
  }
 
 return (
	 <div>

	    {selectedProduct && <PreviewPopup open={open} setOpen={setOpen} selectedProduct={selectedProduct} />}
	 
            <table
	 	className="w-full rounded-md overflow-hidden"
	 	{...getTableProps()}
	    >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr
			    className="bg-white"
			    {...headerGroup.getHeaderGroupProps()}
			>
                            {headerGroup.headers.map((column) => (
                                <th className="py-3 text-[17px] font-medium text-left" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
				     <span>
                                        {column.isSorted
                                            ? (column.isSortedDesc
                                                ? 'V'
                                                : 'X')
                                            :''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr
				className="hover:bg-gray-100"
				{...row.getRowProps()}
			    >
                                {row.cells.map((cell) => {
                                    return (
                                        <td
					  onClick={() => handleProductQuickView(row.original)}
					  className="py-4 text-[14px] cursor-pointer" {...cell.getCellProps()}
					>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
         </div>
 )
}

export default Table
