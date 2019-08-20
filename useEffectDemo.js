// 副作用依赖
import React, {useState, useEffect, useRef} from 'react'
// title
const useTitle = (t) => {
	useEffect(()=>{
		document.title = t
	}, [t])
}
// demo
function Demo(props){
	useTitle(props.t === 'main' ? 'main' : 'others')
}
// useDebounce
// 依赖改变延迟请求
const useDebounce = (fn, dependence=[], delay) => {
	const mounted = useRef(false)
	useEffect(()=>{
		if(!mounted.current){
			mounted.current = true
			return
		} else {
			const timer = setTimeout(fn, delay)
		}
		return ()=>{
			// dependence发生变化，到这里然后清除
			clearTimeout(timer)
		}
	}, dependence)
}
// demo
function QueryDemo() {
	const [query, setQuery] = useState('default')
	const [list, setList] = useState([])
	const delay = 3000
	const handleSearch = async () => {
		setList(await fetch(query))
	}
	useDebounce(handleSearch, [query], delay)
	return (
		<div>
			<SearchBar value={query} onChange={setQuery} />
			<ResultBar list={list} />
		</div>
	)
}
// 类似的useThrottle
const useThrottle = (fn, dependence, delay) => {
	const [state, setState] = useState(null)
	const timer = useRef(null)
	const canRun = useRef(true)

	useEffect(()=>{
		if(!timer.current){
			setState(fn())
			const cb = () => {
				if(canRun.current) {
					// 执行后关闭
					setState(fn())
					canRun.current = false
					// 反复执行
					timer.current = setTimeout(cb, delay)
				} else {
					// 没触发过，回到初始
					timer.current = null
				}
			}
			timer.current = setTimeout(cb, delay)
		} else {
			canRun.current = true
		}
		// 最后清除
		return () => {
			clearTimeout(timer.current)
		}
	}, dependence)
}