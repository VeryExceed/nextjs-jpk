import { useEffect } from "react";

import Router from "next/router";

export default function RouterApi() {
  const handler = () => {
    Router.push({
      pathname: "/book/456",
      query: { year: "2022" },
    });
  };

  // beforepopState
  useEffect(() => {
    Router.beforePopState((url) => {
      if (url !== "/book") {
        alert("url not allowed");
        return false;
      }
      return true;
    });
  }, []);

  //router events
  useEffect(() => {
    const handleRouteChange = (url) => {
      alert(`App is changing to: ${url}`);
    };
    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  });
  return (
    <main>
      <h1>RouterApi</h1>
      <ul>
        {/* push */}
        <li>
          <button onClick={() => Router.push("/book")}>/book</button>
        </li>
        <li>
          <button onClick={() => Router.push("/book/[id]", "/book/123")}>
            /book/123
          </button>
        </li>
        <li>
          <button onClick={handler}>/book/456</button>
        </li>
        {/* replace */}
        <li>
          <button onClick={() => Router.replace("/book")}>replace /book</button>
        </li>
        {/* back */}
        <li>
          <button onClick={() => Router.back()}>←back</button>
        </li>
        {/* reload */}
        <li>
          <button onClick={() => Router.reload()}>reload</button>
        </li>
      </ul>
    </main>
  );
}
