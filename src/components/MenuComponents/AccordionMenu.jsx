import styled from "styled-components";
import { useState,useEffect } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import {colors} from "../../res/values/values"
import { ArrowBack } from "@material-ui/icons";
//#region styles
const Accordion = styled.div`
  max-width: 600px; 
  font-size: 1.1rem;
  letter-spacing: 1.5px;
  font-weight: 300;
  margin-left: 5px;
`;
const AccordionDiv = styled.div`
  max-height:20vw ;
  overflow-y: scroll;
  white-space: nowrap;
`;
const MainItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  background-color: ${colors.whiteColor};
  padding: 1rem;
  color:  ${colors.primaryColor};
  font-weight:500 ;
  margin-top: 5px;
  border-width: 0 0px 1px 0px;
  border-color: lightgray;
  border-style: solid;
  &:hover {
    background-color: ${colors.primaryColor};
    color:${colors.whiteColor}
  }
`;
const SubItem = styled.div`
  background-color:  ${colors.whiteColor};
  padding: 8px 10px;
  color: #333;
  font-size: 0.9rem;
  border-width: 0 0px 1px 0px;
  border-color: lightgray;
  border-style: solid;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primaryColor};
    color:${colors.whiteColor}
  }
`;
const Return = styled.div`
  background-color:  ${colors.whiteColor};
  padding: 8px 10px;
  color: ${colors.primaryColor};
  font-size: 0.9rem;
  border-width: 0 0px 1px 0px;
  border-color: lightgray;
  border-style: solid;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primaryColor};
    color:${colors.whiteColor}
  }
`;
const SelectSubItem = styled.div`
  background-color: ${colors.primaryColor};
  padding: 8px 10px;
  color:${colors.whiteColor};
  font-size: 0.9rem;
  border-width: 0 0px 1px 0px;
  border-color: lightgray;
  border-style: solid;
  cursor: pointer;
`;
//#endregion
function AccordionMenu(props) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const [isActive, setIsActive] = useState(true);
  //const [selectedItem,setSelectItem] = useState('')
  const [categoryid,setCategoryId]=useState(null)
  const [productid,setProductId]=useState(null)
  const [filter,setFilter]=useState(null)
  const [brand,setBrand]=useState(null)
  const [country,setCountry]=useState(null)
  const data = props.item;
  useEffect(()=>{
    setCategoryId(searchParams.get("categoryid"))
    setProductId(searchParams.get("productid"))
    setFilter(searchParams.get("filter"))
    setBrand(searchParams.get("brand"))
    setCountry(searchParams.get("country"))
    return () => {
      setCategoryId(null)
      setProductId(null)
      setFilter(null)
      setBrand(null)
      setCountry(null)
    };
  },[searchParams])
  
  const changeIsActiveStatus =() =>{
    setIsActive(!isActive)
    /*
    if(data.type==="ProductGroup"){
      if(isActive)
      navigate(`/search?categoryid=${data.parentid}`)
      setIsActive(!isActive)
    }else if(data.type==="Brands"){
      if(isActive)
      (data.productid!=='') ? navigate(`/search?categoryid=${data.categoryid}&productid=${data.productid}`) : navigate(`/search?categoryid=${data.categoryid}`)
      setIsActive(!isActive)
    }
    */    
  }
  const selectedSubItem = (item)=>{
    console.log(item);
    //(selectedItem===item.code) ? setSelectItem('') : setSelectItem(item.code)
    if(data.type==="ProductGroup"){
      (item.code === productid || item.code === brand || item.code === country) ? 
      navigate(`/route=search?categoryid=${data.parentid}${filter ? `&filter=${filter}` : ''}${brand ? `&brand=${brand}` : ''}${country ? `&country=${country}` : ''}`) : 
      navigate(`/route=search?categoryid=${data.parentid}&productid=${item.code}${filter ? `&filter=${filter}` : ''}${brand ? `&brand=${brand}` : ''}${country ? `&country=${country}` : ''}`)
    }else if(data.type==="Brands"){
      (item.code === productid || item.code === brand || item.name === country)
      ?
      navigate(`/route=search?${filter ? `&filter=${filter}` : ''}${categoryid ? `&categoryid=${categoryid}` : ''}${productid ? `&productid=${productid}` : ''}${country ? `&country=${country}` : ''}`) 
      :
      navigate(`/route=search?${filter ? `&filter=${filter}` : ''}${categoryid ? `&categoryid=${categoryid}` : ''}${productid ? `&productid=${productid}` : ''}&brand=${item.code}${country ? `&country=${country}` : ''}`) 
    }else if(data.type==="Country"){
      (item.code === productid || item.code === brand || item.name === country)
      ?
      navigate(`/route=search?${filter ? `&filter=${filter}` : ''}${categoryid ? `&categoryid=${categoryid}` : ''}${productid ? `&productid=${productid}` : ''}${brand ? `&brand=${brand}` : ''}`) 
      :
      navigate(`/route=search?${filter ? `&filter=${filter}` : ''}${categoryid ? `&categoryid=${categoryid}` : ''}${productid ? `&productid=${productid}` : ''}${brand ? `&brand=${brand}` : ''}&country=${item.name}`) 
    }
    else if(data.type==="Category"){
      navigate(`/route=search?categoryid=${item.code}${filter ? `&filter=${filter}` : ''}${brand ? `&brand=${brand}` : ''}${country ? `&country=${country}` : ''}`) 
    }
    
  }
  const returnPreviousCategory = ()=>{

    console.log(categoryid);
    console.log(productid);
    console.log(brand);
    console.log(filter);
    console.log(country);
   
    navigate(`/route=search?${filter ? `&filter=${filter}` : ''}${brand ? `&brand=${brand}` : ''}${country ? `&country=${country}` : ''}`) 
    
  }
  return (
    <Accordion>
      <MainItem onClick={() => changeIsActiveStatus()}>
        <div>{data.title}</div>
        <div>{isActive ? "-" : "+"}</div>
      </MainItem>
      <AccordionDiv>
        {isActive &&
          data.content.map((value) => {
            if( value.code === productid || value.code === brand || value.name===country){
              return <SelectSubItem onClick={()=>{selectedSubItem(value)}} key={value.code}>{(data.type==='Brands' || data.type==='Country') ? value.name: value.description}</SelectSubItem>;
            }
            else
              return <SubItem onClick={()=>{selectedSubItem(value)}} key={value.code}>{(data.type==='Brands' || data.type==='Country') ? value.name: value.description}</SubItem>;
          })
        }
        
      </AccordionDiv>
      {(data.type==="ProductGroup" && isActive) && <Return onClick={()=>{returnPreviousCategory()}}> RETURN TO PREVIOUS CATEGORIES</Return>}
    </Accordion>
  );
}

export default AccordionMenu;
