
import React from 'react';
import HistoryItem from './HistoryItem';
// Вытаскиваем из объекта props с помощью {transactions}

export default function( {transactions, delTransaction}){
    return(
        <section className="history">
                <h3>Umsätze</h3>
                <ul className="history__list">
                    {transactions.map(item => <HistoryItem 
                                                    key={item.id} 
                                                    transaction={item} 
                                                    delTransaction={delTransaction}
                                                    />)}
                </ul>
        </section>

    )
}

// {transactions.map(item => <HistoryItem key={item.id}
//     transaction={item}/> )}