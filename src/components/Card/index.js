import React, { useEffect } from 'react'
import ContentLoader from "react-content-loader"
import './Card.scss'
function Card({
    imageUrl,
    title,
    price,
    favorite,
    purchased,
    onFavorite,
    onPlus,
    idx,
    id,
    added,
    Loading = false
}) {
    const [isAdded, setIsAdded] = React.useState(added) // хуки кнопки добавить
    const [isFavorite, setIsFavorite] = React.useState(favorite) // хуки кнопки понравилось
    useEffect(() => {
        setIsFavorite(favorite)
    }, [favorite])
    useEffect(() => {
        setIsAdded(added)
    }, [added])
    const onClickPlus = () => {
        setIsAdded(!isAdded)// при виполнении функции записывает переменной isAdded противоположное значению
        onPlus({ imageUrl, title, price, favorite, purchased, isAdded, idx })
    }
    const onClickFavorite = () => {
        onFavorite({ isFavorite, id })
        setIsFavorite(!isFavorite) // при виполнении функции записывает переменной isFavorite противоположное значению

    }
    return (
        < div className="card" alt={`это ${added}`}>
            {Loading ?
                <ContentLoader
                    speed={2}
                    width={150}
                    height={187}
                    viewBox="0 0 150 187"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
                    <rect x="0" y="117" rx="3" ry="3" width="150" height="15" />
                    <rect x="0" y="136" rx="3" ry="3" width="93" height="15" />
                    <rect x="0" y="163" rx="8" ry="8" width="80" height="24" />
                    <rect x="118" y="155" rx="8" ry="8" width="32" height="32" />
                </ContentLoader>

                : <>
                    <button onClick={onClickFavorite} className="card__btn-like">
                        <img src={isFavorite ? "./img/liked.svg" : "./img/unliked.svg"} alt="" />
                    </button>
                    <img src={imageUrl} alt="" className='card__img' />
                    <p>{title}</p>
                    <div className='card__item'>
                        <div className='card__price'>
                            <p>ЦЕНА:</p>
                            <b>{price} руб.</b>
                        </div>
                        <img onClick={onClickPlus} className='card__btn' src={isAdded ? "./img/btn-checked.svg" : "./img/btn-plus.svg"} alt=""></img>
                    </div>
                </>}
        </div >
    )
}
export default Card