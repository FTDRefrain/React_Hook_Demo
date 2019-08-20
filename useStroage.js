import React, {useState} from 'react'
// storage封装
const useStorage = (key, defaultValue=null, ifKeep=false) => {
	// 持久化问题
	const store = ifKeep ? localStorage : sessionStorage
	// 获取内容
	const getItem = () => {
		try {
			const item = store.getItem(key)
			if(item !== null) {
				return JSON.parse(item)
			} else if(defaultValue !== null) {
				// 存的是个函数？
				const item  = typeof defaultValue === 'function' ? defaultValue() : defaultValue
				store.setItem(key, JSON.stringify(item))
				return item
			}
		} catch(e) {
			console.warn(`get ${key}:`, err)
		}
		return undefined
	}

	const [value, setValue] = useState(getItem())
	// 存内容
	const saveItem = useCallback((newValue) => {
		setValue((prev)=>{
			const itemNow = typeof newValue === 'function' ? newValue(prev) : newValue
			store.setItem(key, JSON.stringify(itemNow))
			// 回调里面要返回才能拿到最新内容
			return itemNow
		})
	}, [setValue])
	// 清空
	const clear = useCallback(()=>{
		store.removeItem(key)
		setValue(undefined)
	})

	return [value, saveItem, clear]

}


// demo
function demo() {
	const [value, setValue, clear] = useStorage('user')
}