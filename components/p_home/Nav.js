import s from './Nav.module.css'
import ReactSlick from 'react-slick'
import Link from 'next/link'

const Nav = ({ data = [] }) => {
  const isSwiperable = !!(data && data.length)
  const settings = {
    dotsClass: 'nav-dots',
    speed: 500,
    rows: 2,
    dots: isSwiperable,
    infinite: isSwiperable,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: isSwiperable,
  }
  return (
    <section className={s.nav}>
      <ReactSlick {...settings}>
        {data.map((item, index) => (
          <div key={`${index}-${item.id}`}>
            {/* 跳转连接 */}
            {/* nav 图片 */}
            <a className={s._19_60} href={`/course/detail/${item.id}`}>
              <img src={item.img} className={s.slide} />
              <span className={s.title}>{item.title}</span>
            </a>
          </div>
        ))}
      </ReactSlick>
    </section>
  )
}
export default Nav
