import React, { useState } from "react";
import styles from "./Transaction.module.css";
import EditImage from "../../images/edit.png";
import DeleteImage from "../../images/trash-bin.png";
import {toast} from 'react-toastify';
const Transaction =  ({index,id, expense, onEdit}) => {
  const [currentHoverIndex, setCurrentHoverIndex] = useState(null);

  const handleDelete = async () => {
    const response = await fetch(`https://spendlens-backend.onrender.com/delete-expense/?id=${id}`,{
      method:'DELETE'
    });
    toast.success('Entry deleted succesfully');
  }
  const handleEdit = async () => {
    fetch(`https://spendlens-backend.onrender.com/edit-expense/?id=${id}`)
      .then(response => response.json())
      .then(apiData => {
        onEdit(apiData.decs, apiData.amt, id);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  return (
    <li
      id={`${id}`}
      className={`${styles.transaction} ${
        expense.amount > 0 ? styles.profit : styles.loss
      }`}
      onMouseOver={() => {
        setCurrentHoverIndex(index);
      }}
      onMouseLeave={() => {
        setCurrentHoverIndex(null);
      }}
    >
      <div>{expense.description}</div>
      <div className={styles.transactionOptions}>
        <div
         className={`${styles.amount} ${
          currentHoverIndex === index && styles.movePrice
        }`}
        >
          {expense.amount}
        </div>
        <div
          className={`${styles.btnContainer} ${
            currentHoverIndex === index && styles.active
          }`}
        >
          <div
            className={styles.edit}
            
          >
            <img src={EditImage} height="100%" alt="Edit" onClick={handleEdit}/>
          </div>
          <div
            className={styles.delete}
         
          >
            <img src={DeleteImage} height="100%" alt="Delete" onClick={handleDelete}/>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Transaction;
