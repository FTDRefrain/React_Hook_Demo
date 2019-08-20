// 监控是否在线
// 类似可以拿到其他状态
import React, {useState, useEffect} from 'react'

const useOnlineWatcher = () => {
	const value = typeof navigator.onLine === 'boolean' ? navigator.onLine : true
	const [status, setStatus] = useState(value)

	useEffect(()=>{
		const online = () => setStatus(true)
		const offline = () => setStatus(false)

		window.addEventListener('online', online)
		window.addEventListener('offline', offline)

		return () => {
			window.removeEventListener('online', online)
			window.removeEventListener('offline', offline)
		}
	}, [])

	return status
}