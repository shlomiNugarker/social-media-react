import { Logo } from '../assets/imgs/Logo'
import { Input } from './Input'
import { Nav } from './Nav'

export function Header() {
  return (
    <header className="header ">
      <div className="container">
        <Logo />
        <Input />
        <Nav />
      </div>
    </header>
  )
}
