// 声明周期相关
import React, {useState, useReducer, useRef} from 'react'
// forceUpdate
// 利用dispatch
const forceUpdate = () => {
	const [_, onForceUpdate] = useReducer(x => x+1, 0)
	return onForceUpdate
}
// 或者直接setState
const forceUpdateTwo = useState(0)[1]

// componentWillReceiveProps
const usePrevious = (value) => {
	const ref = useRef()
	useEffect(()=>{
		ref.current = value
	}, [])
	return ref.current
}

const PropsDemo = () => {
	const [data, setDate] = useState(0)
	const previousData = usePrevious(data)

	return <h1>{data} {previousData}</h1>
}

// componentDidMount
const useMounted = () => {
	useEffect(()=>{
		doSomething()
	}, [])
}

// componentWillUnmount
const useUnmount = () => {
	useEffect(()=>{
		return () => {
			doSomething()
		}
	}, [])
}

// heavy computed优化
const useOnHeavy = () => {
	// 传入函数初始化
	const [data, setDate] useState(() => heavyCount())
}