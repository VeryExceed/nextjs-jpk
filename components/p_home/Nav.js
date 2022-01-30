import s from './Nav.module.css'
import ReactSlick from 'react-slick'

const Nav = ({ data = [] }) => {
  console.log(data)
  const isSwiperable = !!(data && data.length)
  console.log(isSwiperable)
  const settings = {
    dotsClass: 'nav-dots',
    // className: 'home-navs',
    speed: 500,
    rows: 2,
    // dots: isSwiperable,
    // slidesToShow: 1,
    // swipe: isSwiperable,
    // slidesToScroll: 8,
    // initialSlide: 0,

    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: true
  }
  return (
    <section className={s.nav}>
      <ReactSlick {...settings}>
          
      {data.map((item, index) => (
          <div key={`${index}-${item.courseId}`}>
            {/* 跳转连接 */}
              {/* banner 图片 */}
              <a className={s._19_60}>
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
