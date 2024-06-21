import React, { useState } from "react";
import { useTable, useRowSelect, usePagination, useSortBy, useFilters, useGlobalFilter } from "react-table";

import UserDetail from "components/previewPopup/UserDetail";
import { Checkbox } from './Checkbox';

const Table = ({ columns, data }) => {
	const [open, setOpen] = useState(false)
	const [selectedUser, setSelectedUser] = useState(null)

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

	const handleUserQuickView = (user) => {
		setSelectedUser(user)
		setOpen(true);
	}

	return (
		<div>

			{selectedUser && <UserDetail open={open} setOpen={setOpen} selectedUser={selectedUser} />}

			<input
				type="text"
				className="px-3 w-[30%] bg-[#ebebfb] absolute top-[9px] border border-gray-600 right-0 rounded-md py-2 pl-6 pr-2 mb-6"
				value={globalFilter}
				onChange={(e) => setGlobalFilter(e.target.value)}
				placeholder="Search"
			/>

			<table
				className="w-full rounded-md overflow-hidden"
				{...getTableProps()}
			>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr
							className="p-2 text-sm text-[#4e5b92] bg-[#dde1ff]"
							{...headerGroup.getHeaderGroupProps()}
						>
							{headerGroup.headers.map((column) => (
								<th className="py-4 text-[15px] text-left" {...column.getHeaderProps(column.getSortByToggleProps())}>
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
					{page[0]?.original?.id ? page.map((row) => {
						prepareRow(row);
						return (
							<tr
								className="even:bg-[#fbf8ff] odd:bg-white"
								{...row.getRowProps()}
							>
								{row.cells.map((cell) => {
									return (
										<td
											onClick={() => handleUserQuickView(row.original)}
											className="py-3 cursor-pointer" {...cell.getCellProps()}
										>
											{cell.render('Cell')}
										</td>
									);
								})}
							</tr>
						);
					}) :
						<div className="top-0 w-full">
							Loading
						</div>}
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
