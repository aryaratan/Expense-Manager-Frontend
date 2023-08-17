import { useState, useEffect } from "react";
import "./App.css";


import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";


import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
   

  const [ExpenseLists, setExpenseLists] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [decs, setDecs] = useState('');
  const [amt, setAmt] = useState('');
  const [id, setId] = useState('');

  const preFtechExpenseLists = () => {
    fetch("http://localhost:8000")
      .then(response => response.json())
      .then(apiData => {
        setExpenseLists(apiData.expenses);
        setExpense(apiData.expense);
        setIncome(apiData.income);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    preFtechExpenseLists();
  }, [ExpenseLists, decs, amt, id]); 
 

  const onEdit = (decs, amt, id) => {
    setDecs(decs);
    setAmt(amt);
    setId(id);
  }
  return (
    <>
      <ToastContainer />
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm editDec={decs} editAmt={amt} id={id}/>
        <div className="expenseContainer">
          <ExpenseInfo income={income} expense={expense} />
          <ExpenseList ExpenseList={ExpenseLists} onEdit={onEdit}/>
        </div>
      </div>
    </>
  );
}

export default App;
