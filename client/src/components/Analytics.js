import React from 'react'
import {Progress} from 'antd'
const Analytics = ({allTransaction}) => {
    const categories=['salary','tip','project','food','movie','tax','bills','fee','medical']
    // total
    const totalTransaction=allTransaction.length
    const totalInocmeTransaction=allTransaction.filter(transaction=>transaction.type==='income')
    const totalExpenseTransaction=allTransaction.filter(transaction=>transaction.type==='expense')
      const totalIncomePercentage=(totalInocmeTransaction.length/totalTransaction)*100
      const totalExpensePercentage=(totalExpenseTransaction.length/totalTransaction)*100
      // turnover
      const totalTurnover=allTransaction.reduce((acc,transaction)=>acc+transaction.amount,0);
      const totalIncomeTurnover=allTransaction.filter(transaction=>transaction.type==='income'
      ).reduce((acc,transaction)=> acc+transaction.amount,0)
      const totalExpenseTurnover=allTransaction.filter(transaction=>transaction.type==='expense'
      ).reduce((acc,transaction)=> acc+transaction.amount,0)
      const totalTurnoverIncomepercent=(totalIncomeTurnover/totalTurnover)*100
      const totalTurnoverExpensepercent=(totalExpenseTurnover/totalTurnover)*100
  return (
   <>
   <div className='row m-3'> 
    <div className='col-md-4'>
       <div className='card'>
                <div className='.card-header'>
                    Total Transactions:{totalTransaction}
                </div>
                <div className='card-body'>
                    <h5 className='text-success'> Income:{totalInocmeTransaction.length}</h5>
                    <h5 className='text-danger'>Expense: {totalExpenseTransaction.length} </h5>
                    <div>
                    <Progress type='circle' strokeColor={'green'} className='mx-2' 
                    percent={totalIncomePercentage.toFixed(0)}
                    />
                      <Progress type='circle' strokeColor={'red'} className='mx-2' 
                    percent={totalExpensePercentage.toFixed(0)}
                    />
                    </div>
                </div>
               
       </div>
    </div>
    <div className='col-md-4'>
       <div className='card'>
                <div className='.card-header'>
                    Total TurnOver:{totalTurnover}
                </div>
                <div className='card-body'>
                    <h5 className='text-success'> Income:{totalIncomeTurnover}</h5>
                    <h5 className='text-danger'>Expense: {totalExpenseTurnover} </h5>
                    <div>
                    <Progress type='circle' strokeColor={'green'} className='mx-2' 
                    percent={totalTurnoverIncomepercent.toFixed(0)}
                    />
                      <Progress type='circle' strokeColor={'red'} className='mx-2' 
                    percent={totalTurnoverExpensepercent.toFixed(0)}
                    />
                    </div>
                </div>
               
       </div>
    </div>
   </div>
   <div className='row mt-3'>
    <div className='col-md-5'>
        <h4>
            Categorywise Income
        </h4>
        {
            categories.map(category=>{
                const amount=allTransaction.filter(transaction=>transaction.type==='income'&& transaction.category===category).reduce((acc,transaction)=>acc+transaction.amount,0)
                return(
                    amount>0&& (
                    <div className='card'key={category}>
                        <div className='card-body'>
                            <h5>{category}</h5>
                       <Progress percent={((amount/totalIncomeTurnover)*100).toFixed(0)} />
                        </div>
                    </div>
                )
            )
            })
        }
    </div>
    <div className='col-md-5'>
        <h4>
            Categorywise Expense
        </h4>
        {
            categories.map(category=>{
                const amount=allTransaction.filter(transaction=>transaction.type==='expense'&& transaction.category===category).reduce((acc,transaction)=>acc+transaction.amount,0)
                return(
                    amount>0&& (
                    <div className='card'key={category}>
                        <div className='card-body'>
                            <h5>{category}</h5>
                       <Progress percent={((amount/totalIncomeTurnover)*100).toFixed(0)} />
                        </div>
                    </div>
                )
            )
            })
        }
    </div>
   </div>
   </>
  )
}

export default Analytics
