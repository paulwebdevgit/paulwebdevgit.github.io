
import React from 'react';

const Operation = ({addTransaction, addAmount, addDescription, description, amount}) =>(
    
        <section className="operation">
        <h3>Neue Transaktion</h3>
        <form id="form">
            <label>
                <input 
                    type="text" 
                    className="operation__fields operation__name" 
                    placeholder="Name der Transaktion"
                    onChange = {addDescription}
                    value={description}

                />
            </label>
            <label>
                <input 
                    type="number" 
                    className="operation__fields operation__amount" 
                    placeholder="Geben Sie den Betrag ein"
                    onChange = {addAmount}
                    value={amount}
                    />
            </label>
            <div className="operation__btns">
                <button 
                    onClick={( )=> addTransaction(false)} 
                    type="button" 
                    className="operation__btn operation__btn-subtract"
                    >VERBRAUCH</button>

                <button 
                    onClick={( )=> addTransaction(true)} 
                type="button" 
                className="operation__btn operation__btn-add"
                >EINKOMMEN</button>
            </div>

        </form>
    </section>
    );


export default Operation;