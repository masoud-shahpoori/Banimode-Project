import React, { useContext, useState } from "react";
import Header from '../component/Header'
import { ProductContext } from "../context/context";
import LoadingImage from "../assets/loading.gif";
import Modal from "../component/Modal";
import { province } from "../context/province";
import { cities } from "../context/cities";

export default function Products() {
  //loading
  const {
    loading,
    userName,
    familyName,
    phoneNumber,
    isNotValidValueErrorPhone,
    isEmptyValueErrorFamilyName,
    isEmptyValueErrorUserName,
    handleValidations,
    handleChangeValue,
    provinceChosen,
    cityChosen,
    isOpenCityModal,
    handleProvinceModal,
    handleCityModal,
    isOpenStateModal,
    isEmptyValueErrorChoseProvince,
    isEmptyValueErrorChoseCity,
    handleSubmitInformation
  } = useContext(ProductContext);

  if (loading == true) {
    return (
      <>
        <img src={LoadingImage} alt="" className="loading" />
      </>
    );
  } else {
    return (<>
    <Header></Header>
      <section className="container">
        <form onSubmit={handleSubmitInformation} autocomplete="off">
          <div className="container-input">
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={handleChangeValue}
              onBlur={handleValidations}
            />
            <span className="errorValueContainer">
              {isEmptyValueErrorUserName}
            </span>
          </div>
          <div className="container-input">
            <input
              type="text"
              name="familyName"
              value={familyName}
              onChange={handleChangeValue}
              onBlur={handleValidations}
            />
            <span className="errorValueContainer">
              {isEmptyValueErrorFamilyName}
            </span>
          </div>
          <div className="container-input">
            <input
              type="tel"
              name="phone"
              value={phoneNumber}
              onChange={handleChangeValue}
              onBlur={handleValidations}
            />
            <span className="errorValueContainer">
              {isNotValidValueErrorPhone}
            </span>
          </div>
          <div className="container-chose-location-modal">
            <p> استان</p>
            <div onClick={handleProvinceModal} className="chose-province-div">
              <p id={provinceChosen[0].id}>{provinceChosen[0].value}</p>
            </div>
            <span className="errorValueContainer">
              {isEmptyValueErrorChoseProvince}
            </span>
            <div
              className={`modal-parent ${
                isOpenStateModal === true ? "fade-in-modal" : "fade-out-modal"
              }`}
            >
              <div
                className="extra-space-modal"
                onClick={handleProvinceModal}
              ></div>
              <div className="modal-container">
                {isOpenStateModal === true ? (
                  <Modal list={province} name="province" />
                ) : (
                  ""
                )}
              </div>
            </div>

        
          </div>

          <div className="container-chose-location-modal">
            <p> شهر</p>
            <div onClick={handleCityModal} className="chose-province-div">
              <p id={cityChosen[0].id}>{cityChosen[0].value}</p>
            </div>
            <span className="errorValueContainer">
              {isEmptyValueErrorChoseCity}
            </span>
            <div
              className={`modal-parent ${
                isOpenCityModal === true ? "fade-in-modal" : "fade-out-modal"
              }`}
            >
              <div
                className="extra-space-modal"
                onClick={handleCityModal}
              ></div>
              <div className="modal-container">
                {isOpenCityModal === true ? (
                  <Modal list={cities} name="city" />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div>





          </div>

          <div className="button-container">
            <button type="submit">ثبت آدرس</button>
          </div>
        </form>
      </section>
      </>
    );
  }
}
