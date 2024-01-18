import {Outlet, Link} from 'react-router-dom'
import {Fragment} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import {NavigationContainer, NavLinks, NavLink}  from './navigation.styles.js'
import {selectCurrentUser} from '../../store/user/user.selector'
import {selectIsCartOpen} from '../../store/cart/cart.selector'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import { signOutStart } from '../../store/user/user.action.js'

const Navigation = () =>{
  //const {currentUser} = useContext(UserContext)
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)

  const signOutUser = () => dispatch(signOutStart())

    return(
      <Fragment>
        <NavigationContainer>
            <Link className='logo-container' to='/'>
                <CrwnLogo className='logo'/>
            </Link>
          <NavLinks>
            <NavLink to='/shop'>SHOP</NavLink>
            {currentUser ? (<NavLink onClick={signOutUser}>SIGN OUT</NavLink>):
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