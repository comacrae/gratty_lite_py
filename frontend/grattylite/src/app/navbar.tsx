"use server";
import Link from "next/link";
import React from "react";
import { auth } from "@/app/auth";
interface BtnToRoute {
  btnTitle: string;
  routePath: string;
}
export default async function Navbar() {
  const session = await auth();
  const routes: BtnToRoute[] = [
    { btnTitle: "About", routePath: "/about" },
    { btnTitle: "Profile", routePath: "/profile" },
  ];
  if (session?.user)
    routes.push({ btnTitle: "Logout", routePath: "/api/auth/signout" });
  else routes.push({ btnTitle: "Login", routePath: "/api/auth/signin" });

  return (
    <div className="navbar bg-transparent">
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
        <a className="btn btn-ghost text-2xl">{title}</a>
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
