import { Logo } from '../../assets/imgs/Logo'
import { InputFilter } from './InputFilter'
import { Nav } from './Nav'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterBy } from '../../store/actions/postActions'
import { useState } from 'react'

export function Header() {
  return (
    <header className="header ">
      <div className="container">
        <Logo />
        <InputFilter />
        <Nav />
      </div>
    </header>
  )
}
