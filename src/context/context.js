import React, { useState, useEffect } from "react";
import { cities } from "./cities";
import { province } from "./province";
export const ProductContext = React.createContext();

export default function ProductProvider({ children }) {
  const [loading, setLoading] = useState(false);
  //formValue
  const [userName, setUserName] = useState("مسعود");
  const [familyName, setFamilyName] = useState("شاهپوری");
  const [phoneNumber, setPhoneNumber] = useState("09128409487");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  const [provinceList, setProvinceList] = useState([]);
  const [cityList, setCityList] = useState([]);
  //search
  const [searchCityList, setSearchCityList] = useState([]);
  const [searchCityValue, setSearchCityValue] = useState("");
  const [searchProvinceValue, setSearchProvinceValue] = useState("");

  //chose
  const [provinceChosen, setProvinceChosen] = useState([
    { id: 0, value: "انتخاب کنید" },
  ]);
  const [cityChosen, setCityChosen] = useState([
    { id: 0, value: "انتخاب کنید" },
  ]);
  //modal
  const [isOpenStateModal, setIsOpenStateModal] = useState(false);
  const [isOpenCityModal, setIsOpenCityModal] = useState(false);

  //validation Error value
  const [isEmptyValueErrorUserName, setIsEmptyValueErrorUserName] =
    useState("");
  const [isEmptyValueErrorFamilyName, setIsEmptyValueErrorFamilyName] =
    useState("");
  const [isNotValidValueErrorPhone, setIsNotValidValueErrorPhone] =
    useState("");
    const [isEmptyValueErrorChoseProvince, setIsEmptyValueErrorChoseProvince] =
    useState("");
    const [isEmptyValueErrorChoseCity, setIsEmptyValueErrorChoseCity] =
    useState("");

  useEffect(() => {
    console.log(provinceChosen);
    setLoading(true);
    setCityList(cities);
    setProvinceList(province);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    if(provinceChosen[0].id !== "0"){
      var filterArrayCity = cities.filter(
        (item) => item.province_id == provinceChosen[0].id
      );
      setCityList(filterArrayCity);
      setSearchCityList(filterArrayCity);

    }
  }, []);

  const handleChangeValue = (e) => {
    if (e.target.name == "userName") {
      setUserName(e.target.value);
      setIsEmptyValueErrorUserName("");
    }
    if (e.target.name == "familyName") {
      setFamilyName(e.target.value);
      setIsEmptyValueErrorFamilyName("");
    }
    if (e.target.name == "phone") {
      setPhoneNumber(e.target.value);
      setIsNotValidValueErrorPhone("");
    }
  };

  const handleValidations = (e) => {
    var errorValue = "وارد کردن این فیلد الزامی است";
    if (e.target.name == "userName") {
      if (userName == "") {
        setIsEmptyValueErrorUserName(errorValue);
      }
    }
    if (e.target.name == "familyName") {
      if (familyName == "") {
        setIsEmptyValueErrorFamilyName(errorValue);
      }
    }

    if (e.target.name == "phone") {
      var regex = new RegExp("^(\\+98|0)?9\\d{9}$");
      var result = regex.test(phoneNumber);
      if (result !== true) {
        setIsNotValidValueErrorPhone("شماره همراه وارد شده صحیح نمیباشد");
        setIsPhoneNumberValid(false)
      }else{
        setIsPhoneNumberValid(true)
      }
    }
  };

  const handleProvinceModal = (e) => {
    setIsOpenStateModal(!isOpenStateModal);

  };
  const handleCityModal = (e) => {
    if (provinceChosen[0].id == "0") {
      setIsEmptyValueErrorChoseProvince("لطفا استان مورد نظر را انتخاب کنید ")
      // setIsEmptyValueErrorChoseCity("لطفا استان مورد نظر را انتخاب کنید")
      return;
    }
    setIsOpenCityModal(!isOpenCityModal);
 
  };

  const handleSearch = (e) => {
    var filterArray = [];
    if (e.target.name == "province") {
      setSearchProvinceValue(e.target.value);
      filterArray = province.filter((item) =>
        item.title.includes(e.target.value)
      );
      setProvinceList(filterArray);
    }

    if (e.target.name == "city") {
      setSearchCityValue(e.target.value);
      filterArray = searchCityList.filter((item) =>
        item.title.includes(e.target.value)
      );
      setCityList(filterArray);
    }
  };

  const handleChoseProvince = (e) => {
    setIsEmptyValueErrorChoseProvince("")
    setProvinceChosen([
      { id: e.target.id, value: e.target.getAttribute("data-value") },
    ]);
    var filterArrayCity = cities.filter(
      (item) => item.province_id == e.target.id
    );
    // console.log(filterArrayCity);
    setCityList(filterArrayCity);
    setSearchCityList(filterArrayCity);
    setCityChosen([{ id: 0, value: "انتخاب کنید" }]);
    handleProvinceModal();
    setSearchCityValue("")
  };

  const handleChoseCity = (e) => {
    setIsEmptyValueErrorChoseCity("")
    setCityChosen([
      { id: e.target.id, value: e.target.getAttribute("data-value") },
    ]);
    handleCityModal();
  };


  const handleSubmitInformation = (e) => {
e.preventDefault();
if(isPhoneNumberValid== false || userName=="" || familyName=="" || provinceChosen[0].id=="0" || cityChosen[0].id=="0"){
  
  if(provinceChosen[0].id=="0"){
    setIsEmptyValueErrorChoseProvince("لطفا استان مورد نظر را انتخاب کنید")

  }else if(cityChosen[0].id=="0"){
    setIsEmptyValueErrorChoseCity("لطفا شهر مورد نظر را انتخاب کنید")
  }
  
}else{
  alert("تبریک. اطلاعات شما با موفقیت تغییر کرد")
}

  }

  return (
    <ProductContext.Provider
      value={{
        loading,
        cityList,
        provinceList,
        userName,
        familyName,
        phoneNumber,
        isNotValidValueErrorPhone,
        isEmptyValueErrorFamilyName,
        isEmptyValueErrorUserName,
        provinceChosen,
        cityChosen,
        isOpenStateModal,
        isOpenCityModal,
        searchCityValue,
        searchProvinceValue,
        isEmptyValueErrorChoseProvince,
        isEmptyValueErrorChoseCity,
        handleProvinceModal,
        handleCityModal,
        handleValidations,
        handleChangeValue,
        handleSearch,
        handleChoseProvince,
        handleChoseCity,
        handleSubmitInformation
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
