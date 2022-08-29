/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import AccordionMenu from "./MenuComponents/AccordionMenu";
import LeftSideFilterContent from "./MenuComponents/LeftSideFilterContent";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import ImageSlider from "../components/ImageSlider";
import useWindowWidthAndHeight from "../utilities/hooks/useWindowWidthAndHeight";
import { colors } from "../res/values/values";
import { useNavigate } from "react-router-dom";
const SideBar = styled.div`
  width: 98%;
  @media only screen and (min-width: 600px) {
    width: 18rem;
    margin: 1rem 0.5rem;
  }
`;
const Row = styled.div`
  width: 90%;
  border: 1px solid lightgray;
  padding: 5px;
  margin: 10px;
  @media only screen and (min-width: 767px) {
  }
`;
const BreadCrumbText = styled.div`
  display:flex ;
  flex-direction:row ;
  justify-content:space-between ;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid lightgray;
  border-radius: 5px;
  color: ${colors.primaryColor};
  padding: 10px;
  margin: 5px;
  @media only screen and (min-width: 768px) {
  }
`;
const ClearFilter = styled.div`
  display:flex ;
  flex-direction:row ;
  justify-content:flex-end ;
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.primaryColor};
  padding: 5px;
  margin: 5px;
  cursor: pointer;
  @media only screen and (min-width: 768px) {
  }
`;
function LeftSide(props) {
  const { width } = useWindowWidthAndHeight();
  const [accordionData, setAccordionData] = useState([]);
  const [categoryFilterData, setCategoryFilterData] = useState([]);
  const [categoryDesc, setCategoryDesc] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [visibleFilter, setVisibleFilter] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let l_accordionData = [];
    if (props.categoryid) {
      let currentCat = props.categories.find(
        (cat) => cat.code === props.categoryid
      );
      if (currentCat) {
        l_accordionData.push({
          parentid: currentCat.code,
          title: currentCat.description,
          type: "ProductGroup",
          content: props.categories.filter(
            (cat) => cat.parentcode === currentCat.code
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

      setAccordionData(l_accordionData);
    } else {
      l_accordionData.push({
        categoryid: props.categoryid,
        productid: props.productid,
        title: "CATEGORIES",
        type: "Category",
        content: props.categories.filter(
          (cat) => cat.indentation === "ItemCategory"
        ),
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
      setAccordionData(l_accordionData);

      let list = [];
      list.push({
        categoryid: props.categoryid,
        productid: props.productid,
        title: "PRODUCT CATEGORIES",
        type: "Category",
        content: props.categories.filter(
          (cat) =>
            cat.indentation === "ItemCategory" ||
            cat.indentation === "ProductGroup"
        ),
      });
      setCategoryFilterData(list);
    }
    if(props.categoryid){
      props.categories.map((cat) => {
        if (cat.code === props.categoryid) setCategoryDesc(cat.description);
      });
    }else setCategoryDesc("");
    if(props.productid){
      props.categories.map((subCat) => {
        if (subCat.code === props.productid) setProductDesc(subCat.description);
      });
    }else setProductDesc("");
    (props.filter || props.categoryid ||props.productid ||props.brand || props.country ) ? setVisibleFilter(true)  :  setVisibleFilter(false)

  }, [props.filter, props.productid, props.categoryid]);

  const closeFilter =(type)=>{
    if(type==="Country")
      navigate(`/route=search?${props.filter ? `&filter=${props.filter}` : ''}${props.categoryid ? `&categoryid=${props.categoryid}` : ''}${props.productid ? `&productid=${props.productid}` : ''}${props.brand ? `&brand=${props.brand}` : ''}`) 
    else if(type==="Category")
      navigate(`/route=search?${props.filter ? `&filter=${props.filter}` : ''}${props.brand ? `&brand=${props.brand}` : ''}${props.country ? `&country=${props.country}` : ''}`) 
    else if(type==="ProductGroup")
      navigate(`/route=search?${props.filter ? `&filter=${props.filter}` : ''}${props.categoryid ? `&categoryid=${props.categoryid}` : ''}${props.brand ? `&brand=${props.brand}` : ''}${props.country ? `&country=${props.country}` : ''}`) 
    else if(type==="Brand")
      navigate(`/route=search?${props.filter ? `&filter=${props.filter}` : ''}${props.categoryid ? `&categoryid=${props.categoryid}` : ''}${props.productid ? `&productid=${props.productid}` : ''}${props.country ? `&country=${props.country}` : ''}`) 
    else
      navigate(`/route=search?${props.categoryid ? `&categoryid=${props.categoryid}` : ''}${props.productid ? `&productid=${props.productid}` : ''}${props.brand ? `&brand=${props.brand}` : ''}${props.country ? `&country=${props.country}` : ''}`) 
    
  }

  return (
    <SideBar>
      {
        (visibleFilter) && 
        <Row>
          {(categoryDesc!==''&& productDesc==='') &&  <BreadCrumbText> <a>{categoryDesc} </a> <a onClick={()=>closeFilter("Category")}>X</a> </BreadCrumbText>}
          {productDesc!=='' && <BreadCrumbText> <a>{productDesc} </a> <a onClick={()=>closeFilter("ProductGroup")}>X</a></BreadCrumbText>}
          {props.brand && <BreadCrumbText> <a>{props.brand} </a> <a onClick={()=>closeFilter("Brand")}>X</a> </BreadCrumbText>}
          {props.filter && <BreadCrumbText>  <a> - {props.filter} - </a> <a onClick={()=>closeFilter("Filter")}>X</a></BreadCrumbText>}
          {props.country && <BreadCrumbText> <a>{props.country} </a> <a onClick={()=>closeFilter("Country")}>X</a> </BreadCrumbText>}
          <ClearFilter onClick={()=>{navigate(`/route=search`)}}>Clear Filter</ClearFilter> 
        </Row>

      }
      
      {accordionData.map((item) => {
        return <AccordionMenu key={item.title} item={item} />;
      })}
      {width > 600 && <ImageSlider type={"left"} />}
    </SideBar>
  );
}
function mapStateToProps(state) {
  return {
    categories: state.categoryListReducer,
    manufacturers: state.manufacturerReducer,
    countryList: state.countryReducer,
  };
}
export default connect(mapStateToProps)(LeftSide);
