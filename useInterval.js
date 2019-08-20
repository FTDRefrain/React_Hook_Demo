// capture value
// 因为两次的render已经不同了
import React, { useState, useRef } from 'react'
import ReactDom from 'react-dom'

const capture_value_demo = () => {
	const [temp, setTemp] = useState(0)
	const log = () => {
		setTimeout(()=>{
			console.log(temp) // 0
		}, 3000)
	}
	const handleClick = () => {
		log()
		setTemp(5)
	}
	return (
		<div onClick=handleClick></div>
	)
}
// 避免这个特性
// useRef进行了唯一引用，避免了render的不同导致的函数不同
const capture_value_demo = () => {
	const [temp, setTemp] = useState(0)
	const lastTemp = useRef(temp)
	const log = () => {
		lastTemp.current = temp
		setTimeout(()=>{
			console.log(lastTemp.current) // 0
		}, 3000)
	}
	const handleClick = () => {
		log()
		setTemp(5)
	}
	return (
		<div onClick=handleClick></div>
	)
}
// 依赖问题
// 下面因为没有加入依赖，所以每次的count都是0开始的
const capture_value_demo = () => {
	const [count, setCount] = useState(0)
	useEffect(()=>{
		const timer = setInternal(()=>{
			setCount(count+1)
		}, 1000)
		return clearInternal(timer)
	}, [])
	return (
		<div>{count}</div>
	)
}
// 加入了依赖，但是会不断的添加事件和删除
const capture_value_demo = () => {
	const [count, setCount] = useState(0)
	useEffect(()=>{
		const timer = setInternal(()=>{
			setCount(count+1)
		}, 1000)
		return clearInternal(timer)
	}, [count])
	return (
		<div>{count}</div>
	)
}
// 回调的方式，用的就是最新的
// 问题就是多变量怎么说？
const capture_value_demo = () => {
	const [count, setCount] = useState(0)
	useEffect(()=>{
		const timer = setInternal(()=>{
			setCount(c => c+1)
		}, 1000)
		return clearInternal(timer)
	}, [])
	return (
		<div>{count}</div>
	)
}
// 局部redux的方式
// 叫金手指， 因为有依赖且数据可变
import { useReducer } from 'react'

const initialState = {
	user: 1,
	count: 2
}

const reducer = (state, action) => {
	const [user, count] = state
	switch(action.type) {
		case 'tick': return {user: user+count, count}
		default
	}
}

const capture_value_demo = () => {
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(()=>{
		const timer = setInternal(()=>{
			dispatch({type: 'tick'})
		}, 1000)
		return clearInternal(timer)
	}, [dispatch])

	const handleClick = () => {
		dispatch({
			type: 'tick',
			count: count+1
		})
	}
	return (
		<div onClick=handleClick />
	)
}
