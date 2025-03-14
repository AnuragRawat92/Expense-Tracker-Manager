
const { json } = require('express');
const transactionModel=require('../models/transactionModel')
const moment=require('moment')
const getAllTransaction = async (req, res) => {
    try {
        const {frequency,selectedDate,type}=req.body
        const transactions = await transactionModel.find({
           ...(frequency!=='custom'?{
            date:{
                $gt:moment().subtract(Number(frequency),'d').toDate(),
            },
           }:{
            date:{
                $gte:selectedDate[0],
                $lte:selectedDate[1]
            }
           }),
            userid: req.body.userid ,
            ...(type !== "all" && { type }),
        });

        res.status(200).json(transactions);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
const editTransaction=async(req,res)=>{
try{
await transactionModel.findOneAndUpdate({_id:req.body.transactionID},req.body.payload)
res.status(200).send('Edit Successfully')
}
catch(error){
    console.log(error)
    res.status(500).json(error)
}
}
const deleteTransaction=async(req,res)=>{
try{
await transactionModel.findOneAndDelete({_id:req.body.transactionID})
res.status(200).send('Transaction Deleted')
}
catch(error){
    console.log(error)
    res.status(500).json(error)
}
}
const addTransaction = async (req, res) => {
    try {
        const { userid, amount, type, category, description, date } = req.body;
        
        // Check for missing fields
        if (!userid) return res.status(400).json({ error: "Enter userid" });
        if (!amount) return res.status(400).json({ error: "Enter amount" });
        if (!type) return res.status(400).json({ error: "Enter type" });
        if (!category) return res.status(400).json({ error: "Enter category" });
        if (!description) return res.status(400).json({ error: "Enter description" });
        if (!date) return res.status(400).json({ error: "Enter date" });
        
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();
        
        res.status(201).json({ message: "Transaction created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
module.exports={getAllTransaction,addTransaction,editTransaction,deleteTransaction}
