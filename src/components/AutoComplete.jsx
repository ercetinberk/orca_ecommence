import React, { useState, useEffect, Fragment, useRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../redux/actions/productActions";
import { colors } from "../res/values/values";
import { Search } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
//#region styles

const SearchInput = styled.input`
  width: 30vw;
  font-size: 0.9rem;
  font-weight: 300;
  letter-spacing: 1.5px;
  padding: 0 1.5rem;
  outline: none;
  background-color: ${colors.whiteColor};
  border-style: solid;
  border-color: lightgray;
  border-width: 1px 0 1px 1px;
  @media only screen and (min-width: 600px) {
    font-size: 1rem;
  }
`;
const Suggestions = styled.ul`
  position: absolute;
  z-index: 1000;
  
  overflow-x: auto;
  padding: 1px 0;
  margin-top: 40px;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  background-color: #fff;
  border-radius: 0.25rem;
  border: 1px solid #999;
  list-style: none;
  width: 80vw;
  max-height: 70vw;
  @media only screen and (min-width: 600px) {
    width: 60vw;
    max-height: 45vw;
  }
`;
const SuggestionsLi = styled.li`
  padding: 5px;
  border-bottom: 1px solid #999;
  &:hover {
    background-color: #e7e7e7;
    cursor: pointer;
    font-weight: 700;
  }
`;
const SuggestionsActiveLi = styled.li`
  padding: 5px;
  background-color: #e7e7e7;
  border-bottom: 1px solid #999;
  cursor: pointer;
  font-weight: 700;
`;
const NoSuggestions = styled.div`
  margin-top: 35px;
  position: absolute;
  z-index: 1000;
  color: #999;
  padding: 0.5rem;
`;
const ClearButton = styled.button`
  background-color: ${colors.whiteColor};
  border: 0;
  border-bottom: 1px solid lightgray;
  border-top: 1px solid lightgray;
`;
const ClearButtonText = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${colors.primaryColor};
  margin: 0.5rem;
`;
const ClearButtonTextNon = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: transparent;
  margin: 0.5rem;
`;
const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-color: lightgray;
  border-width: 1px 1px 1px 1px;
  padding: 10px;
  color: ${colors.primaryColor};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
const Image = styled.img`
  height: 3rem;
  width: 3rem;
  object-fit: contain;
  margin:5px ;
  @media only screen and (min-width: 600px) {
    height: 4.5rem;
    width: 4.5rem;
  }
 
`;
const Description = styled.p`
  display: block;
  font-size: 14px;
  margin-left: 10px;
  font-weight: 700;
  margin-top: 5px;
  @media only screen and (min-width: 600px) {
    font-size: 17px;
  }
 
`;
const Price = styled.p`
  display: block;
  font-size: 13px;
  margin-left: 10px;
  margin-top: 5px;
  font-weight: 500;
  color: #797d7f;
  @media only screen and (min-width: 600px) {
    font-size: 16px;
  }
  
`;
const SuggestionHeader = styled.div`
  padding:10px ;
  font-size: 16px;
  font-weight:500 ;
  color: ${colors.whiteColor};
  background-color: ${colors.primaryColor};
`;
const CartButtons = styled.div`
  display: flex;
  flex:1 ;
  justify-content:center ;
`;
const CartButton = styled.div`
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  background-color: ${colors.primaryColor};
  border-color: #dddddd #dddddd #b3b3b3 #b7b7b7;
  color: #fff;
  border-radius: 2px;
  padding: 8px;
  margin:5px ;
  cursor: pointer;
  &:hover{
      background-color:${colors.darkcolor} ;
  }
`;
//#endregion
const Autocomplete = (props) => {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const listRef= useRef(null);
  const element= useRef(null);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");
  useEffect(() => {
    //props.actions.getAllProducts();
  }, []);

  const onChange = async (e) => {
    const userInput = e.currentTarget.value;
    const filterKeys= userInput.split(" ")
  
    setUserInput(userInput);
    // Filter our suggestions that don't contain the user's input
    await getSearchProductsProduct(userInput)
    /*
    const filteredSuggestions = props.allProducts.filter(
      function (product) {
        let test = false
        filterKeys.map((key,index)=>{
          if(index===0) test= product.description.toLowerCase().indexOf(key.toLowerCase()) > -1
          else
            if(test) test= product.description.toLowerCase().indexOf(key.toLowerCase()) > -1
        })
        if (this.count < 10 && test) {
          this.count++;
          return true;
        }
        return false;
      },
      { count: 0 });
    setActiveSuggestion(-1);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(e.currentTarget.value);
    */
  };
  const getSearchProductsProduct = async (filter) => {
    let url = `http://localhost:3000/api/products/search?filter=${filter}`
    await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setActiveSuggestion(-1);
        setFilteredSuggestions(res.message.data);
        setShowSuggestions(true);
        //setUserInput(filter);
      });

  }
  const onClick = (suggestion) => {
    setActiveSuggestion(-1);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(suggestion.description);
    navigate(`/route=product/card/${suggestion.itemno}`);
  };
  const onViewMore = () => {
    setActiveSuggestion(-1);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    navigate("/route=search?filter=" + userInput)
  };
  const onKeyDown = (e) => {
   
    // User pressed the enter key
    if (e.keyCode === 13) {
      setShowSuggestions(false);
      if (activeSuggestion === -1)
        navigate("/route=search?filter=" + userInput);
      else {
        setUserInput(filteredSuggestions[activeSuggestion].description);
        navigate(
          `/route=product/card/${filteredSuggestions[activeSuggestion].itemno}`
        );
      }
      setActiveSuggestion(-1);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        setActiveSuggestion(activeSuggestion - 1);
      }
      setActiveSuggestion(activeSuggestion - 1);

      (element.current.clientHeight) && listRef.current.scrollBy(0, (-1*(element.current.clientHeight)))
    
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
     // debugger
      if (activeSuggestion + 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
      console.log();
      (element.current.clientHeight) && listRef.current.scrollBy(0, element.current.clientHeight)
    }
  };
  const renderSuggestionsListComponent = () => {
    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <Suggestions ref={listRef}>
            <SuggestionHeader>
              Products
            </SuggestionHeader>
            {filteredSuggestions.map((suggestion, index) => {
              // Flag the active suggestion with a class
              return index === activeSuggestion ? (
                <SuggestionsActiveLi
                  
                  key={index}
                  onClick={() => onClick(suggestion)}
                >
                  <div
                    
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image ref={element} src={`/${suggestion.image}`} />
                    <div>
                      <Description>{suggestion.description}</Description>
                      <Price>Price : £{suggestion.unitprice}</Price>
                    </div>
                  </div>
                </SuggestionsActiveLi>
              ) : (
                <SuggestionsLi  key={index} onClick={() => onClick(suggestion)}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image ref={element} src={`/${suggestion.image}`} />
                    <div>
                      <Description>{suggestion.description}</Description>
                      <Price>Price : £{suggestion.unitprice}</Price>
                    </div>
                  </div>
                </SuggestionsLi>
              );
            })}
            <CartButtons>
              <CartButton onClick={onViewMore}>View More</CartButton>
            </CartButtons>
          </Suggestions>
        );
      } else {
        suggestionsListComponent = <NoSuggestions></NoSuggestions>;
      }
    }
    return suggestionsListComponent;
  };
  return (
    <Fragment>
      
      <SearchInput
        ref={searchInputRef}
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      ></SearchInput>
      {userInput !== "" ? (
        <ClearButton
          onClick={() => {
            setUserInput("");
            searchInputRef.current.focus();
          }}
        >
          <ClearButtonText>X</ClearButtonText>
        </ClearButton>
      ) : (
        <ClearButton>
          <ClearButtonTextNon>_</ClearButtonTextNon>
        </ClearButton>
      )}
      <SearchButton
        onClick={() => {
          navigate("/route=search?filter=" + userInput);
        }}
      >
        <Search
          style={{
            color: colors.primaryColor,
            width: "26px",
            marginRight: "5px",
          }}
        />
        SEARCH
      </SearchButton>
      {renderSuggestionsListComponent()}
    </Fragment>
  );
};
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getAllProducts: bindActionCreators(
        productActions.getSearchProducts,
        dispatch
      ),
    },
  };
}

function mapStateToProps(state) {
  return {
    allProducts: state.allProductListReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete);

