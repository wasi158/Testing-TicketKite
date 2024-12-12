import React from 'react';
import Image from 'next/image';
import { Show } from '@/type/woocommerce/Shows';

interface CardProps {
	image: string;
	title: string;
	description: string;
	price: string;
}

const Card: React.FC<CardProps> = ({ image, title, description, price }) => (
	<div className='bg-black rounded-2xl text-white overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer h-96'>
		<div className='relative h-48'>
			<Image
				src={image}
				alt={title}
				width={400}
				height={300}
				className='w-full h-full object-cover'
			/>
		</div>
		<div className='p-4'>
			<h3 className='text-xl font-bold mb-2'>{title}</h3>
			<div className='flex justify-between items-start h-28'>
				<p
					className='text-sm text-gray-400 line-clamp-3 flex-1 mr-2'
					dangerouslySetInnerHTML={{ __html: description }}
				></p>
				<div className='text-right'>
					<span className='text-sm'>From</span>
					<div className='text-lg font-semibold'>${price}</div>
				</div>
			</div>
		</div>
	</div>
);

interface Props {
	shows: Show[];
}

const FeaturedShows: React.FC<Props> = ({ shows }: Props) => {
	return (
		<div className='container mx-auto px-4 py-8'>
			<h2 className='text-5xl font-bold text-center mb-16'>Featured Shows</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{shows?.map((show, index) => (
					<Card
						key={index}
						image={show?.images[0]?.src || '/placeholder.jpg'}
						title={show?.images[0]?.name || 'Show Title'}
						description={show.description}
						price={show.price.toString()}
					/>
				))}
			</div>
		</div>
	);
};

export default FeaturedShows;
