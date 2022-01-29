import Head from 'next/head'
import HomeHead from '@/p_home/HomeHead'
import Recommend from '@/p_home/Recommend'
import Talk from '@/p_home/Talk'

export default function Home() {
  return (
    <div>
      <Head>
        <title>精品课首页</title>
      </Head>
      <main>
        <HomeHead />
        <Talk />
        <Recommend />
      </main>
    </div>
  )
}
