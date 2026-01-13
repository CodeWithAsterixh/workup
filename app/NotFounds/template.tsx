import React from 'react'

type Props = {
    id?:string
}

export default function TemplateNotFound({id}: Readonly<Props>) {
  return (
    <div>template {id} not found</div>
  )
}