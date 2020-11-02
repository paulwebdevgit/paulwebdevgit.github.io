import React, { Component } from 'react';
import Total from './components/total/Total';
import History from './components/history/History';
import Operation from './components/operation/Operation';


class App extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         transaction: [],
    //     }
    //     this.addAmount = this.addAmount.bind(this) Привязываем наш this от state 
    // }

   state = {
            // transactions: [],
            transactions: JSON.parse(localStorage.getItem('calcMoney2')) || [],
            description: '',
            amount:'',
            resultIncome: 0,
            resultExpenses: 0,
            totalBalance: 0,
        }
    
    componentWillMount(){
        this.getTotalBalance();
    }
    componentDidUpdate(){
        
        this.addStorage();
    }

    // МЕТОДЫ  addTransaction, ... 
    addTransaction = add => {
        const transactions = [...this.state.transactions];

        const transaction = {
            //cmr colculator money react
            id: `cmr${(+new Date()).toString(16)}`,
            description: this.state.description,
            amount: parseFloat(this.state.amount),
            add
        }
        transactions.push(transaction);
        

        this.setState({
            transactions,
            description: '',
            amount: '',
            
        }, () => {
            this.getTotalBalance();
            
        });
    }

    addAmount = e => {
        
        // this.state.amount = e.target.value; не работает так как реакт не видит, не перерендеревает страничку 
        this.setState({amount: e.target.value});
        
    }

    addDescription = e => {
        
        // this.state.amount = e.target.value; не работает так как реакт не видит, не перерендеревает страничку 
        this.setState({description: e.target.value});
       
    }
    getIncome = () => this.state.transactions
            // .filter((item) => item.add)
            .reduce((acc, item) => item.add ? item.amount + acc : acc, 0)
    


    getExpenses = () => this.state.transactions
            // .filter((item) => !item.add)
            .reduce((acc, item) => !item.add ? item.amount + acc : acc, 0)
    
    getTotalBalance = () => {
        const resultIncome = this.getIncome();
        const resultExpenses = this.getExpenses();
        const totalBalance = resultIncome - resultExpenses;
        console.log(resultIncome)
        console.log(resultExpenses)
        console.log(totalBalance)

        this.setState({
            resultIncome,
            resultExpenses,
            totalBalance,
        })
    }

    addStorage(){
        localStorage.setItem('calcMoney2', JSON.stringify(this.state.transactions))
    }

    delTransaction = (key) => {
        const transactions = this.state.transactions.filter(item => item.id !== key)
        this.setState({transactions}, this.getTotalBalance)
    }

    render(){
        // console.log(this.state);
        return ( 
            <>
                <header>
                <h1>Geldbeutel</h1>
                <h2>Kostenrechner</h2>
                </header>

                <main>
                    <div className="container">
                    <Total 
                        resultExpenses={this.state.resultExpenses}
                        resultIncome={this.state.resultIncome}
                        totalBalance={this.state.totalBalance}/>
                    <History 
                        transactions={this.state.transactions}
                        delTransaction={this.delTransaction}
                    />
                    <Operation 
                        addTransaction={this.addTransaction}  
                        addAmount={this.addAmount}
                        addDescription={this.addDescription} 
                        description={this.state.description}
                        amount={this.state.amount}
                    />
                    </div>
                </main>
            </>
        );
    }
}

export default App;