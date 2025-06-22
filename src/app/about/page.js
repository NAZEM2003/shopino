import Footer from '@/modules/footer/Footer';
import Navbar from '@/modules/navbar/Navbar';
import Image from 'next/image';
import React from 'react';
//images
import teamImg from "@/images/about-us/our-team.jpg";
import missionImg from "@/images/about-us/our-mission.jpg";
import story1 from "@/images/about-us/our-story-1.jpg";
import story2 from "@/images/about-us/our-story-2.jpg";

export const metadata = {
    title: "Shopino | About Us",
};

const AboutUs = () => {
    return (
        <div>
            <Navbar />
            <main className='mt-20 min-h-screen px-5 sm:px-12 text-zinc-800 font-medium text-lg'>

                <section className='flex flex-col md:flex-row items-center justify-between mt-32'>
                    <div className='w-full md:w-6/12 flex sm:inline-block flex-col items-center justify-center'>
                        <h1 className='text-4xl font-semibold mb-10'>About Us</h1>
                        <p className='sm:w-6/12 w-full sm:min-w-64 max-w-80 text-justify'>Shopino is a Grocery Store  where you can get the Food and Groceries you need.</p>
                    </div>
                    <div className='w-full md:w-5/12 mt-12 md:mt-0'>
                        <Image className='mx-auto rounded-md' width={400} src={teamImg} alt='shopino team' />
                    </div>
                </section>

                <section className='flex flex-col-reverse md:flex-row items-center justify-between mt-20 md:mt-16'>

                    <div className='md:w-6/12 mt-12 md:mt-0'>
                        <Image className='rounded-md' src={missionImg} width={450} alt="our mission" />
                    </div>

                    <div className='md:w-5/12 md:ml-10 flex flex-col items-center justify-center sm:inline-block'>
                        <h2 className='text-4xl font-semibold mb-10 text-zinc-800'>Our Mission</h2>
                        <p className='text-justify'>Our Goal and Mission is to meet the needs of Customers in the fastest time and with the best Products, therefore, we have always tried to provide the best services and satisfy Customers by bringing together experts and skilled people in every field.</p>
                    </div>

                </section>

                <section className='flex flex-col md:flex-row items-center justify-between my-20 md:my-16'>
                    <div className='w-ful md:w-6/12 h-full flex flex-col items-center justify-center sm:inline-block'>
                        <h2 className='text-4xl font-semibold mb-10 text-zinc-800'>Our Story</h2>
                        <p className='text-justify leading-8'>
                            Shopino started its business in 2017 as an online grocery store. Abolfazl Jan Mohammadloo is the founder of Shopino. <br />
                            Shopino has proven itself as a reputable and well-known store by focusing on user convenience, fast delivery, and quality products.<be />
                            It should be noted that Shopino was initially a fruit store and its initial idea came from this fruit store.<br/> There is an articles section on the shopping site. You can read published articles and increase your general knowledge level and have fun.
                        </p>
                    </div>

                    <div className='w-ful md:w-5/12 mt-20 md:mt-0'>

                        <div className='w-64 sm:w-96 md:w-72 lg:w-80 xl:w-96 h-60 mb-12 relative mx-auto mr-auto'>
                            <Image className='rounded-md' fill src={story1} alt='story 1' />

                        </div>
                        <div className='w-64 sm:w-96 md:w-72 lg:w-80 xl:w-96 h-96  relative mx-auto'>
                            <Image className='rounded-md' fill src={story2} alt='story 2' />
                        </div>

                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default AboutUs;
