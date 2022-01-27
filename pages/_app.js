import '../styles/globals.css'

function MyApp({
  Component, // 当前路由组件
  pageProps, // 含有已请求数据的对象
}) {
  return <Component {...pageProps} />
}

export default MyApp
