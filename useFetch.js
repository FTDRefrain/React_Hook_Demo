// useEffect中函数抽离
const ParentComp = () => {
	const [query, setQuery] = useState('react')
	const fetchData = useCallback(() => {
		fetch(query)
	}, [query])
	return <ChildComp fetchData=fetchData />
}

const ChildComp = () => {
	useEffect(()=>{
		fetchData()
	}, [fetchData])
}
// 数据获取
const fetchDemo = ({id}) => {
	const [query, setQuery] = useState('react')
	useEffect(()=>{
		let canCancel = false
		async function fetchData(){
			const result = await fetch(id)
			if(!canCancel) {
				setQuery(result.data)
			}
		}
		fetchData()
		return () => canCancel = true
	}, [fetch])
}
// 请求封装的例子
// 构建局部redux
const dataFetchState = (initialData) => {
	return {
		isLoading: false,
		isError: false,
		data: initialData,
	}
}

const dataFetchReducer = (state, action) => {
	switch(action.type) {
		case 'FETCH_LOADING':
			return {
				...state,
				isLoading: true,
				isError: false,
			}
		case 'FETCH_SUCCESS':
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload
			}
		case 'FETCH_ERROR':
			return {
				...state,
				isLoading: false,
				isError: true
			} 
		default:
			throw new Error()
	}
}

const useFetchAPI = (initialUrl, initialData) => {
	const [url, setUrl] = useState(initialUrl)
	const [state, dispatch] = useReducer(dataFetchReducer, dataFetchState(initialData))
	useEffect(()=>{
		let canCancel = false
		// 取数逻辑
		const fetchData = async () => {
			dispatch({type:'FETCH_LOADING'})
			if(!canCancel) {
				try {
					const result = await axios(url)
					dispatch({
						type: 'FETCH_SUCCESS',
						payload: result.data
					})
				} catch(e) {
					dispatch({
						type: 'FETCH_ERROR'
					})
				}
			}
		}
		// 初始化拿数据
		fetchData()
		// dispose时候避免取数
		return () => {
			canCancel = true
		}
	}, [dispatch])
}