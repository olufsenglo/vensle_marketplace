import React, { useState } from "react";
import { useTable, useRowSelect, usePagination, useSortBy, useFilters, useGlobalFilter } from "react-table";

const Table = ({ columns, data, loading, handleProductQuickView }) => {

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
		{
			columns, data, initialState: {
				globalFilter: ""
			}
		},
		useFilters, //For column-specific filter
		useGlobalFilter, //For global filter
		useSortBy,
		usePagination,
		useRowSelect,
	)

	const { globalFilter, pageIndex } = state;

	return (
		<div>
			<input
				type="text"
				className="px-3 w-[30%] bg-[#ebebfb] absolute top-[25px] border border-gray-600 right-0 rounded-md py-2 pl-6 pr-2 mb-6"
				value={globalFilter}
				onChange={(e) => setGlobalFilter(e.target.value)}
				placeholder="Search"
			/>

			<table
				cellpadding="10"
				className="w-full rounded-md overflow-hidden"
				{...getTableProps()}
			>
				{loading &&
					<div className="absolute bg-white/50 top-0 flex inset-0 items-center justify-center z-[1] w-full">
						Loading
					</div>
				}
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr
							className="bg-white border-b border-b-gray-200"
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
											: ''}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className="relative" {...getTableBodyProps()}>
					{/*improve condition*/}
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
											className="py-2 cursor-pointer text-[14px]" {...cell.getCellProps()}
											onClick={(e) => handleProductQuickView(e, cell.row.original)}

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
			{page[0]?.original?.id && <div className="text-center mt-8">
				<span className="mr-6">
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
				<span className="ml-5">
					Go to page: {' '}
					<input
						type='number'
						className="w-10 ml-3 py-1 px-2 border-gray-300 rounded-sm"
						defaultValue={pageIndex + 1}
						onChange={e => {
							const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
							gotoPage(pageNumber)
						}}
					/>
				</span>
			</div>}
		</div>
	)
}

export default Table
