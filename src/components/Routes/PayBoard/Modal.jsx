import React from 'react'

//const featuredProducts = ['https://res.cloudinary.com/pozters/image/upload/w_350/v1531312884/prod_uploads/qdK8393G69QVD6M',
//                          'https://media-cdn.tripadvisor.com/media/photo-s/0f/0b/ff/92/2x1-de-lunes-a-miercoles.jpg',
//                          'https://i.pinimg.com/736x/49/b7/40/49b7401bba9716b434e38877adc8048f.jpg'];

//let count = 0;

const Modal = ({showModal, setShowModal, idResto, idTable}) => {
  return (
  <>
  {showModal ?
    (<div className="fixed inset-0 bg-gray-700 bg-opacity-75 pt-16">
      <div className='w-60 mx-auto'>
        <div className="w-60 h-60 bg-pink-800 rounded-3xl border-2 border-pink-700 mt-8 ">
          <img className="ml-10" src="https://media2.giphy.com/media/1gQwNktlzyKsje8hYT/giphy.gif?cid=790b7611eecec2c3c468a85a3d4879aebd1842028814a3b2&rid=giphy.gif&ct=s"  width="160" alt="" />
            <h1 className='modal-content text-xl text-red-50 font-bold -mt-4'>Wait at Table, please.</h1>
          <button onClick={() => setShowModal(prev => !prev)} className="bg-red-500 rounded-xl mt-4 w-20 h-8 text-red-50 text-lg text-center">Cancel</button>
        </div>
      </div>
    </div>) : null}
  </>
  )
}

export default Modal
