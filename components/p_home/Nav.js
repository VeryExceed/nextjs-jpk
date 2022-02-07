import s from './Nav.module.css'
import ReactSlick from 'react-slick'
import Link from 'next/link'

const Nav = ({ data = [] }) => {
  const isNavrable = !!(data && data.length)
  const settings = {
    arrows: true,
    dotsClass: 'nav-dots',
    className: 'home-navs',
    slidesToShow: 4,
    slidesPerRow: 2,
    speed: 500,
    // rows: 2,
    infinite: isNavrable,
    swipe: isNavrable,
    lazyLoad: true,
    dots: isNavrable,
    // adaptiveHeight: isNavrable,
  }
  return (
    <section className={s.nav}>
      <ReactSlick {...settings}>
        {data.map((item, index) => (
          <div key={`${index}-${item.id}`} className={s.slidediv}>
            <Link href="/course/detail/[id]" as={`course/detail/${item.id}`}>
              <a className={s._19_60}>
                <img src={item.img} className={s.navslide} />
                <span className={s.title}>{item.title}</span>
              </a>
            </Link>
          </div>
        ))}
      </ReactSlick>
    </section>
  )
}
export default Nav
