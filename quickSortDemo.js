// 不是完美，但是结构清晰
const quickSortDemo = (arr) => {
	if(arr.length <= 0){
		return []
	}
	const [ cur, ...rest ] = arr
	return [
		...quickSortDemo(rest.filter(i => i < cur),
		cur,
		...quickSortDemo(rest.filter(i => i >= cur))
	]
}