import React, { Fragment } from 'react';
import { Link, useParams } from "react-router-dom";
import BackButton from '../BackButton';
import LogoutButton from '../Navbar/LogoutButton';

const Account = () => {

    const { idResto } = useParams();

    return (
        <Fragment>
        <nav className="flex flex-row w-screen justify-between bg-pink-700 h-12">
          <BackButton/>
           <div className="flex flex-row justify-center text-black text-2xl mx-4 w-20 mt-2  md:w-32"> 
             <h1>Account</h1>
           </div>
          <LogoutButton/>
        </nav>
         <div className="grid-rows-5 grid-flow-col gap-5 p-3">
            <Link to={`/resto/${idResto}/resto-home/account/accountsettings`}>
             <div className="col-span-3 text-center px-3 py-3 mb-4 pb-5 border border-gray-300 hover:bg-gray-300 cursor-pointer rounded-xl">
              <div className="float-left">
                <img
                  src="https://img.icons8.com/flat-round/64/000000/settings--v1.png"
                  width="38"
                  alt=""
                />
                
              </div>
              <div className="inline-flex items-center">
                <h1 className="text-lg font-bold float-left">Account Setting</h1>
              </div>
             </div>
            </Link>

            {/* <Link to={`/resto/${idResto}/resto-home/account/logotype`}>
             <div className="col-span-3 text-center px-3 py-3 mb-4 pb-5 border border-gray-300 hover:bg-gray-300 cursor-pointer rounded-xl">
              <div className="float-left">
                <img
                  src="https://img.icons8.com/color/48/000000/image.png"
                  width="38"
                  alt=""
                />
              </div>
              <div className="inline-flex items-center">
                <h1 className="text-lg font-bold float-left">Logotype</h1>
              </div>
             </div>
            </Link> */}

         </div>
        </Fragment>
    )
}

export default Account;
