import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
     removeItemFromFavorites,
} from "../../features/user/userSlice";


import styl from "../../styles/Products.module.css";
import styles from "../../styles/Cart.module.css";
import {Link} from "react-router-dom";


const Cart = () => {
    const dispatch = useDispatch();
    const { favorites } = useSelector(({ user }) => user);


    const removeItem = (id) => {
        dispatch(removeItemFromFavorites(id));
    };

    return (
        <section className={styles.cart}>
            <h2 className={styles.title}>Your cart</h2>

            {!favorites.length ? (
                <div className={styles.empty}>Here is empty</div>
            ) : (
                <>
                    <div className={styles.list} style={{display: "flex", flexDirection: "row",
                        columnGap: "15px",flexWrap:"wrap"}}>
                        {favorites.map((item) => {
                            const { title, category,price, images,id,} = item;

                            return (
                                <Link to={`/products/${id}`} style={{width: "calc(100% / 5 - 14px)",position:"relative"}} className={styl.product} key={id}>
                                    <div
                                        className={styl.image}
                                        style={{ backgroundImage: `url(${images[0]})`,height: '215px'}}
                                    />
                                    <div className={styl.wrapper}>
                                        <h3 className={styl.title}>{title}</h3>
                                        <div className={styles.category}>{category.name}</div>
                                        <div className={styl.info}>
                                            <div className={styl.prices}>
                                                <div className={styl.price}>{price}$</div>
                                                <div className={styl.oldPrice}>
                                                    {Math.floor(price * 0.8)}$
                                                </div>
                                            </div>

                                            <div className={styl.purchases}>
                                                {Math.floor(Math.random() * 20 + 1)}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={styles.close}
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <svg className="icon-favorites">
                                            <use
                                                xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                                            />
                                        </svg>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </>
            )}
        </section>
    );
};

export default Cart;
