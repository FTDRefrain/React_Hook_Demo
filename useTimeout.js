// disable防止重复请求
import React, {useState, useEffect, useRef} from 'react'

const useTimeout = (delay) => {
	const [disable, setDisable] = useState(false)
	const timer = useRef(null)
	// 设置成disable
	const start = useCallback(() => {
		setDisable(true)
		clearTimeout(timer.current)
		timer.current = setTimeout(()=>{
			setDisable(false)
		}, delay)
	}, [delay])
	// 取消disable
	const stop = useCallback(()=>{
		clearTimeout(timer.current)
	}, [])
	// 周期结束也清除
	useEffect(()=>{
		return () => {
			stop()
		}
	}, [])

	return [disable, start, stop]
}

// demo
function demo() {
	const [disable, start] = useTimeout(3000)
	const handleClick = useCallback(()=>{
		start()
		doSomething()
	}, [])
	return <button disable={disable} onClick={handleClick} />
}