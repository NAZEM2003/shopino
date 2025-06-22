import TicketDetails from '@/components/templates/p-user/tickets/answer/TicketDetails';
import { getAnswerTickets, getQuestionTicket } from '@/utils/actions';
import React from 'react';

const Answer = async ({ params }) => {
    const ticketID = params.ticketID
    const questionTicket = await getQuestionTicket(ticketID);
    const answerTickets = await getAnswerTickets(questionTicket._id);
    return (
        <main>
            <div className='flex flex-wrap items-center justify-between mt-5 border-b border-b-zinc-400'>
                <h1 className='text-2xl text-zinc-800 font-semibold sm:p-2 '>{questionTicket.title}
                </h1>
                <p className='p-2 mr-4 text-lg text-zinc-800'>Closed</p>

            </div>
            <TicketDetails {...questionTicket} />
            {
                answerTickets.length ? answerTickets.map(answerTicket => <TicketDetails key={answerTicket._id} {...answerTicket} />)
                    : <h1 className='text-center mt-36 text-xl sm:text-3xl font-semibold text-zinc-800'>You have not received a Answer yet.</h1>
            }
        </main>
    );
}

export default Answer;
