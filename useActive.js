// 事件监听相关
// 点击举例子
import React, {useState, useEffect} from 'react'

const useActive = (domRef) => {
	const [active, setActive] = useState(false)

	useEffect(()=>{
		const onActive = () => setActive(true)
		const deActive = () => setActive(false)

		if(domRef && domRef.current) {
			window.addEventListener('mousedown', onActive)
			window.addEventListener('mouseup', deActive)
		}
		return () => {
			if(domRef && domRef.current) {
				window.removeEventListener('mousedown', onActive)
				window.removeEventListener('mouseup', deActive)
			}
		}
	}, [])

	return active
}

// demo
function demo() {
	const ref = useRef(null)
	const active = useActive(ref)
	return <div ref={ref}>{active && 'active'}</div>
}