import React, { useEffect, useState } from "react";
import styles from "./ExpenseForm.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ExpenseForm = ({editDec, editAmt, id}) => {

  const [description , setDescription] = useState('');
  const [amount , setAmount] = useState('');
  
  const [edit, setEdit] = useState(false);
  useEffect(() => {
 
    if(editDec || editAmt){
      
      setDescription(editDec);
      setAmount(editAmt);
      editDec ='';
      editAmt = '';
      setEdit(true);
    }
  },[editDec, editAmt,id])

  const apiCall = async () => {
    if(edit){
      const response = await fetch(`https://spendlens-backend.onrender.com/update-expense/?id=${id}`, {
        method:'PUT',
        body:JSON.stringify({description, amount}),
        headers:{
          'Content-type':'application/json'
        }   
      });
      toast.success('Entry edited succesfully');
      setEdit(false);
      return;
    }

    const response = await fetch("https://spendlens-backend.onrender.com/add-expense", {
      method:'POST',
      body:JSON.stringify({description, amount}),
      headers:{
        'Content-type':'application/json'
      }   
    });
    toast.success('Entry added succesfully');
  }


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    apiCall();
    setDescription('');
    setAmount('');
    
  }


  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h3>
        {edit ? "Edit " : "Add new "}
      transaction</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        value={description}
        name="expenseTextInput"
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense,positive-income)</div>
      </div>
      <input
        onChange={(e) => setAmount(e.target.value)}
        className={styles.input}
        id="expenseAmount"
        name="expenseAmountInput"
        type="number"
        placeholder="Enter amount..."
        value={amount}
        required
      />
      <button className={styles.submitBtn}>
        {edit ? "Edit " : "Add "} 
      </button>
    </form>
  );
};

export default ExpenseForm;
