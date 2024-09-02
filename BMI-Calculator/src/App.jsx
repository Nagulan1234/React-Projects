
import { useState } from 'react'
import './App.css'
import Bmi from './assets/bmi.jpg'

function App() {
  const[height,setHeight]=useState("");
  const[weight,setWeight]=useState("");
  const[bmi,setBmi]=useState(null);
  const[status,setStatus]=useState("");
  const[error,setError]=useState("");
  
  function calculate(){
    const isvalidHeight=/^\d+$/.test(height);
    const isvalidWeight=/^\d+$/.test(weight);
    if(isvalidHeight &&  isvalidWeight){
      const heightInMeters=height / 100;
      const bmiValue=weight /(heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));
      if(bmiValue < 18.5){
        setStatus("Underweight");
      }
      else if(bmiValue >=18.5 && bmiValue <24.9){
        setStatus("Normal Weight");
      }
      else if(bmiValue >=25 && bmiValue < 29.9){
        setStatus("OverWeight");
      }
      else{
        setStatus("Obese");
      }
      setError("");

    }else{
      setBmi(null);
      setStatus("");
      setError("Please Enter Valid Data");
    }

  }
  function clear(){
    setHeight("");
    setWeight("");
    setBmi(null);
    setStatus("");
    setError("");

  }

  return (
    <>
     <div className='bmi-calculator'>
      <div className='box'>
        <img src={Bmi} alt='image'></img>
      </div>
      <div className='data'>
        <h1>BMI Calculator</h1>
       {error && <div className='error'>{error}</div>}
        <div className='input-container'>
          <label htmlFor='height'>Height (cm):</label>
          <input type='text' value={height} onChange={(e)=>setHeight(e.target.value)} id='height'></input>

        </div>
        <div className='input-container'>
          <label htmlFor='weight'>Weight (kg):</label>
          <input type='text' value={weight} onChange={(e)=>setWeight(e.target.value)} id='weight'></input>
        </div>
        <button onClick={calculate}>Calculate BMI</button>
        <button onClick={clear}>Clear</button>
       {bmi!==null && (
         <div className='result'>
         <p>Your BMI is :{bmi}</p>
         <p>Status :{status}</p>
       </div>
       )}
      </div>
     </div>
    </>
  )
}

export default App
