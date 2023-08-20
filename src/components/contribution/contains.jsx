import React from "react";

const getListAllDays = () => {
  const dateList = [];

  let currentDate = new Date();

  for (let i = 0; i < 357; i++) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    const newDate = new Date(year, month - 1, day + 1 - i - 5);
    const formattedDate = newDate.toISOString().split("T")[0];

    dateList.push(formattedDate);
  }

  return dateList.reverse();
};

export default getListAllDays;
