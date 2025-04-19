import React from 'react'

type Props = {
    id?:string
}

export default function TemplateNotFound({id}: Props) {
  return (
    <div>template {id} not found</div>
  )
}