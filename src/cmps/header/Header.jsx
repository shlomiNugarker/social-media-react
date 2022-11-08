import { Logo } from '../../assets/imgs/Logo'
import { InputFilter } from './InputFilter'
import { Nav } from './Nav'

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
