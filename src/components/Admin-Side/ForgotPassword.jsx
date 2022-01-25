import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordRecover } from '../../redux/actions';
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import dingbellLogo from "../../img/dingbell_white.png"

const ForgotPassword = ()  => {
    
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");

		const [loading, setLoading] = useState(false);
		const override = `
					position: fixed;
					width: 100vw;
					height: 100vh;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #0008;
					z-index: 1000;
					transition: all .5s ease-out;
		`;

    const handleSubmitPasswordRecover = async (e) => {
      e.preventDefault();
			setLoading(true);
      let json = await dispatch(getPasswordRecover(email));
			setLoading(false);
      if (json) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Check your email to reset your password, 📧",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This email 📧 is not registered",
        });
      }
    }

    const bgimg = "https://houseofruthinc.org/wp-content/uploads/2019/04/dinner.jpg";

    return (
        <Fragment>
        {/* Primera opción */}
        <div className='h-screen flex bg-gray-bg1' style={{ 
            backgroundImage: `url(${bgimg})`,
            backgroundSize: "cover", 
          }} >
          	{loading && (<PulseLoader
						css={override}
						margin={10}
						size={30}
						color={"#E0125A"}
						loading={loading}
					/>)}
           <Link to="/">
          <div className="absolute flex text-sm text-white mb-1 mt-1">
           <img className="mx-auto"  src={dingbellLogo} width="40" alt="" />
            <h1 className="my-auto text-lg font-roboto font-semibold">DingBell</h1>
            </div>
           </Link> 
            <div className='inline-block mx-auto my-auto justify-items-center '>

            <div className='mx-2 bg-white rounded-lg border border-primary shadow-default py-10 px-16'>
                <h1 className='text-3xl font-medium text-primary mt-4 mb-4 text-center'>
                 Forgot your password?
                </h1>

                <p className='text-sm text-primary mb-8 text-gray-500'>
                 Don't fret! Just type in your email<br/>
                 and we will send your new password!<br/>
                </p>

                <form >
                    <div>
                        <label htmlFor='email' className='font-semibold text-sm'>
                         Your Email ✉
                        </label>
                        <input
                            type='email'
                            className='mt-2 w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-2'
                            id='email'
                            placeholder='name@dingbell.com'
                            onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>

                    <div className='flex justify-center items-center mt-4'>
                        
                        <button
                            className='bg-green py-2 px-4 mb-4 text-sm text-white rounded bg-blue-500 border border-blue-500 focus:outline-none focus:border-blue-800 '
                                type='submit'
                                onClick={(e) => handleSubmitPasswordRecover(e)}
                                >
                            Send password
                        </button>
        
                    </div>
            
                <Link to={`/resto/login`}>
                  <div className='flex justify-center'>
                    <img src="https://img.icons8.com/ios/50/4299e1/move-left.png" width="30" alt="" />
                    
                    <a className="py-2 px-4 text-blue-500" href="/#">Back to Login</a>
                  </div>
                </Link>

                </form>
            </div>
            </div>
        </div>

        {/* Segunda opción */}
        {/* <div className='h-screen flex bg-gray-bg1' style={{ 
            backgroundImage: `url(${bgimg})`,
            backgroundSize: "cover", 
          }} >

            <div className='inline-block mx-auto my-auto justify-items-center'>


            <div className='mx-2 bg-white rounded-lg border border-primary shadow-default py-10 px-16'>
            <img className='w-2/5 ml-20' src="https://img.icons8.com/fluency/96/000000/lock-2.png" width="80" alt="" />
                <h1 className='text-3xl font-medium text-primary mb-8 text-center'>
                 Reset your password.
                </h1>


                <form >
                    <div>
                        <label htmlFor='email' className='font-semibold text-sm'>
                         Your Email
                        </label>
                        <input
                            type='email'
                            className='mt-2 w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-2'
                            id='email'
                            placeholder='name@dingbell.com'
                            
                            />
                    </div>

                    <div className='flex justify-center items-center mt-4'>
                        
                        <button
                            className='bg-green py-2 px-4 text-sm text-white rounded bg-blue-500 border border-blue-500 focus:outline-none focus:border-blue-800 '
                                type='submit'
                                >
                            Reset password
                        </button>
        
                <Link to={`/resto/login`}>
                    <a className="py-2 px-4 text-blue-500" href="#">Back to Login</a>
                </Link>

                    </div>
            

                </form>
            </div>
            </div>
        </div> */}
        </Fragment>
    )
}

export default ForgotPassword;
