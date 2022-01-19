import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductsByEditName } from "../../../redux/actions";
import BackButton from "../BackButton";
import LogoutButton from "../Navbar/LogoutButton.jsx";
import { Switch } from "@headlessui/react";
import { PulseLoader } from "react-spinners";
import {
  deleteProduct,
  getMenu,
  logout,
  putAvailableProduct,
} from "../../../redux/actions";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const EditMenu = () => {
  const dispatch = useDispatch();
  const { idResto } = useParams();
  const tokenAdmin = Cookies.get("token-admin");
  const tokenStaff = Cookies.get("token-staff");
  const menu = useSelector((state) => state.menus.menuAdmin);
  const logoutCode = Cookies.get("logout-code");

	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const override = `
				position: fixed;
				display: flex;
				margin-top: 100px;
				justify-content: center;
				width: 100vw;
				z-index: 1000;
				transition: all .5s ease-out;
	`;

  const handleLogOut = async () => {
    await dispatch(logout(logoutCode));
    Cookies.remove("token-admin");
    Cookies.remove("token-staff");
    Cookies.remove("logout-code");
    navigate("/resto/login");
  };

  const handlePutAvailableProduct = async (idProduct) => {
    if (tokenAdmin || tokenStaff) {
      await dispatch(
        putAvailableProduct(idResto, idProduct, tokenAdmin || tokenStaff)
      );
      dispatch(getMenu(idResto, 1));
    }
  };

  const handleDeleteProduct = async (idProduct) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      allowOutsideClick: false,
    }).then( async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteProduct(idResto, idProduct, tokenAdmin));
        await dispatch(getMenu(idResto, 1));
        Swal.fire(
          'Deleted!',
          'Your menu has been deleted.',
          'success'
        )
      }
    })
  };

  useEffect(async() => {
    setLoading(true);
    await dispatch(getMenu(idResto, 1));
    setLoading(false);
  }, [dispatch, idResto]);

 //searchbar
 
  const [search, setSearch] = useState("");

  function onChangeD (e){
    dispatch(getProductsByEditName(e.target.value))
    setSearch(e.target.value)
  }

  function ClearInput(e) {
    e.preventDefault();
    setSearch("");
    dispatch(getProductsByEditName(""))
  }


  return (
    <Fragment>
      <div>
        <nav className="flex justify-between bg-pink-700 h-12">
          <BackButton />
          
          {/* searchbar */}
          <div className="inline-block shadow-lg text-lg">
            <div className="">
                {search === "" ? <button className="relative float-right mt-3 right-9" type="submit" onClick={ClearInput}>
                  <img
                    src="https://img.icons8.com/ios/50/be185d/search--v1.png"
                    width="24"
                    className="ml-1"
                    alt=""
                  />
                </button> : 
                <button className="relative float-right mt-3 right-9" type="submit" onClick={ClearInput}>
                <img
                  src="https://img.icons8.com/ios-filled/50/be185d/delete-sign.png"
                  width="24"
                  className="ml-1"
                  alt=""
                />
              </button> 
                }
                <input
                  className="truncate text-pink-700 pill w-48 flex-grow-1 pb-1 "
                  type="text"
                  onChange={onChangeD}
                  value={search}
                  alt=""
                />
            </div>
          </div>
          <LogoutButton/>
        </nav>
      </div>


      {menu.length ?
        menu.map((product) => {
          let productDetailShortened;
          if (product.detail.length > 60) {
            productDetailShortened = product.detail.slice(0, 60) + "...";
          } else {
            productDetailShortened = product.detail;
          }

          return (
            <div
              key={product.id}
              className={`flex pt-2 pb-4 mx-2  mt-2 border-2 rounded-md shadow-lg border-opacity-50
                            ${
                              !product.available
                                ? "border-gray-700 bg-gray-200"
                                : "border-pink-700"
                            } `}
            >
              <div className="w-20 h-20 mt-1 ml-1 flex-shrink-0 bg-white rounded-full ">
                <img
                  className={`max-h-full max-w-full min-h-full min-w-full object-cover rounded-full
                            ${
                              !product.available
                                ? " opacity-40 mix-blend-multiply"
                                : ""
                            }
                            `}
                  src={product.image}
                  alt=""
                />
              </div>
              <div className="float-left align-baseline text-left inline-block h-4 w-full">
                <div className=" inline-block w-full align-bottom">
                  <p
                    className={`inline-block ml-2  text-truncate text-sm font-bold
                              ${
                                !product.available
                                  ? " text-gray-600"
                                  : "text-black"
                              }
                            `}
                  >
                    {product.name}
                  </p>
                  {!tokenAdmin ? (
                    <button className="inline-block px-2 text-white  font-semibold float-right mr-2 mb-1 text-sm bg-gray-500 cursor-not-allowed rounded-xl">
                      Delete
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="inline-block px-2 text-white  font-semibold float-right mr-2 mb-1 text-sm bg-pink-500  rounded-xl"
                    >
                      Delete
                    </button>
                  )}
                  {!tokenAdmin ? (
                    <button className="px-2 text-white inline-block  font-semibold float-right mr-2 mb-1 text-sm bg-gray-500 cursor-not-allowed rounded-xl">
                      Edit
                    </button>
                  ) : (
                    <Link
                      to={`/resto/${idResto}/resto-home/editmenu/${product.id}`}
                      body={product}
                    >
                      <button className="px-2 text-white inline-block  font-semibold float-right mr-2 mb-1 text-sm bg-pink-500 rounded-xl">
                        Edit
                      </button>
                    </Link>
                  )}

                  <p className=" font-semibold inline-block float-right mr-6 text-sm">
                    {product.price}
                  </p>
                  <p className=" font-semibold inline-block float-right text-left mr-1 text-sm ">
                    {" "}
                    ${" "}
                  </p>
                </div>
                <hr
                  className={` border-1  mx-2
                              ${
                                !product.available
                                  ? "border-gray-700"
                                  : "border-pink-500"
                              }
                            `}
                />

                <div className="float-right h-6 mr-3 mt-1">
                  {/* Boton switch - ui */}
                  <Switch
                    checked={product.available}
                    onChange={() => handlePutAvailableProduct(product.id)}
                    // onChange={handlePutAvailableProduct}
                    className={`${
                      product.available ? "bg-pink-500" : "bg-gray-400"
                    } relative inline-flex items-center h-6 rounded-full w-11 mt-8`}
                  >
                    <span
                      className={`${
                        product.available ? "translate-x-6" : "translate-x-1"
                      } inline-block w-4 h-4 transform bg-white rounded-full`}
                    />
                  </Switch>
                  {/* termina boton switch - ui */}
                </div>

                <div className="float-right h-6 mr-4 text-black font-semibold text-sm mt-9">
                  <p>Available:</p>
                </div>

                <p
                  className={`w-9/12 ml-2 text-truncate text-base
                              ${
                                !product.available
                                  ? "text-gray-600"
                                  : "text-black"
                              }
                            `}
                >
                  {productDetailShortened}
                </p>
              </div>
            </div>
          );
        }) 
        : loading 
        	? (

					<PulseLoader
						css={override}
						margin={10}
						size={30}
						color={"#D0124A"}
						loading={loading}
					/> )
        	: (<div className=" lg:px-6  bg-gray-100 border-gray-400 border-2 border-opacity-50 rounded-md mt-2 mx-2 text-center">
              <div className='h-full w-full flex flex-row text-center'>
                <div className='w-full'>
                  <div className=" bg-gray-200 mx-4 my-2 py-1 rounded-lg md:rounded-full text-base font-semibold lg:text-2xl">
                      <p>Does not match any results!</p>
                    </div>
                </div>
              </div>
                <div className='h-full w-full flex flex-row text-center'>
                <div className='w-full'>
                    <div className="mx-4 my-2 py-1 rounded-lg md:rounded-full text-base lg:text-2xl">
                      <p>We can't seem to find any products that match your search</p>
                    </div>
                </div>
              </div>
            </div>
        )
      }
    </Fragment>
  );
};

export default EditMenu;
