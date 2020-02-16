import React from "react";

import { Flex, Link } from "./core";

export interface NavItem {
  label: string;
  url: string;
}

/**
 * Navigation component
 *
 * The Navigation component takes an array of your Ghost
 * navigation property that is fetched from the settings.
 * It differentiates between absolute (external) and relative link (internal).
 * You can pass it a custom class for your own styles, but it will always fallback
 * to a `site-nav-item` class.
 *
 */
const Navigation: React.FC<{ data: Array<NavItem> }> = ({ data }) => (
  <Flex alignItems="center" justifyContent="space-between" mt="15px" mx="20px">
    {data.map((navItem, index) => (
      <Link href={navItem.url} key={index}>
        {navItem.label}
      </Link>
    ))}
    <Link href="/about">About</Link>
  </Flex>
);

export default Navigation;
