import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Modal from './Modal'



const PayBoard = () => {

  const { cart }= useSelector((state) => state);
  const { idResto, idTable } = useParams();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  }

  var totalPrice = 0
	// esto calcula el precio de las ordenes confirmadas
  for (var i = 0; i < cart.currentOrder.length; i++) {

    var order = cart.currentOrder[i];

    totalPrice = totalPrice + (order.quantity * order.price);
  }

  return (
    <div className='py-12'>
      <div className='nav-bar pb-2'>
      <button className='float-right mr-2 button'>
			<Link to={`/resto/${idResto}/table/${idTable}/order`}>
				<img src="https://img.icons8.com/external-photo3ideastudio-lineal-photo3ideastudio/64/aa0020/external-food-app-food-delivery-photo3ideastudio-lineal-photo3ideastudio.png" width="24" className='ml-1' alt=""/>
			</Link>
			</button>
      </div>

      <div className="p-4 inline-flex">
			 <div className="w-full bg-pink-700 px-4 py-2 rounded-3xl text-2xl text-white font-semibold each-in-out inline-flex">
       {'Total a Pagar: $'}{totalPrice}
       </div>
      </div>
     
      <div className="p-4 inline-flex">
      <button onClick={openModal} className="bg-pink-700 text-lg font-semibold text-white px-2 py-2 w-40 rounded-full hover:bg-pink-900 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all m-2">
        Pagar en Mesa
      </button>

    <Link to={`/resto/${idResto}/table/${idTable}/payment`}>
      <button className="bg-pink-700 text-lg font-semibold text-white px-2 py-2 w-40 rounded-full hover:bg-pink-900 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all m-2">
        Pagar con Tarjeta
      </button>
    </Link>
    </div>

      <Modal showModal={showModal} setShowModal={setShowModal} />

    </div>
  )
}

export default PayBoard
