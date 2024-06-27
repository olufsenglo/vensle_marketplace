import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

import Table from './Table'
import PreviewPopup from "components/front/previewPopup/PreviewPopup";

const columnsData = [
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
]

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
	const navigate = useNavigate();
	const columns = useMemo(() => columnsData, []);
	const isAuthenticated = useSelector((state) => state?.auth?.isLoggedIn);
	const accessToken = useSelector((state) => state?.auth?.user?.token);

	const [loading, setLoading] = useState(false);
	const [loadingCatogeries, setLoadingCatogeries] = useState(false);
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [open, setOpen] = useState(false)
	const [selectedProduct, setSelectedProduct] = useState(null)

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

	useEffect(() => {
		fetchProducts();
		handleFetchCategory();
	}, []);

	return (
		<div className="bg-white">

			{selectedProduct &&
				<PreviewPopup open={open} setOpen={setOpen} from="userProducts" selectedProduct={selectedProduct}>
					<div className="mt-4">
						<Link
							to={`/admin/edit-product?id=${selectedProduct.id}`}
							className="block w-full rounded-md bg-primaryColor px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColor"
						>
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
							<p className="mr-2 text-nowrap" style={{textWrap: 'nowrap'}}>Sort by:</p>
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
