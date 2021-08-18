import React,{useEffect} from 'react'
import {GeneratorRegular,action_counter_queue} from '../../Services/Actions/QueueActions'
import {useDispatch,useSelector}from 'react-redux'
import MainQueueUI from './MainQueueUI'
const IndexQueue=()=> {
const dispatch=useDispatch();
useEffect(() => {
    let mounted=true
    const queuestations=()=>{
        dispatch(GeneratorRegular())
        dispatch(action_counter_queue())
    }
    mounted && queuestations()
    return () => {mounted=false}
}, [dispatch])    
    return (
        <MainQueueUI/>
    )
}
export default IndexQueue