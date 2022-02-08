import s from './SectionHeader.module.css'

export default function SectionHeader({ title = '', subTitle = '' }) {
  return (
    <header className={s.header}>
      <div className={s.title}>
        <h4>{title}</h4>
        <h5>{subTitle}</h5>
      </div>
      <a href="/">
        <span>查看更多</span>
        <img src="/img/right.png" />
      </a>
    </header>
  )
}
