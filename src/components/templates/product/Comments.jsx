import React from 'react';
import CommentForm from './CommentForm';
import CommetnBox from '@/components/modules/comment/CommentBox';
import { getProductComments } from '@/utils/actions';

const Comments = async ({ product }) => {
    const comments = await getProductComments(product._id)
    return (
        <section>
            <h2 className='sm:text-2xl text-xl text-zinc-800 font-semibold p-2'>Comments</h2>
            <div className='mt-16 flex flex-col justify-center items-center lg:flex-row lg:items-start lg:justify-around lg:p-5'>
                <CommentForm productID={JSON.parse(JSON.stringify(product._id))} />
                <div className='mt-16 lg:mt-0 p-2 lg:p-0 flex flex-col items-center justify-center w-full'>
                    <h2 className='text-lg font-semibold text-zinc-800'>{comments.length} comments for {product.name}</h2>

                    {
                        comments.length ?
                            comments.map((comment) => <CommetnBox key={comment._id} comment={JSON.parse(JSON.stringify(comment))} />)
                            : <h2 className='mt-36 text-zinc-800 font-semibold text-xl'>There are no Comments for this Product</h2>
                    }
                </div>
            </div>
        </section>
    );
}

export default Comments;
