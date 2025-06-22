"use client"
import React, { useEffect, useState } from 'react';
import styles from "@/styles/p-user/index/style.module.css";
import InfoBox from '@/components/modules/box/InfoBox';
import { getUserComments, getUserOrders, getUserTickets, getUserWishlist } from '@/utils/actions';


const Infos = ({userID}) => {
    const [comments, setComments] = useState(0);
    const [tickets, setTickets] = useState(0);
    const [wishes, setWishes] = useState(0);
    const [orders, setOrders] = useState(0);

    const fetchData = async () => {
        const comments = await getUserComments(userID);
        const tickets = await getUserTickets(userID);
        const wishes = await getUserWishlist(userID);
        const orders = await getUserOrders(userID);
        setOrders(orders.length);
        setComments(comments.length);
        setTickets(tickets.length);
        setWishes(wishes.length);
    }
    useEffect(()=>{
        fetchData();
    },[]);


    return (
        <section className={`${styles.infoBox_grid_container} w-full`}>
            <InfoBox title="Total Comments" value={comments} />
            <InfoBox title="Total Tickets" value={tickets} />
            <InfoBox title="Total Orders" value={orders} />
            <InfoBox title="Total Wishes" value={wishes} />
        </section>
    );
}

export default Infos;
