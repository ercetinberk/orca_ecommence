/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import AccordionMenu from "./MenuComponents/AccordionMenu";
import LeftSideFilterContent from "./MenuComponents/LeftSideFilterContent";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import ImageSlider from "../components/ImageSlider";
import  useWindowWidthAndHeight  from "../utilities/hooks/useWindowWidthAndHeight";

const SideBar = styled.div`
  width: 98%;
  @media only screen and (min-width: 600px) {
    width: 18rem;
    margin: 2rem 0.5rem;
  }
`;
function LeftSide(props) {
  const { width } = useWindowWidthAndHeight();
  const [accordionData, setAccordionData] = useState([]);
  const [categoryFilterData, setCategoryFilterData] = useState([]);
  useEffect(() => {
    let l_accordionData = [];
    if (props.categoryid) {
      
      let currentCat= props.categories.find(cat=>cat.code===props.categoryid)
      if(currentCat){
        l_accordionData.push({
          parentid: currentCat.code,
          title: currentCat.description,
          type: "ProductGroup",
          content: props.categories.filter(
            (cat) =>
              cat.parentcode ===  currentCat.code
          ),
        });
      }
      l_accordionData.push({
        categoryid: props.categoryid,
        productid: props.productid,
        title: "Brands",
        type: "Brands",
        content: props.manufacturers,
      });
      l_accordionData.push({
        categoryid: props.categoryid,
        productid: props.productid,
        title: "Countries",
        type: "Country",
        content: props.countryList,
      });
      
      setAccordionData(l_accordionData)
    }else{
      l_accordionData.push({
        categoryid: props.categoryid,
        productid: props.productid,
        title: "CATEGORIES",
        type: "Category",
        content: props.categories.filter(cat=>cat.indentation==="ItemCategory" ),
      });
      l_accordionData.push({
        categoryid: props.categoryid,
        productid: props.productid,
        title: "BRANDS",
        type: "Brands",
        content: props.manufacturers,
      });
      l_accordionData.push({
        categoryid: props.categoryid,
        productid: props.productid,
        title: "COUNTRIES",
        type: "Country",
        content: props.countryList,
      });
      setAccordionData(l_accordionData)

      let list = []
      list.push({
        categoryid: props.categoryid,
        productid: props.productid,
        title: "PRODUCT CATEGORIES",
        type: "Category",
        content: props.categories.filter(cat=>cat.indentation==="ItemCategory" || cat.indentation==="ProductGroup"),
      });
      setCategoryFilterData(list)
    }
  }, [props.filter, props.productid, props.categoryid]);

  return (
    <SideBar>
      {accordionData.map((item) => {
        return <AccordionMenu key={item.title} item={item} />;
      })}
      {(width>600)&& <ImageSlider type={"left"}/>}
      
    </SideBar>
  );
}
function mapStateToProps(state) {
  return {
    categories: state.categoryListReducer,
    manufacturers:state.manufacturerReducer,
    countryList: state.countryReducer,
  };
}
export default connect(mapStateToProps)(LeftSide);
