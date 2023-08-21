import React, { useEffect, useState } from "react";
import "../contribution/contribution.scss";
import getListAllDays from "./contains";

const listDaysFrom = getListAllDays();
const Contribution = () => {
  const [responseCont, changeResponseContri] = useState();
  const [show, changeShow] = useState([]);
  /*   console.log(show);
  console.log(responseCont); */
  useEffect(() => {
    fetch("https://dpg.gg/test/calendar.json")
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        changeResponseContri(data);
      });

    for (let key in responseCont) {
      const value = responseCont[key];
      if (firstKey === null) {
        firstKey = key;
        firstValue = value;
        firstMounth = key.slice(-2);
      }
      for (
        let indexMount = firstMounth, daysindex = firstMounth;
        indexMount < listElementsSquary.length;
        indexMount++, daysindex++
      ) {
        if (daysindex === 28) {
          daysindex = 0;
        }
        listElementsSquary[indexMount].id = listDaysFrom[daysindex];
      }

      const className =
        value === 0
          ? "zeroBg"
          : value >= 1 && value <= 9
          ? "class-1-9"
          : value >= 10 && value <= 19
          ? "class-10-19"
          : value >= 20 && value <= 29
          ? "class-20-29"
          : "class-30";
      if (document.getElementById(key) != null) {
        document.getElementById(key).classList.add(className);
        const element = document.getElementById(key);
        const id = element.getAttribute("id");
        const elementDiv = document.createElement("div");

        elementDiv.classList.add("hide");
        document.getElementById(key).onclick = function () {
          elementDiv.classList.toggle("hide_show");
        };

        document.getElementById(key).appendChild(elementDiv);

        elementDiv.innerHTML = `<div class="contributions">${value} contributions</div> 
        <div class="date">${id}</div> `;

        document.getElementById(key).classList.add(className);
      }
    }
  }, []);

  let firstKey = null;
  let firstValue = null;
  let firstMounth = 0;

  const month = {
    0: "Янв.",
    1: "Фев.",
    2: "Март",
    3: "Апр.",
    4: "Май",
    5: "Июнь",
    6: "Июль",
    7: "Авг.",
    8: "Сент.",
    9: "Окт.",
    10: "Нояб.",
    11: "Дек.",
  };
  const arr = [1, 2, 3, 4, 5, 6, 7];

  let activeMonth = [];
  var date = new Date();

  for (let i = 12; i > 0; i--) {
    const indexMounth = (date.getMonth() - i + 12) % 12;
    activeMonth.push(month[indexMounth]);
  }

  const monthElements = activeMonth.map((element, index) => {
    return <li key={index}>{element}</li>;
  });
  const elementsSquares = arr.map((element, index) => {
    return <div key={index} className="squareMini zeroBg"></div>;
  });
  const originalArray = new Array(51).fill(null);

  const elms = originalArray.map((element, id) => {
    return (
      <div className="week" key={id}>
        {elementsSquares}
      </div>
    );
  });

  const listElementsSquary = document.querySelectorAll(".squareMini");

  return (
    <>
      <ul className="monthList">{monthElements}</ul>
      <div className="marksList">
        <div className="dayNames">
          <span>Пн</span>
          <span>Ср</span>
          <span>Пт</span>
        </div>
        <div className="squareList">{elms}</div>
      </div>
    </>
  );
};

export default Contribution;
