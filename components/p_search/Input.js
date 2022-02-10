import { memo, useRef } from 'react'

const Input = ({ submitSearch, fetchSuggest, showHistory, inputVal, setInputVal }) => {
  const inputEl = useRef(null) // 输入框元素

  // 输入框回车确认搜索 (不触发onchange)
  const searchSubmit = (e) => {
    if (e.keyCode !== 13 || !inputEl?.current) return
    console.log('searchSubmit')
    const event = e || window.event
		event.preventDefault()
    fetchSuggest.cancel() // 取消等待的搜索建议请求
    const filteredVal = inputEl.current.value.trim()
    // kw空值
    if (!filteredVal) {
      setInputVal('') // 清空空格
      return false
    }
    submitSearch(filteredVal) // 提交查询字段
    inputEl.current.blur() // 收起键盘
    return false // 禁止按回车表单自动提交
  }
  // 输入框输入中
  const handleChange = () => {
    const searchVal = inputEl.current.value
    setInputVal(searchVal) // 受控value
    const trimVal = searchVal.trim()
    if (!trimVal) {
      fetchSuggest.cancel() // 取消等待的搜索建议请求
      // 字符为空展示历史
      showHistory()
      return false
    }
    // 字符非空搜索建议
    if (inputVal !== trimVal) {
      fetchSuggest(trimVal)
    }
  }

	const clearInput = () => {
    fetchSuggest.cancel() // 取消等待的搜索建议请求
    showHistory()
    setInputVal('')
    inputEl.current.focus()
  }

  return (
    <div>
        <input
          type="search"
          value={inputVal}
          // placeholder={' 输入搜索内容'}
          onChange={handleChange}
          ref={inputEl}
          onKeyUp={searchSubmit}
        />
    </div>
  )
}

export default memo(Input)
