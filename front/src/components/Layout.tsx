"use client"
import React from 'react'
import HeaderMain from './Header'
import Table from './tablesView'


export default function Layout() {
  return (
    <>
      <HeaderMain showSearchBar={true} />
      <Table />
    </>
  )
}
