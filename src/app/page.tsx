import React from 'react';

// import { getShows } from '@/lib/woocommerce/shows';
// import FeaturedShows from './homepage/_components/featuredshows';

export const revalidate = 300;

const page = async () => {
	// const shows = await getShows('products');
	// console.log({ shows });
	return (
		<div className='w-full bg-[#141414] text-white'>
			<div
				className='container mx-auto px-4 py-16 text-center bg-cover bg-center relative'
				style={{
					backgroundImage: "url('/mnt/data/header-ticket.jpg')",
				}}
			>
				<div className='absolute inset-0 bg-[#141414]/60'></div>
				<h1 className='text-5xl md:tyyext-5xl font-bold text-white mb-6 leading-tight relative z-10'>
					Get Ready add to Elevate Your Entertainment Experience
				</h1>
				<p className='text-lg md:text-xl text-gray-300 mb-10 relative z-10'>
					Your Ticket to Memorable Moments: Where Every Ticket Unlocks
					Adventure, Laughter, and Memories!
				</p>
				<p className='text-lg md:text-xl text-gray-300 mb-10 relative z-10'>
					Your Ticket to Memorable Moments: Where Every Ticket Unlocks
					Adventure, Laughter, and Memories!
				</p>
			</div>
			{/* <Suspense>
				<FeaturedShows shows={shows} />
			</Suspense> */}
		</div>
	);
};

export default page;
