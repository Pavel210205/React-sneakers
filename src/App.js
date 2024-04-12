import React from 'react';
import { Route, Link } from 'react-router-dom'
import axios from 'axios'
import Card from './components/Card/index.js'
import Header from './components/Header/index.js';
import Driwer from './components/Driwer/index.js';


function App() {
  let [cartOpened, setCartOpened] = React.useState(false) // хуки кнопки корзины
  let [items, setItems] = React.useState([]) // хуки главного товара
  let [purchased, setPurchased] = React.useState([])
  let [searchValue, setSearchValue] = React.useState('') // хуки поиска
  let [cartItems, setcartItems] = React.useState([]) // хуки товара корзины
  let [isLoading, setIsLoading] = React.useState(true) // хуки загрузки


  React.useEffect(() => { // принимаем данные и useEffect говорим, что после рендеринга(любого) больше не запрашиваем
    async function fetchData() {
      try {
        await axios.get('https://660c182b3a0766e85dbd6511.mockapi.io/cart').then((res) => {
          setcartItems(res.data)
        })
        await axios.get('https://660c182b3a0766e85dbd6511.mockapi.io/itams').then((res) => {
          setItems(res.data)
          setIsLoading(false) // после загрузки будем показывать карты
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])


  const onAddToCart = async (obj) => { // добавляет карты в массив который выводится в корзине
    try {
      if (obj.isAdded) {
        let cloneCart = cartItems.filter(item => Number(item.idx) === Number(obj.idx))
        await axios.delete(`https://660c182b3a0766e85dbd6511.mockapi.io/cart/${cloneCart[0].id} `)
        setcartItems(prev => prev.filter(item => Number(item.idx) !== Number(obj.idx)))
      } else {
        obj.id = cartItems.length + 1;
        await axios.post('https://660c182b3a0766e85dbd6511.mockapi.io/cart', obj)
        setcartItems(prev => [...prev, obj])
      }

    } catch (error) {
      console.log(error)
    }
  }

  const onRemoveitem = (id) => {
    axios.delete(`https://660c182b3a0766e85dbd6511.mockapi.io/cart/${id}`)
    setcartItems((prev) => prev.filter(item => item.id !== id))
  }

  const onFavorite = (obj) => {
    axios.put(`https://660c182b3a0766e85dbd6511.mockapi.io/itams/${obj.id}`, {
      favorite: !obj.isFavorite
    })
  }
  const onPurchased = (arr) => {
    setPurchased(prev => [...prev, ...arr])
  }

  const renderPurchised = () => {
    const faceArr = ['', '', '', '', '', '', '', '', '', ''];
    return (isLoading ? faceArr : purchased).map((item, id) =>
      <Card
        key={id}
        onFavorite={(obj) => { onFavorite(obj) }}
        onPlus={(obj) => { onAddToCart(obj) }}
        {...item}
        added={cartItems.some(obj => Number(obj.idx) === Number(item.idx))}
        Loading={isLoading}
      />
    )
  }


  const onChengeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }
  const renderItems = () => {
    const filtredItems = items.filter((item) => item.title.toUpperCase().includes(searchValue.toUpperCase()));
    const faceArr = ['', '', '', '', '', '', '', '', '', ''];
    return (isLoading ? faceArr : filtredItems).map((item, id) =>
      <Card
        key={id}
        onFavorite={(obj) => { onFavorite(obj) }}
        onPlus={(obj) => { onAddToCart(obj) }}
        {...item}
        added={cartItems.some(obj => Number(obj.idx) === Number(item.idx))}
        Loading={isLoading}
      />
    )
  }
  let filtredItems = items.filter((item) => item.favorite === true);


  const renderFavorits = () => {
    const faceArr = ['', '', '', '', '', '', '', '', '', ''];
    return (isLoading ? faceArr : filtredItems).map((item, id) =>
      <Card
        key={id}
        onFavorite={(obj) => { onFavorite(obj) }}
        onPlus={(obj) => { onAddToCart(obj) }}
        {...item}
        added={cartItems.some(obj => Number(obj.idx) === Number(item.idx))}
        Loading={isLoading}
      />
    )
  }


  return (
    <div className="wrapper">
      {cartOpened && <Driwer
        removeCart={() => { setCartOpened(false) }}
        items={cartItems}
        onRemove={onRemoveitem}
        setItems={setcartItems}
        onPurchas={(arr) => { onPurchased(arr) }}
      />}
      <Header
        onClickCart={() => { setCartOpened(true) }}
        items={cartItems}
      />

      <Route path='/' exact>
        <div className="content container">
          <div className="content__top">
            <h1>{(!searchValue) ? "Все кроссовки" : `Поиск по запросу - ${searchValue}`}</h1>
            <div className="search">
              {searchValue && <img onClick={() => { setSearchValue('') }} className='searchRemove' src="./img/btn-remove.svg" alt="search" />}
              <input value={searchValue} onChange={onChengeSearchInput} id='search' name='search' type="text" className="search__input" placeholder='поиск...' />
              <img alt=' ' src='./img/search.svg' className="search__btn"></img>
            </div>

          </div>
          <div className="content__body">
            {renderItems()}
          </div>
        </div>
      </Route>

      <Route path='/favorite'>
        <div className="content container">
          <div className="content__top"><h1>Мои закладки</h1> </div>
          <div className="content__body">
            {
              filtredItems.length > 0 ? renderFavorits() :
                <div className='EmptyContainer'>
                  <div className="cartEmpty">
                    <img src="./img/notFavorite.png" alt="emptyImg" className="emptyImg" />
                    <h3>Закладок нет {':('}</h3>
                    <p>Вы ничего не добавляли в закладки</p>
                    <Link to="/" >
                      <button className="emptyBtn">Вернуться назад</button>
                    </Link>
                  </div>
                </div>
            }
          </div>
        </div>
      </Route>

      <Route path='/purchised'>
        <div className="content container">
          <div className="content__top"><h1>Мои покупки</h1> </div>
          <div className="content__body">
            {purchased.length > 0 ? renderPurchised() :
              <div className='EmptyContainer'>
                <div className="cartEmpty">
                  <img src="./img/notsakas.png" alt="emptyImg" className="emptyImg" />
                  <h3>У вас нет заказов</h3>
                  <p>Вы нищеброд?<br />Оформите хотя бы один заказ.</p>
                  <Link to="/" >
                    <button className="emptyBtn">Вернуться назад</button>
                  </Link>
                </div>
              </div>
            }
          </div>
        </div>
      </Route>

    </div>
  );
}

export default App;

