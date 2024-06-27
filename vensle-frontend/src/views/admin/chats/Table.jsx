import React from "react";
import {
	useTable,
	useRowSelect,
	usePagination,
	useSortBy,
	useFilters,
	useGlobalFilter
} from "react-table";

const Table = ({ columns, data, handleGetUserMessage, user, loading }) => {

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
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
		<>
			<input
				type="text"
				className="px-3 ml-1 w-[97%] rounded-md py-2 mb-6"
				value={globalFilter}
				onChange={(e) => setGlobalFilter(e.target.value)}
				placeholder="Search..."
			/>

			<table
				className="w-full rounded-md overflow-hidden"
				{...getTableProps()}
			>
				<tbody {...getTableBodyProps()}>
					{loading && <tr className="pl-2">Loading...</tr>}
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr
								className="cursor-pointer hover:bg-gray-200"
								{...row.getRowProps()}
							>
								{row.cells.map((cell) => {
									const userId = user.id == cell.row.original.last_message.sender.id
										? cell.row.original.last_message.receiver.id
										: row.original.last_message.sender.id
									const recipient = user.id == cell.row.original.last_message.sender.id
										? 'receiver'
										: 'sender'
									return (
										<td onClick={() => handleGetUserMessage(userId, recipient)} className="py-2" {...cell.getCellProps()}>
											{cell.render('Cell')}
										</td>
									);
								})}
							</tr>
						);
					})}
					{/*<tr><td>Loading...</td></tr>*/}
				</tbody>
			</table>
		</>
	)
}

export default Table
