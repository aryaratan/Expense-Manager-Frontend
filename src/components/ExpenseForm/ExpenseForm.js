import React, { useEffect, useRef, useState } from "react";
import styles from "./ExpenseForm.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ExpenseForm = ({editDec, editAmt, id}) => {
  // console.log(editDec, editAmt);
  const [description , setDescription] = useState('');
  const [amount , setAmount] = useState('');
  
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    console.log(editDec, editAmt, 'form');
    if(editDec && editAmt){
      
      setDescription(editDec);
      setAmount(editAmt);
      // apiCall();
      editDec ='';
      editAmt = '';
      setEdit(true);
    }
  },[editDec, editAmt])

  const apiCall = async () => {
    if(edit){
      const response = await fetch(`http://localhost:8000/update-expense/?id=${id}`, {
        method:'PUT',
        body:JSON.stringify({description, amount}),
        headers:{
          'Content-type':'application/json'
        }   
      });
    }
    const response = await fetch("http://localhost:8000/add-expense", {
      method:'POST',
      body:JSON.stringify({description, amount}),
      headers:{
        'Content-type':'application/json'
      }   
    });
  }


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    apiCall();
    setDescription('');
    setAmount('');
    toast.success('Entry added succesfully');
  }


  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h3>
        {/* {expenseToUpdate ? "Edit " : "Add new "} */}
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
        {/* Transaction */}
      </button>
    </form>
  );
};

export default ExpenseForm;
