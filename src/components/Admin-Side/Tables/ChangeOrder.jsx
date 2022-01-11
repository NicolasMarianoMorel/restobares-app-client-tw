import React from "react";
import { Link, useParams, useNavigate  } from "react-router-dom";
import { useSelector, useDispatch  } from "react-redux";
import { changeTableFilled, sockets } from "../../../redux/actions";

export default function ChangeOrder(detailTable) {
    const {idResto} = useParams()
    const table = detailTable.detailTable
    const currentOrder = useSelector(state => state.tables[table-1].currentOrder)
  	const dispatch = useDispatch();
  	const navigate = useNavigate();

  	const goToClientSide = (e) => {
      sockets.joinResto(idResto);
			dispatch(changeTableFilled(idResto,table));
		  sockets.tableSend();
			navigate(`/resto/${idResto}/table/${table}/menu`);
  	}
    return ( 
        <div className=" h-8 mx-2 bg-gray-700 bg-opacity-10 rounded-md mb-2 flex justify-between items-center">
            <p className="inline-block float-left ml-2 "> 
                {currentOrder.products.length   ? "Change Order"
                                                : "Make New Order"
                }
            </p>
          <button onClick={goToClientSide} className="w-12  ml-2 mr-2 h-6 bg-pink-600 rounded-md text-white">Go!</button>
        </div>
  );
}
