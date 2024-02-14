import { useState } from 'react';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import { Nav } from 'react-bootstrap';
import { addItem } from '../store/cartSlice.js';
import { useDispatch } from 'react-redux';

// import { Button, Navbar, Container, Nav } from 'react-bootstrap';

// let YellowBtn = styled.button`
// background : ${ props => props.bg };
// color : ${ props => props.bg == 'blue' ? 'white' : 'black'};
// padding : 10px;
// `
// let Box = styled.div`
// background : grey;
// padding : 20px;
// `

function Detail(props){

    // let [count, setCount] = useState(0)
    // let [num, setNum] = useState('')
    let [alert, setAlert] = useState(true)
    let[tab, setTab] = useState(0)
    let [fade2, setFade2] = useState('')
    let dispatch = useDispatch()

    useEffect(()=>{
        let a = setTimeout(()=>{ setAlert(false) }, 2000)
        
        return ()=>{
            clearTimeout(a)
        }
    }, [])

    useEffect(()=>{
        setTimeout(()=>{ setFade2('end') }, 100)
        
        return ()=>{
            setFade2('')
        }
    }, []) //Detail 컴포넌트 로드시 투명도 0 -> 1 로 증가하는 애니메이션

    useEffect(()=>{
        
        let 꺼낸거 = localStorage.getItem('watched')
        꺼낸거 = JSON.parse(꺼낸거)
        꺼낸거.push(찾은상품.id)
        꺼낸거 = new Set(꺼낸거)
        꺼낸거 = Array.from(꺼낸거)
        localStorage.setItem('watched', JSON.stringify(꺼낸거))
      }, []) 

    // useEffect(()=>{
    //     if(isNaN(num) == true) {
    //         alert("숫자만입력하세요");
    //     }
    // }, [num])


    let {id} = useParams();
    let 찾은상품 = props.shoes.find(x => x.id == id);

    return(
        <div className={'container start ' + fade2} >
            {/* <YellowBtn bg="blue">버튼</YellowBtn>
            <YellowBtn bg="orange">버튼</YellowBtn>
            <Button variant="primary">Primary</Button>{' '} */}
            {
                alert == true
                ? <div className="alert alert-warning">
                    2초이내 구매시 할인
                </div>
                : null
            }
            {/* {count}
            <button onClick={()=>{ setCount(count+1) }}>버튼</button> */}
            <div className="row">
            <div className="col-md-6">
         <img src={'https://codingapple1.github.io/shop/shoes1.jpg'} width="100%" />
        </div>
        <div className="col-md-6">
        {/* <input onChange={ (e) => { setNum(e.target.value) } }></input> */}
        <h4 className="pt-5">{찾은상품.title}</h4>
        <p>{찾은상품.content}</p>
        <p>{찾은상품.price}원</p>
        <button className="btn btn-danger" onClick={()=>{
            dispatch(addItem( {id : 1, name : 'Red Knit', count : 1} ))
        }}>주문하기</button> 
        </div>

        <Nav variant="tabs"  defaultActiveKey="link0">
            <Nav.Item>
                <Nav.Link onClick={()=>{ setTab(0) }} eventKey="link0">버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=>{ setTab(1) }} eventKey="link1">버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=>{ setTab(2) }} eventKey="link2">버튼2</Nav.Link>
            </Nav.Item>
        </Nav>
        <TabContent tab={ tab } />

     </div>
    </div> 
    )
}

function TabContent({tab}) {
    // if( tab == 0) {
    //     return <div>내용0</div>
    // }
    // if( tab == 1) {
    //     return <div>내용1</div>
    // }
    // if( tab == 2) {
    //     return <div>내용2</div>
    // }

    let [fade, setFade] = useState('')

    useEffect(()=>{
        setTimeout(()=>{ setFade('end') }, 100)

        return ()=>{
            setFade('')
        }
    }, [tab])

    return (
        <div className={'start ' + fade}>
            { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab] }
        </div>
    )
}

export default Detail;