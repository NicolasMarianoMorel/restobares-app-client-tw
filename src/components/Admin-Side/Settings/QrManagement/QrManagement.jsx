import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getQrCode, getTables } from "../../../../redux/actions";
import BackButton from "../../BackButton";
import Swal from "sweetalert2";
import LogoutButton from "../../Navbar/LogoutButton";
import Cookies from "js-cookie";

const QrManager = () => {
  const { qrCode } = useSelector((state) => state);

  // Bring the amount of tables the restaurant has
  const { tables } = useSelector((state) => state);
  const { idResto } = useParams();
  const [oneTable, setOneTable] = useState(0);
  const [firstTable, setFirstTable] = useState(1);
  const [lastTable, setLastTable] = useState(Math.min(9,tables.length));

  const dispatch = useDispatch();
  const tokenAdmin = Cookies.get("token-admin");
  const tokenStaff = Cookies.get("token-staff");
  var token = tokenAdmin || tokenStaff;

  useEffect(() => {
    async function fetchData() {
    	if(!tables.length) {
    		await dispatch(getTables(idResto, token))
    		setLastTable(Math.min(9,tables.length))
    	}
    }
    fetchData();
  }, [idResto,dispatch,tables.length,token])

  const generateOneQr = async (e) => {
    e.preventDefault();
    let oneOnlyQr = [];
    oneOnlyQr.push(oneTable);
    await dispatch(getQrCode(idResto, oneOnlyQr));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your QR has been generated",
      showConfirmButton: false,
      timer: 1500,
    });
    //console.log(qrCode);
  };

  const generateVariousQr = async (e) => {
    e.preventDefault();
    let tablesArray = [];
    tablesArray.push(firstTable);
    tablesArray.push(lastTable);
    await dispatch(getQrCode(idResto, tablesArray));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your QRs have been generated",
      showConfirmButton: false,
      timer: 3000,
    });
  };

  // RESIZE WINDOW LOGIC
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  const notAlert = (e) => {
    e.preventDefault();
    if (!oneTable) {
    	Swal.fire({
    	  position: "center",
    	  icon: "error",
    	  title: "You must specify the table number.",
    	  showConfirmButton: false,
    	  timer: 4000,
    	});
    }
    else if (!firstTable || !lastTable) {
    	Swal.fire({
    	  position: "center",
    	  icon: "error",
    	  title: "You must specify both table numbers.",
    	  showConfirmButton: false,
    	  timer: 4000,
    	});
    }
    else if (firstTable >= lastTable) {
    	Swal.fire({
    	  position: "center",
    	  icon: "error",
    	  title: "The first table number must be lower than the last table number.",
    	  showConfirmButton: false,
    	  timer: 4000,
    	});
    }
  };

  return (
    <div>
      <nav className="sticky top-0 flex flex-row w-screen justify-between bg-pink-700 h-12">
        <BackButton />
        <div className="flex flex-row justify-center text-white text-2xl mx-4 w-20 mt-2  md:w-32">
          <h1>QR&nbsp;Management</h1>
        </div>
        <LogoutButton/>
      </nav>

      <h1 className="m-5 text-lg font-bold">Select your Table (1 to {tables.length})</h1>

      <form className="w-96 inline-block">
        <input
          type="number"
          name="oneTable"
          min="1"
          max={tables.length}
          onChange={(e) => {
          	setOneTable( Math.min( Math.max(0,e.target.value), tables.length ) )
          	e.target.value = Math.min( Math.max(0,e.target.value), tables.length )
          }}
          className="text-center block mb-4 w-full px-5 py-3 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none" /* form-control */
          placeholder="Enter value"
        />
        {oneTable===0 || oneTable > tables.length ? (
          <button
            type="submit"
            onClick={notAlert}
            disabled
            className="text-white bg-gray-600 mt-2 mb-5 w-32 px-4 py-2 rounded-3xl text-sm font-semibold"
          >
            Generate QR
          </button>
        ) : (
          <button
            type="submit"
            onClick={(e) => generateOneQr(e)}
            className="mt-2 mb-5 bg-pink-700 w-32 px-4 py-2 rounded-3xl text-sm text-white font-semibold each-in-out"
          >
            Generate QR
          </button>
        )}
        <h1 className="mt-5 text-lg font-bold">
          You can generate QR Codes for several tables:
        </h1>

        <input
          type="number"
          name="firstTable"
          /* value={firstTable} */
          min="1"
          max={tables.length}
          onChange={(e) => setFirstTable(Math.min( Math.max(1,e.target.value ), tables.length ))}
          className="text-center my-4 w-1/3 px-5 py-3 mx-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none" /* form-control */
          placeholder="From..."
        />
        <input
          type="number"
          name="lastTable"
          /* value={lastTable} */
          min={1}
          max={tables.length}
          onChange={(e) => setLastTable(Math.min( Math.max(1,e.target.value ), tables.length ))}
          className="text-center my-4 w-1/3 px-5 mx-2 py-3 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none" /* form-control */
          placeholder="To..."
        />
        {/*lastTable.length === 0 || firstTable.length === 0*/
        	firstTable >= lastTable || lastTable > tables.length ? (
          <button
            type="submit"
            onClick={notAlert}
            className="text-white bg-gray-600 mt-4 mb-10 w-32 px-4 py-2 rounded-3xl text-sm font-semibold"
          >
            Generate QRs
          </button>
        ) : (
          <button
            type="submit"
            onClick={(e) => generateVariousQr(e)}
            className="mt-4 mb-10 bg-pink-700 w-32 px-4 py-2 rounded-3xl text-sm text-white font-semibold each-in-out"
          >
            Generate QRs
          </button>
        )}


        {qrCode.length ? (
          <Link to={`/resto/${idResto}/resto-home/qrmanager/qrs`}>
            <div className="col-span-1 text-center px-3 py-3 mb-4 pb-5 border border-gray-300 hover:bg-gray-300 cursor-pointer rounded-xl">
              <div className="float-left">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/qr-code--v1.png"
                  width="38"
                  alt=""
                />
              </div>
              <div className="inline-flex items-center">
                <h1 className="text-lg font-bold float-left">Generated QRs</h1>
              </div>
            </div>
          </Link>
        ) : (
          <div></div>
        )}
      </form>
    </div>
  );
};

export default QrManager;
