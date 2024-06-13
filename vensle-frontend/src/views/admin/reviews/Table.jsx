import React from "react";
import { useTable, useRowSelect, usePagination, useSortBy, useFilters, useGlobalFilter } from "react-table";

import { Checkbox } from './Checkbox';
 
const Table = ({ columns, data }) => {
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
	 (hooks) => {
		 hooks.visibleColumns.push((columns) => {
		    return [
			{
			   id: 'selection',
			   Header: ({ getToggleAllRowsSelectedProps }) => (
		   	      <Checkbox {...getToggleAllRowsSelectedProps()} />
			   ),
			   Cell: ({ row }) => (
		   	      <Checkbox {...row.getToggleRowSelectedProps()} />
			   )
			},
			...columns
		    ]
		 })
	 }
 )

 const { globalFilter, pageIndex } = state;
 
 return (
	 <div>
	    <input
		type="text"
	 	className="px-3 w-[45%] rounded-md py-2 mb-6"
		value={globalFilter}
		onChange={(e) => setGlobalFilter(e.target.value)}
	 	placeholder = "Search..."
	    />
	 
            <table
	 	className="w-full rounded-md overflow-hidden"
	 	{...getTableProps()}
	    >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr
			    className="p-2 text-sm text-blue-900 bg-blue-500/50" 
			    {...headerGroup.getHeaderGroupProps()}
			>
                            {headerGroup.headers.map((column) => (
                                <th className="py-2 text-left" {...column.getHeaderProps(column.getSortByToggleProps())}>
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
				className="even:bg-gray-100 odd:bg-white"
				{...row.getRowProps()}
			    >
                                {row.cells.map((cell) => {
                                    return (
                                        <td className="py-3" {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
	    <div className="text-center mt-4">
	      <span className="mr-4">
	 	Page{' '}
	 	<strong>
	 	   {pageIndex + 1} of {pageOptions.length}
	 	</strong>
	      </span>
	      <span>
		      <button
	 		className="border mr-2 border-gray-300 p-2 rounded-md"
			onClick={() => gotoPage(0)}
			disabled={!canPreviousPage}
		      >
			{'<<'}
		      </button>
		      <button
	 		className="border mr-2 border-gray-300 p-1 rounded-md"
			onClick={() => previousPage()}
			disabled={!canPreviousPage}
		      >
			Previous</button>
		      <button
	 		className="border mr-2 border-gray-300 p-1 rounded-md"
			onClick={() => nextPage()}
			disabled={!canNextPage}
		      >
			Next
		      </button>
		      <button
	 		className="border border-gray-300 p-2 rounded-md"
			onClick={() => gotoPage(pageCount - 1)}
			disabled={!canNextPage}
		      >
			{'>>'}
		      </button>
	      </span>
	      <span className="ml-4">
	 	Go to page: {' '}
	 	<input
	 	    type='number'
	 	    className="w-10 ml-2 py-1 px-2 border-gray-300 rounded-sm"
	 	    defaultValue={pageIndex + 1}
	 	    onChange={e => {
			const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
			gotoPage(pageNumber)
		    }}
	 	/>
	      </span>
	    </div>
	    <pre>
	 	<code>
	 	  {JSON.stringify(
		     {
			selectedFlatRows: selectedFlatRows.map((row) => row.original),
		     },
		     null,
		     2
		  )}
	 	</code>
	    </pre>
         </div>
 )
}

export default Table
