import React, { useState, useEffect } from "react";

function UserInfo() {
  const [data, setData] = useState([]);

  const formatAmount = (val) => {
    if (val >= 1000000) {
      return `$${(val / 1000000).toFixed(1)}M`; // Format to M
    } else if (val >= 1000) {
      return `$${(val / 1000).toFixed(1)}K`; // Format to K
    }
    return `$${val}`; // Format as regular USD
  };

  const fetchInfo = async () => {
    const response = await fetch('http://localhost:3000/api.json');
    const output = await response.json();
    const updateBudget = output.map((obj) => {
        var finalAmount = formatAmount(obj.Budget);
        return {...obj, budgetValue: finalAmount,
        };
    });

    const flaggedItems = updateBudget.map((item) => {
        const currentDate = new Date();
        const itemDate = new Date(item.startDate);
        const isValid = itemDate < currentDate; 
        return {...item,active: (isValid? "Active": "InActive"), 
        };
      });
    return setData(flaggedItems);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      <table>
        <tr style={{backgroundColor:'cornflowerblue', textAlign:'left', padding: '0px 50px 0px 50px'}}>
          <th>Name</th>
          <th>User Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Active</th>
          <th>Budjet</th>
        </tr>
        {data.map((dataObj, index) => {
          return (
            <tr style= {{textAlign:'left', padding: '0px 50px 0px 50px'}}>
                <td>Campaign {index++}</td>
                <td>{dataObj.name}</td>
                <td>{dataObj.startDate}</td>
                <td>{dataObj.endDate}</td>
                <td>
                    {dataObj.active === "Active" ? (
                        <>
                            <span className="logged-in">●</span>
                            {dataObj.active}
                        </>
                    ) : (
                        <>
                            <span className="logged-out">●</span>
                            {dataObj.active}
                        </>
                    )}
                </td>
                <td>{dataObj.budgetValue} USD</td>
            </tr>
          );
        })}
      </table>
    </>
  );
}

export default UserInfo;

