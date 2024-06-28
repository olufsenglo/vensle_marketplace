import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

import Table from './Table'
import PreviewPopup from "components/front/previewPopup/PreviewPopup";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import CardMenu from "components/card/CardMenu";
import CustomDialog from "./CustomDialog";

const columnsData = (setDeleteOpen, setSelectedProductId) => [
	{
		Header: "img",
		accessor: "order_number",
		Cell: (props) => {
			return <ImageRow props={props} />
		}
	},
	{
		Header: "Product Name",
		accessor: "name"
	},
	{
		Header: "Type",
		accessor: "type",
		Cell: (props) => {
			return <TypeRow props={props} />
		}
	},
	{
		Header: "Category",
		accessor: "category.name"
	},
	{
		Header: "Price",
		accessor: "price"
	},
	{
		Header: "Upload Date",
		accessor: "created_at"
	},
	{
		Header: "Status",
		accessor: "status",
		Cell: (props) => {
			return <StatusRow props={props} />
		}
	},
	{
		Header: " . ",
		Cell: (props) => {
			return <ActionRow props={props} setSelectedProductId={setSelectedProductId} setDeleteOpen={setDeleteOpen} />
		}
	},
]

const handleActionClick = (event) => {
	event.stopPropagation();
	console.log('Child clicked');
};

const ActionRow = ({ props, setSelectedProductId, setDeleteOpen }) => {
	const handleDelete = (id) => {
		setSelectedProductId(id)
		setDeleteOpen(true)
	}

	return (
		<span onClick={handleActionClick} className="capitalize">
			<CardMenu>
				<Link to={`/admin/edit-product?id=${props.row.original.id}`} className="block hover:text-black mt-2 flex cursor-Linkointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
					<span>
						<MdModeEditOutline />
					</span>
					Edit
				</Link>
				<p
					onClick={() => handleDelete(props.row.original.id)}
					className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium"
				>
					<MdDelete />
					Delete
				</p>
			</CardMenu>
		</span>
	)
}

const getDisplayImage = (image) => {
	const name = image ? image.name : "";
	return `${baseURL}/uploads/${name}`;
};

const ImageRow = ({ props }) => {
	return (
		<div>
			<img
				className="w-16 h-12 object-contain"
				src={getDisplayImage(props.row.original.display_image)} alt="product thumbnail"
			/>
		</div>
	)
}

const TypeRow = ({ props }) => {
	return (
		<span className="capitalize">{props.row.original.type}</span>
	)
}

const StatusRow = ({ props }) => {
	return (
		<span className={`text-xs py-1 px-4 rounded-sm 
			${props.row.original.status === 'Active' ? 'bg-green-200/70 text-green-900' :
				(props.row.original.status === 'Pending' ? 'bg-orange-300 text-orange-900' : 'bg-red-300 text-red-900')
			}`
		}>
			{props.row.original.status}
		</span>
	)
}


const baseURL = "https://nominet.vensle.com/backend";

const UserProducts = () => {
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false)
	const [selectedProductId, setSelectedProductId] = useState(null)
	const [selectedProduct, setSelectedProduct] = useState(null)
	const navigate = useNavigate();
	const columns = useMemo(() => columnsData(setDeleteOpen, setSelectedProductId), []);
	const isAuthenticated = useSelector((state) => state?.auth?.isLoggedIn);
	const accessToken = useSelector((state) => state?.auth?.user?.token);

	const [loading, setLoading] = useState(false);
	const [loadingCatogeries, setLoadingCatogeries] = useState(false);
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [open, setOpen] = useState(false)

	const [selectedTypeOption, setSelectedTypeOption] = useState('');
	const [selectedCategoryOption, setSelectedCategoryOption] = useState('');
	const [selectedStatusOption, setSelectedStatusOption] = useState('');



	const handleProductQuickView = (e, product) => {
		e.preventDefault();
		setSelectedProduct(product)
		setOpen(true);
	}

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/");
		}
	}, [isAuthenticated, navigate]);

	function formatPrice(price) {
		return Number(parseFloat(price).toFixed(2)).toLocaleString('en', {
			minimumFractionDigits: 2
		});
	}

	//TODO: very similar to handleTypeChange place in function
	const handleTypeChange = (e) => {
		const type = e.target.value
		setSelectedTypeOption(type);
		if (type === "all_products") {
			fetchProducts();
		} else {
			handleFetchProductType(type)
		}
	};

	const handleCategoryChange = (e) => {
		const type = e.target.value
		setSelectedCategoryOption(type);
		if (type === "all_products") {
			fetchProducts();
		} else {
			handleFetchProductByCategory(type)
		}
	};

	const handleStatusChange = (e) => {
		const status = e.target.value
		setSelectedStatusOption(status);
		if (status === "all_products") {
			fetchProducts();
		} else {
			handleFetchProductByStatus(status)
		}
	};


	//TODO: very similar to handleFetchCategory place in function
	const handleFetchProductType = async (productType) => {
		try {
			setLoading(true)
			const response = await axios.get(`${baseURL}/api/v1/products/filter?type=${productType}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const extractedData = response.data.data.map(
				({
					price,
					created_at,
					...rest
				}) => ({
					price: formatPrice(price),
					created_at: moment(created_at).fromNow(),
					...rest,
				})
			);
			setProducts(extractedData);
			setLoading(false)
		} catch (error) {
			console.error("Error fetching users:", error);
			setLoading(false)
		}
	}

	const handleFetchProductByCategory = async (productType) => {
		try {
			setLoading(true)
			const response = await axios.get(`${baseURL}/api/v1/products/filter?category_id=${productType}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const extractedData = response.data.data.map(
				({
					price,
					created_at,
					...rest
				}) => ({
					price: formatPrice(price),
					created_at: moment(created_at).fromNow(),
					...rest,
				})
			);
			setProducts(extractedData);
			setLoading(false)
		} catch (error) {
			console.error("Error fetching users:", error);
			setLoading(false)
		}
	}

	const handleFetchProductByStatus = async (productType) => {
		try {
			setLoading(true)
			const response = await axios.get(`${baseURL}/api/v1/products/filter?status=${productType}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const extractedData = response.data.data.map(
				({
					price,
					created_at,
					...rest
				}) => ({
					price: formatPrice(price),
					created_at: moment(created_at).fromNow(),
					...rest,
				})
			);
			setProducts(extractedData);
			setLoading(false)
		} catch (error) {
			console.error("Error fetching users:", error);
			setLoading(false)
		}
	}


	const handleFetchCategory = async (productType) => {
		try {
			setLoadingCatogeries(true)
			const response = await axios.get(`${baseURL}/api/v1/categories`);
			setCategories(response.data.categories);
			setLoadingCatogeries(false)
		} catch (error) {
			console.error("Error fetching users:", error);
			setLoadingCatogeries(false)
		}
	}

	const fetchProducts = async () => {
		setLoading(true)
		try {
			const response = await axios.get(`${baseURL}/api/v1/products`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			//TODO: remove backend pagination
			const extractedData = response.data.data.map(
				({
					created_at,
					...rest
				}) => ({
					created_at: moment(created_at).fromNow(),
					...rest,
				})
			);
			setProducts(extractedData);
			setLoading(false)
		} catch (error) {
			console.error("Error fetching Products:", error);
			setLoading(false)
		}
	};

	const handlePopupDelete = (e) => {
		e.preventDefault()
		setSelectedProductId(selectedProduct.id)
		setDeleteOpen(true)
	}	

	const deleteProduct = async (id) => {
		console.log('id', id)
		setDeleteLoading(true)
		try {
			const response = await axios.delete(`${baseURL}/api/v1/products/${id}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log('starrrrrt', response)
			setDeleteLoading(false)
			setDeleteOpen(false)
		} catch (error) {
			console.error("Error fetching users:", error);
			setDeleteLoading(false)
		}
	};

	useEffect(() => {
		fetchProducts();
		handleFetchCategory();
	}, []);

	return (
		<div className="bg-white">

			{deleteOpen && <CustomDialog
				deleteProduct={deleteProduct}
				deleteOpen={deleteOpen}
				setDeleteOpen={setDeleteOpen}
				deleteLoading={deleteLoading}
				selectedProductId={selectedProductId}
			/>}

			{selectedProduct &&
				<PreviewPopup open={open} setOpen={setOpen} from="userProducts" selectedProduct={selectedProduct}>
					<div className="mt-4 flex items-end flex-1 gap-4">
						<button
							onClick={handlePopupDelete}
							className="block flex justify-center items-center w-full rounded-md bg-white px-3 py-3 text-center text-sm font-semibold text-primaryColor border border-primaryColor shadow-sm hover:bg-primaryColor hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColor"
						>
							<MdDelete className="mr-1 h-4 w-4" />
							DELETE PRODUCT
						</button>
						<Link
							to={`/admin/edit-product?id=${selectedProduct.id}`}
							className="block flex justify-center items-center w-full rounded-md bg-primaryColor px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColor"
						>
							<MdModeEditOutline className="mr-1" />
							EDIT
						</Link>
					</div>
				</PreviewPopup>
			}

			<div className="relative h-full min-h-[25rem]">
				<div className="w-full pb-3 pt-1 mb-8 border-b border-gray-200 dark:border-gray-700">
					<div className="flex items-center gap-5 pt-6 w-[65%]">
						<div className="w-full">
							<select
								value={selectedTypeOption}
								onChange={handleTypeChange}
								className="w-full border border-gray-400 rounded-md py-2 px-4"
							>
								<option value="all_products">All Uploads</option>
								<option value="product">Pickup</option>
								<option value="request">Requests</option>
								<option value="grocery">Grocery</option>
							</select>
						</div>
						<div className="w-full flex items-center">
							<p className="mr-2 text-nowrap" style={{ textWrap: 'nowrap' }}>Sort by:</p>
							<select
								value={selectedCategoryOption}
								onChange={handleCategoryChange}
								className="border border-gray-400 rounded-md py-2 px-4"
							>
								<option value="all_products">Category</option>
								{console.log('cattt', categories)}
								{categories.length > 0 ? categories.map((category) =>
									<option key={category.id} value={category.id}>{category.name}</option>
								) : <p>Loading...</p>}
							</select>
						</div>
						<div className="w-full">
							<select
								value={selectedStatusOption}
								onChange={handleStatusChange}
								className="w-full border border-gray-400 rounded-md py-2 px-4"
							>
								<option value="all_products">Status</option>
								<option value="Pending">Pending</option>
								<option value="Active">Active</option>
								<option value="Inactive">Inactive</option>
								<option value="Paused">Paused</option>
								<option value="Rejected">Rejected</option>
							</select>
						</div>
					</div>
				</div>
				<Table handleProductQuickView={handleProductQuickView} columns={columns} data={products} loading={loading} />
			</div>
		</div>
	);
};

export default UserProducts;
