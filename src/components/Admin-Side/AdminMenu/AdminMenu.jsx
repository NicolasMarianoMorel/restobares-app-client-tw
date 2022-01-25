import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLabels,
  getCategories,
} from "../../../redux/actions";
import Select from "react-select";
import BackButton from "../BackButton";
import LogoutButton from "../Navbar/LogoutButton.jsx";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";
import { inputValidator, postMenu } from "../../../redux/actions";
import { /*useNavigate,*/ useParams } from "react-router-dom";
import Cookies from "js-cookie";

const AdminMenu = () => {
  const dispatch = useDispatch();
  const { idResto } = useParams();
  let tokenAdmin = Cookies.get("token-admin");
  const labels = useSelector((state) => state.labels);
  const categories = useSelector((state) => state.categories);
  const [input, setInput] = useState({
    name: "",
    price: "",
    detail: "",
    image: "",
    CategoryId: "",
    id_label: [],
    DiscountId: null,
  });
  const [reactSelectInput, setReactSelectInput] = useState({
    categorySelector: "",
    labelsSelector: "",
  });

  const [errors, setErrors] = useState({});
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

  let options = [];
  let optionsCategories = [];

  for (var i = 0; i < labels.length; i++) {
    let eachOption = {
      value: labels[i].id,
      label: labels[i].name,
    };
    options.push(eachOption);
  }
  for (var j = 0; j < categories.length; j++) {
    let eachOption = {
      value: categories[j].id,
      label: categories[j].name,
    };
    optionsCategories.push(eachOption);
  }

  function handleInputChanges(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      inputValidator({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleLabelSelection(e) {
    let labelsSelected = e.map((label) => label.value);
    setInput({
      ...input,
      id_label: labelsSelected,
    });
    setReactSelectInput({
      ...reactSelectInput,
      labelsSelector: e,
    });
  }

  //const logoutCode = Cookies.get("logout-code");
  
  //const navigate = useNavigate()

  //const handleLogOut = async () => {
  //  await dispatch(logout(logoutCode));
  //  Cookies.remove('token-admin');
  //  Cookies.remove('token-staff');
  //  Cookies.remove('logout-code');
  //  navigate('/resto/login');
  //}

  function handleCategorySelection(e) {
    setInput({
      ...input,
      CategoryId: e.value,
    });
    setReactSelectInput({
      ...reactSelectInput,
      categorySelector: e,
    });
    setErrors(
      inputValidator({
        ...input,
        CategoryId: e.value,
      })
    );
  }

  var validExt = ".png, .jpeg, .jpg, .PNG, .JPEG, .JPG";
  function handleImageSelection(e) {
    var filePath = e.target.value;
    var getFileExt = filePath
      .substring(filePath.lastIndexOf(".") + 1)
      .toLowerCase();
    var pos = validExt.indexOf(getFileExt);
    if (pos < 0) {
      // alert("This file is not allowed, please upload a valid file.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This file is not allowed, please upload a valid file.",
      });
      setInput({
        ...input,
        image: "",
      });
      e.target.value = null;
      return false;
    } else {
      imageSizeValidate(e.target);
      return true;
    }
  }
  var maxSizeImage = "950";
  function imageSizeValidate(eTarget) {
    if (eTarget.files && eTarget.files[0]) {
      var fsize = eTarget.files[0].size / 1000;
      if (fsize > maxSizeImage) {
        // alert('Maximum file size is ' + maxSizeImage + 'KB, This file size is: ' + fsize + "KB");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Maximum file size is ${maxSizeImage}KB, This file size is: ${fsize.toFixed(
            0
          )}KB`,
        });
        setInput({
          ...input,
          image: "",
        });
        eTarget.value = null;
        return false;
      } else {
        encodeImageBase64(eTarget);
        return true;
      }
    }
  }

  function encodeImageBase64(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      // console.log('RESULT', reader.result)
      setInput({
        ...input,
        image: reader.result,
      });
      setErrors(
        inputValidator({
          ...input,
          image: reader.result,
        })
      );
    };

    reader.readAsDataURL(file);
  }

  // Getting labels and categories
  useEffect(() => {
    dispatch(getLabels());
    dispatch(getCategories());
  }, [dispatch]);


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

  const alert = async (e) => {
    e.preventDefault();
    setLoading(true); 
    await dispatch(postMenu(idResto, input, tokenAdmin));
    setLoading(false); 
    // console.log(json);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your menu has been sent",
      showConfirmButton: false,
      timer: 2000,
    });
    setInput({
      name: "",
      price: "",
      detail: "",
      image: "",
      CategoryId: "",
      id_label: [],
      DiscountId: null,
    });
    setReactSelectInput({
      categorySelector: "",
      labelsSelector: "",
    });
    document.getElementById("image").value = null;
  };

  const notAlert = (e) =>{
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "error",
      title: "All fields are required!",
      showConfirmButton: false,
      timer: 2000,
    });
  }
return (
  <div className="bg-gray-100 w-full h-full pb-36">
          	{loading && (<PulseLoader
						css={override}
						margin={10}
						size={30}
						color={"#E0125A"}
						loading={loading}
					/>)}
      <nav className="sticky top-0 flex flex-row w-full justify-between bg-pink-700 h-12">
        <BackButton />
        <div className="flex flex-row justify-center text-white text-2xl mx-4 w-20 mt-2  md:w-32">
          <h1>Create&nbsp;Menus</h1>
        </div>
        <LogoutButton />
      </nav>
      <div className="my-2">
      <h1 className="m-2 text-lg font-bold">Add your Menu</h1>

      <form className="w-96 mx-auto h-auto">
        <input
          type="text"
          name="name"
          maxLength="50"
          className="text-center block mb-4 w-full px-5 py-3 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none" /* form-control */
          placeholder="Enter Name"
          value={input.name}
          onChange={(e) => handleInputChanges(e)}
          />

        <input
          id="price"
          type="number"
          name="price"
          min="1"
          maxLength="4"
          value={input.price}
          //  oninput="validity.valid||(value=value.replace(/\D+/g, 0))"
          // pattern='^[0-9]+'
          //  onKeyUp={Number(input.price) < 0 ? Number(input.price) * -1 : input.price}
          className="text-center block mb-4 w-full px-5 py-3 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
          placeholder="Enter Price"
          //  value={Number(input.price)}
          onChange={(e) => handleInputChanges(e)}
          />

        <input
          type="text"
          name="detail"
          maxLength="140"
          className="text-center block mb-4 w-full px-5 py-3 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
          placeholder="Enter Details"
          value={input.detail}
          onChange={(e) => handleInputChanges(e)}
          />
        <label>
          Select your product image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          className="block mb-4 w-full px-5 py-3 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
          accept="image/*"
          onChange={(e) => handleImageSelection(e)}
          />

          <img src={input.image} alt="Menu Preview" 
          	className="mx-auto my-6 rounded-lg shadow-lg object-cover" width="300" height="200"/>
        <Select
          options={optionsCategories}
          value={reactSelectInput.categorySelector}
          onChange={(e) => handleCategorySelection(e)}
          placeholder="Choose your category..."
          className="pb-3"
          />
        <Select
          isMulti
          options={options}
          value={reactSelectInput.labelsSelector}
          onChange={(e) => handleLabelSelection(e)}
          placeholder="Choose your labels..."
          />
        {Object.keys(errors).length > 0 || input.name === "" ?
        
        <button
        type="submit"
        onClick={notAlert}
        className="text-white bg-gray-600 mt-4  w-32 px-4 py-2 rounded-3xl text-sm font-semibold"
        >
          Send Menu
        </button>:
        <button
          type="submit"
          onClick={alert}
          className="mt-4 bg-pink-700 w-32 px-4 py-2 rounded-3xl text-sm text-white font-semibold each-in-out "
        >
          Send Menu
        </button> 
        }
      </form>
      </div>
    </div>
  );
};

export default AdminMenu;
