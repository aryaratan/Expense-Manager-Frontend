import React, { useState } from "react";
import styles from "./Transaction.module.css";
import EditImage from "../../images/edit.png";
import DeleteImage from "../../images/trash-bin.png";
import {toast} from 'react-toastify';
const Transaction =  ({id, expense, onEdit}) => {
  
  const handleDelete = async () => {
    const response = await fetch(`http://localhost:8000/delete-expense/?id=${id}`,{
      method:'DELETE'
    });
    toast.success('Entry deleted succesfully');
  }
  const handleEdit = async () => {
    fetch(`http://localhost:8000/edit-expense/?id=${id}`)
      .then(response => response.json())
      .then(apiData => {

        // console.log(apiData, "api");
        onEdit(apiData.decs, apiData.amt, id);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    // onEdit()
  }
  return (
    <li
      id={`${id}`}
      className={`${styles.transaction} ${
        styles.profit 
      }`}
      // onMouseOver={() => {
      //   setCurrentHoverIndex(0);
      // }}
      // onMouseLeave={() => {
      //   setCurrentHoverIndex(null);
      // }}
    >
      <div>{expense.description}</div>
      <div className={styles.transactionOptions}>
        <div
          className={`${styles.amount} ${
            styles.movePrice
          }`}
        >
          {expense.amount}
        </div>
        <div
          className={`${styles.btnContainer} ${
            styles.active
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
