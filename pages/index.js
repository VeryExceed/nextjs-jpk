import Link from "next/link";
import CustomLink from "../components/CustomLink";

export default function Home() {
  return (
    <main>
      <h1>/index</h1>
      <ul>
        <li>
          <Link href="/book">
            <a>静态路由跳转: /book</a>
          </Link>
        </li>
        <li>
          <Link href="/my/book/one">
            <a>静态路由跳转: /my/book/one</a>
          </Link>
        </li>
        <li>
          <Link href="/book/[if]" as="/book/123">
            <a>动态路由跳转: /book/123</a>
          </Link>
        </li>
        <li>
          <Link href="/book/one" passHref>
            <CustomLink />
          </Link>
        </li>
        <li>
          <Link href={{ pathname: "/book", query: { year: "2022" } }}>
            <a>URL对象跳转: /book?year=2022</a>
          </Link>
        </li>
				<li>
          <Link href="/book" replace>
            <a>Replace to /book</a>
          </Link>
        </li>
				<li>
          <Link href="/book">
            <button>按钮跳转: /book</button>
          </Link>
        </li>
      </ul>
    </main>
  );
}
