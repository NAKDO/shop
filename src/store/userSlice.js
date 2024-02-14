import { createSlice } from "@reduxjs/toolkit"

let user = createSlice({
    name : 'user',
    initialState : { name : 'kim', age : 20 },
    //state 변경 함수
    reducers : {
        changeName(state){
            state.name = 'park'
        },
        increase(state, action){
            state.age += action.payload
        }
    }
})
//state 변경 함수 불러오기
export let { changeName, increase } = user.actions

export default user;