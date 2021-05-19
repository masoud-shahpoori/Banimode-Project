import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/context";
import { BiMap } from "react-icons/bi";

export default function Modal({ name }) {
  const {
    handleSearch,
    provinceList,
    handleChoseProvince,
    handleChoseCity,
    cityList,
    searchCityValue,
    searchProvinceValue,
  } = useContext(ProductContext);

  if (name == "province") {
    return (
      <section className="section-container-list">
        <input
          type="text"
          className="search-input"
          name={name}
          value={searchProvinceValue}
          onChange={handleSearch}
          placeholder="جستجو در میان استان ها"
        />
        <ul className="ul-container-list">
          {provinceList.map((item) => {
            return (
              <li
                onClick={handleChoseProvince}
                id={item.id}
                data-value={item.title}
              >
                <BiMap /> {item.title}
              </li>
            );
          })}
        </ul>
      </section>
    );
  } else {
    return (
      <section className="section-container-list">
        <input
          type="text"
          className="search-input"
          name={name}
          onChange={handleSearch}
          value={searchCityValue}
          placeholder="جستجو در میان شهر ها"
        />
        <ul className="ul-container-list">
          {cityList.map((item) => {
            return (
              <li
                onClick={handleChoseCity}
                id={item.id}
                data-value={item.title}
              >
                <BiMap /> {item.title}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}
