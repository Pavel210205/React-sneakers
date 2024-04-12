import React from "react";
import { Link } from 'react-router-dom'
import './Header.scss'
function Header(props) {
    const getItemSum = () => {
        const sumCart = props.items.reduce((acc, curr) => parseInt(acc) + parseInt(curr.price), 0);
        return sumCart
    }
    return (
        <header className="header" >
            <Link to='/' >
                <div className="headerLeft">
                    <img src="./img/logo.png" alt="logo" width={40} height={40} />
                    <div className="headrInfo">
                        <h3>React sniakers</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="headerRight">
                <li onClick={props.onClickCart} style={{ cursor: "pointer" }}>
                    <img className="icon" src="./img/cart.svg" alt="" />

                    <span className="header__price">{`${getItemSum()} руб.`}</span>
                </li>
                <Link to='/favorite'>
                    <li >
                        <img className="icon" src="./img/heart.svg" alt="" />
                        <span className="header__text">Закладки</span>
                    </li>
                </Link>
                <Link to='/purchised'>
                    <li>
                        <img className="icon" src="./img/user.svg" alt="" />
                        <span className="header__text">Профиль</span>
                    </li>
                </Link>
            </ul>
        </header>
    )
}
export default Header