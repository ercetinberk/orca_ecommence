import styled from "styled-components";
import { useState,useEffect } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import {colors} from "../../res/values/values"
import AccordionMenu from "./AccordionMenu";
//#region styles
const Accordion = styled.div`
  max-width: 600px; 
  font-size: 1.1rem;
  letter-spacing: 1.5px;
  font-weight: 300;
  margin-left: 5px;
`;
const AccordionDiv = styled.div`
  max-height:30vw ;
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
function LeftSideFilterContent(props) {
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
  return (
    <Accordion>
      <MainItem onClick={() => changeIsActiveStatus()}>
        <div>{data.title}</div>
        <div>{isActive ? "-" : "+"}</div>
      </MainItem>
      <AccordionDiv>
        {isActive &&
          data.content.filter(cat=>cat.indentation==="ItemCategory").map((value) => {
            
            let test = {
                parentid: value.code,
                title: value.description,
                type: "ProductGroup",
                content: data.content.filter(
                  (a) =>a.parentcode ===  value.code
                )
              }
              return <AccordionMenu key={test.title} item={test} />;
            
          })
        }
      </AccordionDiv>
      
    </Accordion>
  );
}

export default LeftSideFilterContent;
