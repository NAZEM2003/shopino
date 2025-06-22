import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CategoryCard = ({ data }) => {

    return (
        <Link href={`/categories/${data._id}`} className='w-40 h-32 mx-auto rounded-lg shadow-md shadow-zinc-500 p-2'>
            <Image className='mx-auto' src={decodeURIComponent(data.img)} width={75} height={75} alt='category' />
            <h2 className='text-center text-lg font-semibold mt-3'>{
                data.title.length > 12 ? `${data.title.substring(0, 12)} ...` : data.title
            }</h2>
        </Link>
    );
}

export default CategoryCard;
