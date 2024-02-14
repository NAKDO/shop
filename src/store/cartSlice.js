import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}

      ],
    reducers : {
        increaseCount(state, action) {
            let num = state.findIndex((a)=>{ return a.id == action.payload })
            state[num].count += 1
        },
        addItem(state, action) {
            state.push(action.payload)
        }
    }
})

//state 변경 함수 불러오기
export let { increaseCount, addItem } = cart.actions

export default cart;

