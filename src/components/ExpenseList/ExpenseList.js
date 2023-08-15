import React, { useEffect, useState } from "react";
import styles from "./ExpenseList.module.css";
import Transaction from "../Transaction/Transaction";

const ExpenseList = ({ExpenseList, onEdit}) => {

  
  return (
    <div className={styles.expenseListContainer}>
      <h3>Transactions</h3>
      <ul className={styles.transactionList}>
        {ExpenseList.map((expense, i) => {
           return ( 
            <Transaction
              id={expense._id}
              key={i}
              expense={expense}
              onEdit={onEdit}
            />
          ); 
         })} 
      </ul>
    </div>
  );
};

export default ExpenseList;
