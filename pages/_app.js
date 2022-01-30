import 'normalize.css'
import '../styles/globals.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Meta from '@/Common/Meta'

export default function MyApp({
  Component, // 当前路由组件
  pageProps, // 含有已请求数据的对象
}) {
  return (
    <>
      <Meta />
      <Component {...pageProps} />
    </>
  )
}
