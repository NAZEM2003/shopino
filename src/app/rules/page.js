import Footer from '@/modules/footer/Footer';
import Navbar from '@/modules/navbar/Navbar';

import React from 'react';

export const metadata = {
    title: "Shopino | Rules",
};

const Rules = () => {
    return (
        <div>
            <Navbar />
            <main className='mt-20 text-zinc-700 p-3 sm:p-5 md:p-10'>
                <h1 className='text-3xl font-semibold text-zinc-800'>Terms and Rules</h1>
                <h3 className='text-lg text-zinc-800 text-justify my-10'>
                    Dear user, please carefully consider the following items for optimal use of SHOPINO services.
                </h3>

                <h2 className='text-zinc-800 text-2xl mb-4'>General Rules</h2>
                <p className='text-lg text-justify mb-12 leading-9'>
                    Note that all principles and procedures of SHOPINO are in accordance with the law of electronic commerce and the law of protection of consumer rights, and subsequently the user is also obliged to comply with the laws related to the user.
                    If there are future changes to the rules, procedures and services of SHOPINO, they will be published and updated on this page and you agree that your continued use of the site means acceptance of any changes.
                </p>

                <h2 className='text-zinc-800 text-2xl mb-4'>Definition of customer or user</h2>
                <p className='text-lg text-justify mb-12 leading-9'>
                    A customer or user is a person who registers an order or uses any SHOPINO services with his user information entered in the registration form.
                    Also, since SHOPINO is an online retail website, according to the e-commerce law, a customer or consumer is any person who purchases goods or services for purposes other than business or professional occupation.
                </p>

                <h2 className='text-zinc-800 text-2xl mb-4'>Privacy policies</h2>
                <p className='text-lg text-justify mb-12 leading-9'>
                    SHOPINO respects and protects the private information of people who use the site's services.

                    SHOPINO undertakes to defend your privacy as much as possible and in this regard, to develop the technology needed to make your use of the site more secure and safe. In fact, by using the SHOPINO site, you show your satisfaction with this policy
                    .
                    All content available through any of SHOPINO's services, such as text, graphics, logos, button icons, images, videos, downloadable and copyable items, data and all content produced by SHOPINO are considered part of SHOPINO's property. and the right to use and publish all existing and available content is the exclusive property of SHOPINO, and any use without obtaining written permission will result in legal prosecution for
                    . In addition, scripts, and service names that can be provided through any of the services created by SHOPINO and registered trademarks are also owned by SHOPINO and any use for commercial purposes is prosecuted.
                    Users are allowed to exploit and use the list of products, technical specifications, prices and any use of derivatives of the website of coffee or any of the services or content, download or copy information for commercial purposes, any use of They are not data mining, robots, or similar methods such as data collection and mining tools, and all such rights are expressly reserved by SHOPINO.
                    In case of using any of SHOPINO's services, users are responsible for maintaining the confidentiality of their account and password, and all activities carried out under the user account or password are the responsibility of the users.
                    SHOPINO sells products suitable for use by people under the age of 18, and if the users are younger than the mentioned age, they should purchase and pay with the notification of their parents or legal guardians.
                </p>
            </main>
            <Footer />
        </div>
    );
}

export default Rules;
