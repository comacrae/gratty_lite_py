import Link from "next/link";
import React from "react";
interface BtnToRoute {
  btnTitle: string;
  routePath: string;
}
export default function Navbar() {
  const routes: BtnToRoute[] = [
    { btnTitle: "About", routePath: "/about" },
    { btnTitle: "Profile", routePath: "/profile" },
    { btnTitle: "Login", routePath: "/login" },
  ];

  return (
    <div className="navbar bg-base-100">
      <TitleButton title="GrattyLite" href="/" />
      {getNavLinkList(routes)}
    </div>
  );
}

function getNavLinkList(list: BtnToRoute[]) {
  return list.map((item, idx) => {
    return <NavLink title={item.btnTitle} href={item.routePath} key={idx} />;
  });
}

const TitleButton: React.FC<NavLinkProps> = ({ title, href = "/" }) => {
  return (
    <div className="flex-1">
      <Link passHref href={href} legacyBehavior>
        <a className="btn btn-ghost text-xl">{title}</a>
      </Link>
    </div>
  );
};

type NavLinkProps = {
  title: string;
  href: string;
};

const NavLink: React.FC<NavLinkProps> = ({ title, href = "/home" }) => {
  return (
    <Link passHref href={href} legacyBehavior>
      <a className="btn btn-ghost">{title}</a>
    </Link>
  );
};
