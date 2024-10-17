"use client"
import React from 'react'
// import { useMDXComponent } from 'next-contentlayer/hooks'
// import Image from 'next/image'
import { IBlog } from '@/interfaces/schema'


// const mdxComponents = {
//     Image
// }

const RenderMdx = ({blog}: { blog: IBlog }) => {

    // const MDXContent = useMDXComponent(blog.body.code)

  return (
      <div dangerouslySetInnerHTML={ { __html: blog.content }} />
  )
}

export default RenderMdx
  