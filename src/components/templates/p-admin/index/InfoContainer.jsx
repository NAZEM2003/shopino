import InfoBox from '@/components/modules/box/InfoBox';
import React from 'react';
import styles from "@/styles/p-admin/index/style.module.css";
import { getAllOrders, getAllProducts, getAllTickets, getAllUsers } from '@/utils/actions';

const InfoContainer =async () => {
    const tickets = await getAllTickets();
    const products = await getAllProducts();
    const users = await getAllUsers();
    const orders = await getAllOrders();
    return (
        <section className={`${styles.infoBox_grid_container} w-full`}>
            <InfoBox title="Received Tickets" value={tickets.length} />
            <InfoBox title="Total Products" value={products.length} />
            <InfoBox title="Total Orders" value={orders.length} />
            <InfoBox title="Total Users" value={users.length} />
        </section>
    );
}

export default InfoContainer;
