import discount from "@/images/promote/discount.png";
import fastDelivery from "@/images/promote/fast-delivery.png";
import price from "@/images/promote/price.png";
import quality from "@/images/promote/quality.png";
import Image from 'next/image';
const Promote = () => {
    return (
        <section className='flex flex-col lg:flex-row items-center justify-between mt-10 p-3'>
            <div className=' w-full sm:w-9/12 lg:w-7/12 flex flex-col items-center lg:items-start text-center lg:text-left'>
                <h2 className='sm:text-2xl text-xl text-zinc-800 font-semibold p-2'>Why Shopino?</h2>
                <p className='text-zinc-800 p-3 w-full lg:w-8/12 sm:min-w-80 text-lg text-justify'>
                    You can get everything you need to cook a meal Here!
                    Shopino is a online Grocery store where you can get any foodStuffs you want with the best quality.
                </p>
                <p className='text-zinc-800 p-3 w-full lg:w-8/12 sm:min-w-80 text-lg text-justify'>
                    with more than 6 years of experience and more than 300,000 customers , Shopino has proven itself as the best!
                </p>
                <p className='text-zinc-800 p-3 w-full lg:w-8/12 sm:min-w-80 text-lg font-semibold text-justify'>
                   Good food is cooked with attention and great food is cooked with love &#128151;
                </p>
            </div>
            <div className='lg:w-5/12 mt-12 lg:mt-0'>
                <ul>
                    <li className='flex items-center my-7 sm:p-2'>
                        <span className='text-xl text-zinc-800 w-60'>- Fast Delivery</span>
                        <Image alt="fastDelivery" className='ml-20 hidden sm:inline-block' src={fastDelivery} width={70}/>
                    </li>
                    <li className='flex items-center my-7 sm:p-2'>
                        <span className='text-xl text-zinc-800 w-60'>- Amazing Discounts</span>
                        <Image alt="discount" className='ml-20 hidden sm:inline-block' src={discount} width={70}/>
                    </li>
                    <li className='flex items-center my-7 sm:p-2'>
                        <span className='text-xl text-zinc-800 w-60'>- the best market price</span>
                        <Image alt="price" className='ml-20 hidden sm:inline-block' src={price} width={70}/>
                    </li>
                    <li className='flex items-center my-7 sm:p-2'>
                        <span className='text-xl text-zinc-800 w-60'>- the best quality Products</span>
                        <Image alt="quality" className='ml-20 hidden sm:inline-block' src={quality} width={70}/>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Promote;
