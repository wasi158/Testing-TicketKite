import { Show } from '@/type/woocommerce/Shows';

// Configuration constants for WooCommerce API

interface FetchOptions {
	status?: string;
	perPage?: number;
}

export async function fetchWooCommerceData<T>(
	route: 'products' | 'all-shows' | 'all-hotels' | 'all-tours',
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_options: FetchOptions = {}
): Promise<T[]> {
	try {
		// Construct URL with query parameters

		// const url = `${wooCommerceConfig.baseURL}/${route}?${params.toString()}`;
		const url = `https://ticketkite.com/wp-json/wc/v3/products?consumer_key=ck_798f9d97a8356355afd3d0708b16342949d241d3&consumer_secret=cs_d358bad4d1718a40d8b5c940b3513b8929cdad33`;

		// Fetch with error handling
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		// Handle errors
		if (!response.ok) {
			const errorBody = await response.text();
			throw new Error(
				`HTTP error! status: ${response.status}, message: ${errorBody}`
			);
		}

		const data = await response.json();
		return data;
	} catch (error: unknown) {
		console.error(`Error fetching data from route ${route}:`, error);

		if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw new Error('An unknown error occurred.');
	}
}

// Specific function for fetching shows
export async function getShows(
	route: 'products' | 'all-shows' | 'all-hotels' | 'all-tours'
): Promise<Show[]> {
	try {
		return await fetchWooCommerceData<Show>(route);
	} catch (error) {
		console.error('Error fetching shows:', error);
		throw error; // Rethrow or handle as needed
	}
}
