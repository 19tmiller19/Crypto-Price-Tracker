import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/coincontext'
import { Link } from 'react-router-dom'


const Navbar = () => {

    const {setCurrency} = useContext(CoinContext);

    const currencyHandler = (event)=>{
        switch (event.target.value){
            case "usd":{
                setCurrency({name:"usd", symbol:"$"});
                break;
            }
            case 'eur':{
                setCurrency({name:"eur",symbol:"Є"});
                break;
            }
            case 'inr':{
                setCurrency({name:"inr", symbol:"₹"});
                break;
            }
            default : {
                setCurrency({name: "usd", symbol: "$"});
                break;
            }
        }

    }

  return (
    <div className='navbar'>
       <Link to={'/'}><img className='logo' src={logo} alt='logo'/></Link>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
        </ul>
        <div className="navbar-right">
            <select onChange={currencyHandler}>
                <option value='usd'>USD</option>
                <option value='eur'>Euro</option>
                <option value='inr'>Inr</option>
            </select>
            <button>Sign up <img src={arrow} alt='arrow'/></button>

        </div>

    </div>
  )
}

export default Navbar