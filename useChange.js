// 输入框双向绑定事件
import React, {useState} from 'react'

const useChange = (initial) => {
	typeof initial === 'function' && (initial = initial())
	const [value, setValue] = useState(initial)
	const onChange = useCallback((e)=> setValue(e.target.value). [])
	return {
		bindEvent: {
			value,
			onChange,
		},
		// 自定义组件
		bindUser: {
			value,
			onChange: setValue,
		}
	}
}

// demo
function demo() {
	const { bindEvent } = useChange('default input')
	return <button {...bindEvent} />
}