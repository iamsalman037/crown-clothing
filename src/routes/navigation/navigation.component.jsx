import {Outlet, Link} from 'react-router-dom'
import {Fragment} from 'react'
import {useSelector} from 'react-redux'
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import {NavigationContainer, NavLinks, NavLink}  from './navigation.styles.js'
import {selectCurrentUser} from '../../store/user/user.selector'
import {selectIsCartOpen} from '../../store/cart/cart.selector'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

const Navigation = () =>{
  //const {currentUser} = useContext(UserContext)
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)
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