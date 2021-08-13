import React, { useEffect, useState } from 'react';

function GetData() {
    const [pageNo, setPageNo] = useState(1);
    const [getData, setGetData] = useState([]);
    const [checkPageNo, setCheckPageNo] = useState(true);
    const getDataFromApi = async () => {
        try {
            let url = `https://reqres.in/api/users?page=${pageNo}`;
            let res = await fetch(url);
            let apiData = await res.json();

            setGetData(apiData.data);

            if (apiData.data.length === 0) {
                setCheckPageNo(false);
            } else {
                setCheckPageNo(true);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDataFromApi();
    }, [pageNo]);

    const btnNext = () => {
        if (checkPageNo) {
            setPageNo(pageNo + 1);
        }
    }
    const btnPrev = () => {
        if (pageNo > 1) {
            setPageNo(pageNo - 1);

        }
    }

    return (
        <>
            <div className="container">
                <h1>Get Data From Api</h1>
                <div className="table-wrap">
                    <div className="pageno">Page No : {pageNo}</div>
                    <div className="pagination">
                        <button className="btn-prev" onClick={btnPrev}>{"<< Prev"}</button>
                        <button className="btn-next" onClick={btnNext}>{"Next >>"}</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Photo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                getData.map((currItem) => {
                                    return (
                                        <tr key={currItem.id}>
                                            <td>{currItem.id}</td>
                                            <td>{currItem.first_name}</td>
                                            <td>{currItem.last_name}</td>
                                            <td>{currItem.email}</td>
                                            <td><img src={currItem.avatar} alt={currItem.first_name} /></td>
                                        </tr>
                                    )
                                })

                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}
export default GetData;