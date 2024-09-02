
import { useState } from 'react'
import './App.css'
import cals from './assets/cal.png'

function App() {
  const[data,setData]=useState({
    tamil:"",
    english:"",
    maths:"",
    science:"",
    social:""
  })
  const[result,setResult]=useState(null)
  const[greade,setGreade]=useState("");
  const[error,setError]=useState("");
  function handledata(e){
    setData({...data,[e.target.name]:e.target.value})
  }
  function calculate(){
    if((data.tamil && data.english && data.maths && data.science && data.social) && (data.tamil)<=100 && (data.english)<=100 && (data.maths)<=100 && (data.science)<=100 && (data.social)<=100){
      const result = Number(data.tamil)+Number(data.english)+Number(data.maths)+Number(data.science)+Number(data.social);
      setResult(result);
      if(result < 250){
        setGreade("F");
      }
      else if(result >=250 && result <350){
        setGreade("B");
      }
      else if(result >=350 && result <400){
        setGreade("A");

      }
      else if(result >=400 && result <450){
        setGreade("A+")
      }
      else{
        setGreade("O");
      }
      setError("");
    }
    else{
      setResult(null);
      setGreade("");
      setError("Please enter the valid Mark");
    }
  }
  function clear(){
    setData({
      tamil:"",
      english:"",
      maths:"",
      science:"",
      social:""
    })
    setError("");
    setResult(null);
    setGreade("");
  }


  return (
    <>
      <div className='mark-calculator'>
        <div className='box'>
          <img src={cals} alt='image'/>
        </div>
        <div className='data'>
          <h1>Mark Calculator</h1>
         { error && <p className='error'>{error}</p>}
          <div className='input-container'>
            <label htmlFor='tamil'>Tamil :</label>
            <input type='text' 
            value={data.tamil} 
            id='tamil'
            name='tamil'
            onChange={handledata}
            ></input>
          </div>
          <div className='input-container'>
            <label htmlFor='english'>English :</label>
            <input type='text'
            value={data.english} 
            id='english'
            name='english'
            onChange={handledata}
            ></input>
          </div>
          <div className='input-container'>
            <label htmlFor='maths'>Maths :</label>
            <input type='text'
             value={data.maths} 
             id='maths'
             name='maths'
             onChange={handledata}
             ></input>
          </div>
          <div className='input-container'>
            <label htmlFor='science'>Science :</label>
            <input type='text'
             value={data.science} 
             id='science'
             name='science'
             onChange={handledata}
             ></input>
          </div>
          <div className='input-container'>
            <label htmlFor='social'>Social Science :</label>
            <input type='text'
             value={data.social}
              id='social'
              name='social'
              onChange={handledata}
              ></input>
          </div>
          <button onClick={calculate}>Calculate Mark</button>
          <button onClick={clear}>Clear</button>
          {result!==null && (
           <div className='result'>
           <p>Your Mark is : {result}</p>
           <p>Greade : {greade}</p>
         </div>
        )}
        </div>
      </div>
    </>
  )
}

export default App
