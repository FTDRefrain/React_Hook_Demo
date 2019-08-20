import React, {useRef, useEffect, useState, useCallback} from 'react'
// 利用ref避免capture value特性
const useRefProps = (props) => {
	const ref = useRef(props)
	// 获取当前值
	ref.current = props
	// 获取上次值
	// useEffect(()=>{
	// 	ref.current = props
	// }, [])
	return ref
}

// demo
function demo(props) {
	const propsRef = useRefProps(props)

	const handleClick = useCallback(()=>{
		const staticMethod = propsRef.current
		staticMethod || staticMethod()
	}, [])

	return <button onClick={handleClick} />
}