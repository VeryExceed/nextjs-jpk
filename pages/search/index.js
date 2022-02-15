import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Input from '@/p_search/Input'
import History from '@/p_search/history'
import Suggest from '@/p_search/suggest'
import Result from '@/p_search/Result'
import { getSearchResult, getSearchSuggest, getHotWord } from 'core/api'
import { throttle } from 'lodash'
import useLSState from 'core/hooks/useLSState'
import s from './search.module.css'

const TYPES = {
  HISTORY: 'history',
  SUGGEST: 'suggest',
  RESULT: 'result',
}

export default function Search({ result, hotWord, kw }) {
  const router = useRouter()
  const [contType, setContType] = useState(kw ? TYPES.RESULT : TYPES.HISTORY) // 内容类型
  const [suggestList, setSuggestList] = useState([]) // 推荐数据
  const [loading, setLoading] = useState([false]) // 加载中
  const [history, setHistory] = useLSState('searchHistory', kw ? [kw] : []) // 搜索历史
  const [inputVal, setInputVal] = useState(kw || '') // 输入框的值

  // 切换到搜索结果路由
  const submitSearch = (kw = '') => {
    // 保存去重搜索记录, 最长保持6条，最近优先
    history.unshift(kw)
    setHistory([...new Set(history.slice(0, 6))])
    setContType(TYPES.RESULT)
    // 加载中
    setLoading(true)
    // 替换路由参数
    console.log('切换路由', kw)
    setInputVal(kw)
    router.replace({
      path: '/search',
      query: {
        kw,
      },
    })
  }
  // 搜索建议
  const fetchSuggest = useMemo(
    () =>
      throttle(async (kw = '') => {
        console.log('fetchSuggest', kw)
        // 切换内容类型为搜索建议
        if (contType !== TYPES.SUGGEST) setContType(TYPES.SUGGEST)
        // 请求数据
        const res = (await getSearchSuggest(kw)) || []
        // 更新State
        setSuggestList(res)
      }, 300),
    [contType, setContType, setSuggestList],
  )

  // 渲染 内容区
  const renderContent = () => {
    if (loading) return <div className={s.loading}>加载中......</div>
    switch (contType) {
      case TYPES.HISTORY:
        return (
          <History
            submitSearch={submitSearch}
            hotWord={hotWord}
            history={history}
            deleteHistory={() => setHistory([])}
          />
        )
      case TYPES.SUGGEST:
        return <Suggest submitSearch={submitSearch} data={suggestList} />
      case TYPES.RESULT:
        return <Result data={result} kw={kw} />
      default:
        break
    }
  }

  const showHistory = () => {
    setContType(TYPES.HISTORY)
  }

  // result数据加载结束清空loading状态
  useEffect(() => {
    setLoading(false)
  }, [result])

  return (
    <div>
      <Head>
        <title>精品课搜索页</title>
      </Head>
      <main>
        {/* 输入框 */}
        <Input
          keyword={kw}
          submitSearch={submitSearch}
          fetchSuggest={fetchSuggest}
          inputVal={inputVal}
          showHistory={showHistory}
          setInputVal={setInputVal}
        />
        {/* 内容区 */}
        <div className={s.content}>{renderContent()}</div>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { kw = '' } = query
  let result = []
  let hotWord = []

  if (kw && kw.trim()) {
    // 热门词汇 & 搜索结果
    const [resultRes, hotWordRes] = await Promise.allSettled([getSearchResult(kw), getHotWord()])
    result = resultRes.value
    hotWord = hotWordRes.value
  } else {
    // 热门词汇
    hotWord = await getHotWord()
  }

  return {
    props: {
      result: result, // 搜索结果
      hotWord: hotWord, // 热门词汇
      kw, // 搜索关键字
    },
  }
}
