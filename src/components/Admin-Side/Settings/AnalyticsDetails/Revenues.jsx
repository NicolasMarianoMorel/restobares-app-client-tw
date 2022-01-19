import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import BackButton from "../../BackButton";
import LogoutButton from "../../Navbar/LogoutButton";
import Cookies from "js-cookie";
import { getRevenue } from "../../../../redux/actions";
import { Card, Form, Table } from "react-bootstrap";
import { PulseLoader } from "react-spinners";
import ReactExport from "react-data-export";
import ReactPaginate from 'react-paginate';
import "./Revenues.css"
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;



const Revenues = () => {
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(20);
  const [revenueData, setRevenueData] = useState([])
  const [pageCount, setPageCount] = useState(0);
  const override = `
        display: flex;
        align-items: center;
        justify-content: center;    
    `;
  const { monthly, weekly, daily } = useSelector((state) => state.revenue);
  const { time, idResto } = useParams();
  const tokenAdmin = Cookies.get("token-admin");
  const [revenue, setRevenue] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    
    const fetchData = async () => {
      await dispatch(getRevenue(idResto, time, tokenAdmin));
      switch (time) {
        case "Monthly":
          setRevenue(monthly);
          break;
        case "Weekly":
          setRevenue(weekly);
          break;
        case "Daily":
          setRevenue(daily);
          break;
        default:
          console.log("Elegi bien pinchila");
      }
      setPageCount(Math.ceil((revenue.length /perPage) )- 1);
      setRevenueData(revenue.slice(offset, offset + perPage));
    }
    setLoading(true);
    await fetchData();
    setLoading(false);
  }, [time, offset, idResto, tokenAdmin, revenue, perPage, dispatch]); 
  
  const handlePageClick = async(e) => {
    const selectedPage = e.selected;
    setLoading(true);
    await setOffset((selectedPage + 1)*perPage)
    setLoading(false);
  }

  const DataSet = [
    {
      columns: [
        {
          title: "Date",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        }, // width in pixels
        {
          title: "Price",
          style: { font: { sz: "18", bold: true } },
          width: { wch: 30 },
        }, // width in characters
        {
          title: "Tip",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        }, // width in pixels
        {
          title: "Staff ID",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        }, // width in pixels
        {
          title: "Table",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        }, // width in pixels
        {
          title: "Payment Method",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        }, // width in pixels
      ],
      data: revenue.map((data) => [
        { value: data.date, style: { font: { sz: "14" } } },
        { value: data.totalPrice, style: { font: { sz: "14" } } },
        {
          value: data.tip,
          style: {
            font: { color: { rgb: "000000" } },
            fill: { patternType: "solid", fgColor: { rgb: "9aaeea" } },
          },
        },
        {
          value: data.idStaff,
          style: {
            font: { color: { rgb: "000000" } },
            fill: { patternType: "solid", fgColor: { rgb: "e8b9b7" } },
          },
        },
        {
          value: data.idTable,
          style: {
            font: { color: { rgb: "000000" } },
            fill: { patternType: "solid", fgColor: { rgb: "afd39e" } },
          },
        },
        {
          value: data.paymentMethod,
          style: {
            font: { color: { rgb: "000000" } },
            fill: { patternType: "solid", fgColor: { rgb: "e5deb5" } },
          },
        },
      ]),
    },
  ];

  return (
    <div className=" w-full ">
        {/* NavBar */}
        <nav className="flex flex-row justify-between bg-pink-700 h-12 mb-5">
          <BackButton />
          <div className="flex flex-row justify-center text-white text-2xl mx-4 w-20 mt-2  md:w-32">
            <h1>{time}&nbsp;revenues</h1>
          </div>
          <LogoutButton />
        </nav>
        {/* Cards */}
        <Card className=" w-full ">
          <Card.Body className=" w-full ">
            {/* <Form>
              <Form.Label className="text-danger font-weight-bold">
                Select Country
              </Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose....."
              ></Form.Control>
            </Form> */}
            <div className="flex flex-col items-center">
            {revenue.length !== 0 ? (
              <ExcelFile
                filename="Revenues"
                element={
                  <button
                    type="button"
                    className="shadow-lg bg-green-500 hover:bg-green-300 text-white font-bold text-lg my-2 mb-4 px-2 rounded"
                  >
                    Export to Excel
                  </button>
                }
              >
                <ExcelSheet dataSet={DataSet} name="Revenues Dinkelbert" />
              </ExcelFile>
            ) : null}
            <div className="inline-block mb-4">
              <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}/>
            </div>
            </div>
            <Table responsive className=" w-full mb-24 ">
              
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Tip</th>
                  <th>Staff ID</th>
                  <th>Table</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {revenue.length === 0 ? (
                  <tr>
                    <td colSpan="10">
                      <PulseLoader
												css={override}
												margin={10}
												size={30}
												color={"#D0024A"}
												loading={loading}
											/>
                    </td>
                  </tr>
                ) : (
                  <>
                    {revenueData.map((data, i) => (
                      <tr key={i} className={` h-8 ${i%2 === 0 ? "bg-gray-100" : "bg-gray-300"} `}>
                      	  <td>{data.date}</td>
                      	  <td>{data.totalPrice}</td>
                      	  <td>{data.tip}</td>
                      	  <td>{data.idStaff}</td>
                      	  <td>{data.idTable}</td>
                      	  <td>{data.paymentMethod}</td>
                      	</tr>
                    ))}
                  </>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      
    </div>
  );
};

export default Revenues;
