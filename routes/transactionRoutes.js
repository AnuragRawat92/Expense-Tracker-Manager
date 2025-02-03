const express=require("express")
const router=express.Router()
const {addTransaction,deleteTransaction,getAllTransaction,editTransaction}=require('../controllers/transactionCtrl')
//add 
router.post('/add-transaction', addTransaction)
//get
router.post('/get-transaction',getAllTransaction)
router.post('/edit-transaction',editTransaction)
router.post('/delete-transaction',deleteTransaction)
module.exports=router