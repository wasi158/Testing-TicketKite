import { APIConfig } from '@/config/api-config';
import { Show } from '@/type/woocommerce/Shows';

interface FetchOptions {
	status?: string;
	perPage?: number;
}

export async function fetchWooCommerceData<T>(
	route: 'products' | 'all-shows' | 'all-hotels' | 'all-tours',
	options: FetchOptions = {}
): Promise<T[]> {
	const { status = 'publish', perPage = 20 } = options;

	try {
		const { wooCommerce } = APIConfig;

		// Construct URL with query parameters
		const params = new URLSearchParams({
			consumer_key: wooCommerce.consumer_key,
			consumer_secret: wooCommerce.consumer_secret,
			status,
			per_page: perPage.toString(),
		});

		const url = `${wooCommerce.baseURL}/${route}?${params.toString()}`;

		// Fetch with improved error handling
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		// Enhanced error handling
		if (!response.ok) {
			const errorBody = await response.text();
			throw new Error(
				`HTTP error! status: ${response.status}, message: ${errorBody}`
			);
		}

		// Validate and parse JSON
		const contentType = response.headers.get('content-type');
		if (!contentType || !contentType.includes('application/json')) {
			throw new Error('Response is not JSON');
		}

		const data = await response.json();

		// Additional validation
		if (!Array.isArray(data)) {
			throw new Error('Expected an array of items');
		}

		return data;
	} catch (error: unknown) {
		console.error(`Error fetching data from route ${route}:`, error);

		// Check if error is an instance of Error
		if (error instanceof Error) {
			// Handle specific HTTP error cases (500, 404, etc.)
			if (error.message.includes('500')) {
				throw new Error('Server error. Please try again later.');
			}

			if (error.message.includes('404')) {
				throw new Error('Resource not found.');
			}

			// General fallback for unknown errors
			throw new Error('An unexpected error occurred.');
		}

		// If the error is not an instance of Error, throw a generic error
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
