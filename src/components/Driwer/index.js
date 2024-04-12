import React, { useState } from "react"
import './Driwer.scss'

function Driwer({ removeCart, items = [], onRemove, setItems, onPurchas }) {
    const [orderComplete, setIsOrderComplete] = useState(false)
    const onClickOrder = () => {
        setIsOrderComplete(true)
        onPurchas(items)
        setItems([])
    }
    const getItemSum = () => {
        const sumCart = items.reduce((acc, curr) => parseInt(acc) + parseInt(curr.price), 0);
        return sumCart
    }
    return (
        <div className="driwer">
            <div className="driwerContainer">
                <div className="flex">
                    <div className="driwerTitle">Корзина</div>
                    <img onClick={removeCart} src="./img/btn-remove.svg" alt="remove" className="cartItemBtn" />
                </div>
                {items.length > 0 ?
                    <>
                        <div className="cart">
                            {items.map((obj, idx) =>
                                <div key={idx} className="cartItem">
                                    <img className='cartItemImg' src={obj.imageUrl} alt="sneakers" />
                                    <div className="caetItemBody">
                                        <p>{obj.title}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img onClick={() => onRemove(obj.id)} src="./img/btn-remove.svg" alt="remove" className="cartItemBtn" />
                                </div>

                            )}
                        </div>
                        <div className="driwerBottom">
                            <div className="driwewrPrice">
                                <span>Итого: </span>
                                <div></div>
                                <b>{`${getItemSum()} руб.`} </b>
                            </div>
                            <div className="driwewrPrice">
                                <span>Налог 5%: </span>
                                <div></div>
                                <b>{`${getItemSum() * 0.05} руб.`} </b>
                            </div>
                            <button onClick={onClickOrder} className="driwerBtn">Оформить заказ</button>
                        </div>
                    </>
                    :
                    <div className="cartEmpty">
                        <img src={!orderComplete ? "./img/empty-cart.jpg" : "./img/complete-order.jpg"} alt="emptyImg" className="emptyImg" />
                        <h3>{!orderComplete ? 'Корзина пустая' : "Заказ оформлен"}</h3>
                        <p> {!orderComplete ? "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ." : "Ваш заказ #18 скоро будет передан курьерской доставке"}</p>
                        <button onClick={removeCart} className="emptyBtn">Вернуться назад</button>
                    </div>

                }
            </div>
        </div >
    )
}
export default Driwer