'use client'

import { Link } from '@nextui-org/react'

export interface IPageTitleLink {
  title: string;
  href: string;
}

export interface IPageTitleProps {
  title: string
  link?: IPageTitleLink
}

export const PageTitle = ({
  title,
  link
}: IPageTitleProps) => {
  return (
    <div className="my-4">
      <h1 className="text-lg font-bold">{title}</h1>

      {link && (
        <Link
          showAnchorIcon
          href={link.href}
        >
          {link.title}
        </Link>
      )}
    </div>
  )
}
