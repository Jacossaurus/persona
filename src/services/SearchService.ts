import { SearchImage } from "../types/SearchImage";
import { SearchResponse } from "../types/SearchResponse";

class Search {
	cachedImageUrls: Array<SearchImage> = [];

	async init() {
		console.log("SearchService initiated.");

		const query = "persona 5 joker";

		for (let page = 1; page < 5; page++) {
			console.log(`Getting page ${page} of images for query "${query}."`);

			const response = await this.search(query, page);

			if (response.status === 200) {
				const data = (await response.json()) as SearchResponse;

				for (const image of data.images_results) {
					this.cachedImageUrls.push(image);
				}
			} else {
				console.warn(
					`Failed to run search with query, "${query}," on page ${page}. ${response.statusText}`,
				);
			}
		}

		console.log("SearchService initiation completed.");
	}

	async search(query: string, page: number) {
		return fetch(
			`https://serpapi.com/search.json?q=${encodeURIComponent(
				query,
			)}&engine=google_images&ijn=${page}&api_key=${
				process.env.SERPAPI_API_KEY as string
			}`,
		);
	}
}

export const SearchService = new Search();
