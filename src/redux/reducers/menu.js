import { ActionTypes } from "../constants";

const initialState = {
  // menu: [],
  // backupMenu: []
  // order: "default",
  // activeCategory: "all",
  menu: [
    {
      product_id: 1,
      product_name: "Hamburguesa",
      details: "Hola soy la descripción de tu platillo.",
      price: 10.00,
      img: "https://milrecetas.net/wp-content/uploads/2018/01/Hamburguesa-casera-con-tocineta-2.jpg",
      discount_id: 1,
      category_id: 1,
      labels: [1, 2, 3],
    },
    {
      product_id: 2,
      product_name: "Milanesa de pollo",
      details: "Hola soy la descripción de tu platillo.",
      price: 15.00,
      img: "https://saboryestilo.com.mx/wp-content/uploads/2019/09/recetas-superama-milanesa-de-pollo-600x300.jpg",
      discount_id: 2,
      category_id: 2,
      labels: [1, 2, 3],
    },
    {
      product_id: 3,
      product_name: "Tacos",
      details: "Hola soy la descripción de tu platillo.",
      price: 9.00,
      img: "https://i0.wp.com/www.cuboinformativo.top/wp-content/uploads/2020/10/comida-tipica-de-cancun.jpg?resize=600%2C300&ssl=1",
      discount_id: 3,
      category_id: 3,
      labels: [1, 2, 3],
    },
    {
      product_id: 4,
      product_name: "Pizza",
      details: "Hola soy la descripción de tu platillo.",
      price: 14.00,
      img: "https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2021/03/02201833/Pizza-Hut-Republica-Dominicana.jpg",
      discount_id: 4,
      category_id: 4,
      labels: [1, 2, 3],
    },
  {
      product_id: 5,
      product_name: "Empanadas",
      details: "Hola soy la descripción de tu platillo.",
      price: 20.00,
      img: "https://informaciongastronomica.com/wp-content/uploads/2019/01/empanada2.jpg",
      discount_id: 5,
      category_id: 5,
      labels: [1, 2, 3],
    },
    {
      product_id: 6,
      product_name: "Bandeja paisa",
      details: "Hola soy la descripción de tu platillo.",
      price: 18.00,
      img: "https://img1.wsimg.com/isteam/ip/9d354e1d-14a1-4160-9592-069c2b7e3474/Bandeja-Paisa.jpg/:/cr=t:12.5%25,l:0%25,w:100%25,h:75%25/rs=w:600,h:300,cg:true",
      discount_id: 6,
      category_id: 6,
      labels: [1, 2, 3],
    },
    {
			product_id: 7,
			product_name: "Fernet papá",
			details: "Hola soy la descripción de tu platillo.",
			price: 10.00,
			img: "https://pbs.twimg.com/media/B4iFFySIEAA8sf5.jpg",
			discount_id: 7,
			category_id: 7,
			labels: [1, 2, 3],
		  }
  ],
  backupMenu:[
    {
      product_id: 1,
      product_name: "Hamburguesa",
      details: "Hola soy la descripción de tu platillo.",
      price: 10.00,
      img: "https://milrecetas.net/wp-content/uploads/2018/01/Hamburguesa-casera-con-tocineta-2.jpg",
      discount_id: 1,
      category_id: 1,
      labels: [1, 2, 3],
    },
    {
      product_id: 2,
      product_name: "Milanesa de pollo",
      details: "Hola soy la descripción de tu platillo.",
      price: 15.00,
      img: "https://saboryestilo.com.mx/wp-content/uploads/2019/09/recetas-superama-milanesa-de-pollo-600x300.jpg",
      discount_id: 2,
      category_id: 2,
      labels: [1, 2, 3],
    },
    {
      product_id: 3,
      product_name: "Tacos",
      details: "Hola soy la descripción de tu platillo.",
      price: 9.00,
      img: "https://i0.wp.com/www.cuboinformativo.top/wp-content/uploads/2020/10/comida-tipica-de-cancun.jpg?resize=600%2C300&ssl=1",
      discount_id: 3,
      category_id: 3,
      labels: [1, 2, 3],
    },
    {
      product_id: 4,
      product_name: "Pizza",
      details: "Hola soy la descripción de tu platillo.",
      price: 14.00,
      img: "https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2021/03/02201833/Pizza-Hut-Republica-Dominicana.jpg",
      discount_id: 4,
      category_id: 4,
      labels: [1, 2, 3],
    },
  {
      product_id: 5,
      product_name: "Empanadas",
      details: "Hola soy la descripción de tu platillo.",
      price: 20.00,
      img: "https://informaciongastronomica.com/wp-content/uploads/2019/01/empanada2.jpg",
      discount_id: 5,
      category_id: 5,
      labels: [1, 2, 3],
    },
    {
      product_id: 6,
      product_name: "Bandeja paisa",
      details: "Hola soy la descripción de tu platillo.",
      price: 18.00,
      img: "https://img1.wsimg.com/isteam/ip/9d354e1d-14a1-4160-9592-069c2b7e3474/Bandeja-Paisa.jpg/:/cr=t:12.5%25,l:0%25,w:100%25,h:75%25/rs=w:600,h:300,cg:true",
      discount_id: 6,
      category_id: 6,
      labels: [1, 2, 3],
    },
    {
			product_id: 7,
			product_name: "Fernet papá",
			details: "Hola soy la descripción de tu platillo.",
			price: 10.00,
			img: "https://pbs.twimg.com/media/B4iFFySIEAA8sf5.jpg",
			discount_id: 7,
			category_id: 7,
			labels: [1, 2, 3],
		  }
  ]
};

function menu(state = initialState, action) {

  const backupMenu = state.backupMenu;
  console.log("backup menu ",backupMenu)

  if (action.type === ActionTypes.GET_MENU) {

    return {
      menu: action.payload,
      backupMenu: action.payload
    };
  }
  console.log("state", state)
  
  if(action.type === ActionTypes.FILTER_MENU_BY_CATEGORY) {
  
    console.log("action payload by category",action.payload)
    let labelNumber = Number(action.payload)
    const filteredMenu = backupMenu.filter((product) => product.category_id  === labelNumber);
      return {
        ...state,
        menu: filteredMenu
      }
    }
    // const filteredMenu = backupMenu.filter((product) => product.category === action.payload);
    // console.log("menu filtrado por categoria => ",filteredMenu)
    // return {
    //   ...state,
    //   menu: filteredMenu
    // }

  if (action.type === ActionTypes.FILTER_MENU_BY_LABELS) {
    // tener en cuanta que el payload es un array con las labels
    // const filteredMenu = backupMenu.filter((product) => action.payload.every((label) => product.labels.includes(label)));    
    let filteredMenu;
    console.log(action.payload)
    if (action.payload === "All"){
      filteredMenu = backupMenu;
      console.log("filtered menu => ",filteredMenu)
    } else {
      let labelNumber = Number(action.payload)
      filteredMenu = backupMenu.filter((product) => product.labels.includes(labelNumber));
    }
    return {
      ...state,
      menu: filteredMenu
    }
  }

  if (action.type === ActionTypes.GET_PRODUCTS_BY_NAME) {

    // si la searchBar se vacia vuelve a mostrar todos los productos
    if (action.payload.lenght === 0) {

      return {
        ...state,
        menu: backupMenu
      }
    }

    const filteredMenu = backupMenu.filter((product) => product.product_name.toLowerCase().includes(action.payload.toLowerCase()))

    return {
      ...state,
      menu: filteredMenu
    }
  }
  return state;
}

export default menu;
