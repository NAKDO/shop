import { useState } from 'react';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js';
import axios from 'axios';
import Cart from './routes/Cart.js';
import { useEffect } from "react";
import { useQuery } from 'react-query';
// github 연습

function App() {

  // let obj = {name : 'kim'}
  // localStorage.setItem('data', JSON.stringify(obj))
  // let 꺼낸거 = localStorage.getItem('data')
  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify( [] ))
  },[]) 

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();

  let result = useQuery('작명', ()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{ return a.data })
    
  )


  return (
    <div className="App">


      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail' ) }}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            { result.isLoading && '로딩중' }
            { result.error && '에러남' }
            { result.data && result.data.name }
          </Nav>
        </Container>
      </Navbar>


      <Routes>
        {/* Home 화면 */}
        <Route path='/' element={
        <>
        <div className="main-bg"></div>
        <div className="container">
          <div className="row">
            {
              shoes.map((a, i)=>{
                return(
                  <Card shoes={shoes[i]} i={i}></Card>
                )
              })
            }
          </div>
        </div>
        <button onClick={()=>{
          axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((result)=>{ 
            console.log(result.data)
            let copy = [...shoes, ...result.data];
            setShoes(copy);
           })
           .catch(()=>{
            console.log('실패함')
           })

        }}>더보기</button>
        </> 
      } />
        {/* Detail Page */}
        <Route path='/detail/:id' element={<Detail shoes={shoes} />} />

        {/* About Page */}
        <Route path='/about' element={<About/>}>
          <Route path='member' element={<div>멤버임</div>} />
          <Route path='location' element={<About/>} />
        </Route>
        <Route path='*' element={<div>404 NOT FOUND</div>} />

        {/* Cart Page 장바구니 */}
        <Route path='/cart' element={<Cart/>} />

      </Routes>

    </div>
  );
}

function About(){
  return(
    <div>
      <h4>회사정보임</h4>
    </div>
  )
}


function Card(props){
  return(
    <div className="col-md-4">
        <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) + '.jpg'} width="80%" />
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.content}</p>
        <p>{props.shoes.price}</p>
    </div>
  )
}

export default App;
