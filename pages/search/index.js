import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Input from '@/p_search/Input'
import History from '@/p_search/history'
import Suggest from '@/p_search/suggest'
import Result from '@/p_search/Result'
import { getSearchResult, getSearchSuggest, getHotWord } from 'core/api'
import { throttle } from 'lodash'

const TYPES = {
  HISTORY: 'history',
  SUGGEST: 'suggest',
  RESULT: 'result',
}

export default function Search({ result, hotWord, kw }) {
  const router = useRouter()
  const [contType, setContType] = useState(kw ? TYPES.RESULT : TYPES.HISTORY) // 内容类型
  const [suggestList, setSuggestList] = useState([]) // 推荐数据
  const [history, setHistory] = useState(kw ? [kw] : []) // 搜索历史
  const [inputVal, setInputVal] = useState(kw || '') // 输入框的值

  // 切换到搜索结果路由
  const submitSearch = (kw = '') => {
    setContType(TYPES.RESULT)
    // 替换路由参数
    console.log(kw)
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
    [contType, setContType,setSuggestList],
  )

  // 渲染 内容区
  const renderContent = () => {
    switch (contType) {
      case TYPES.HISTORY:
        return <History submitSearch={submitSearch} hotWord={hotWord} history={history} />
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
        <div>{renderContent()}</div>
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
