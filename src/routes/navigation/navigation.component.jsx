import {Outlet, Link} from 'react-router-dom'
import {Fragment, useContext} from 'react'
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import {NavigationContainer, LogoContainer, NavLinks, NavLink}  from './navigation.styles.js'
import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

const Navigation = () =>{
  const {currentUser} = useContext(UserContext)
  const {isCartOpen} = useContext(CartContext)
    return(
      <Fragment>
        <NavigationContainer>
            <Link className='logo-container' to='/'>
                <CrwnLogo className='logo'/>
            </Link>
          <NavLinks>
            <NavLink to='/shop'>SHOP</NavLink>
            {currentUser ? (<span className='nav-link' onClick={signOutUser}>SIGN OUT</span>):
            (<NavLink to='/auth'>SIGN IN</NavLink>)
            }
            <CartIcon/>
          </NavLinks>
          {isCartOpen && <CartDropdown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  }

export default Navigation