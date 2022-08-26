
import styled from "styled-components";
import {colors} from "../../res/values/values"
import useWindowWidthAndHeight from "../../utilities/hooks/useWindowWidthAndHeight";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
    display:flex ; 
    flex:1 ;
    flex-direction: column;
    justify-content:center ;
    align-items:center ;
    
`;
const Row = styled.div`
    display:flex ; 
    flex-direction:row ;

`;
const Category = styled.div`
    margin:10px ;
    @media only screen and (max-width: 768px) {
      width: 100%;
      display:flex ; 
      justify-content:center ;
      align-items:center ;
  }
`;
const Image = styled.img`
    width: 30vw;
    min-height: 20vw;
    margin-top: 0px;
    object-fit: contain;
  @media only screen and (max-width: 768px) {
    width: 70%;
    max-height: 25vw;
    object-fit: cover;
  }
`;
const Title = styled.span`
  width: auto;
  margin-top:10px ;
  margin-bottom:10px ;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${colors.darkcolor};
  padding: 5px;
`;
function IntroCategoryContainer() {
  const { width } = useWindowWidthAndHeight();
  const navigate = useNavigate();
  const rootCategory =(catId)=>{
     navigate(`/route=search?${catId ? `&categoryid=${catId}` : ''}`) 
  }
  if (width < 768) {
    return(
      <Container>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <Title>OUR PRODUCTS</Title>
          </div>
          <Category onClick={()=>rootCategory(50000)}><Image src={`./catalog/Categories/CAN-JAR-PRODUCTS.jpg`}  ></Image></Category>
          <Category onClick={()=>rootCategory(50000)}><Image src={`./catalog/Categories/CONFECTIONARY0DNUTS-SEEDS-.jpg`}  ></Image></Category>
          <Category onClick={()=>rootCategory(50000)}><Image src={`./catalog/Categories/DAIRY-CHILLED.jpg`}  ></Image></Category>
          <Category onClick={()=>rootCategory(50000)}><Image src={`./catalog/Categories/FROZEN-PRODUCTS.jpg`}  ></Image></Category>
          <Category onClick={()=>rootCategory(50000)}><Image src={`./catalog/Categories/PASTA-NOODLES-BREAD0DGRAINS-FLOURS.jpg`}  ></Image></Category>
          <Category onClick={()=>rootCategory(50000)}><Image src={`./catalog/Categories/POULTRY-MEAT-FISH.jpg`}  ></Image></Category>
          <Category onClick={()=>rootCategory(50000)}><Image src={`./catalog/Categories/SEASONING-HERBS-0DOTHER-AMBIENT.jpg`}  ></Image></Category>
          <Category onClick={()=>rootCategory(50000)}><Image src={`./catalog/Categories/TEA-COFFEE-INSTANT-DRINKS.jpg`}  ></Image></Category>
      </Container>
    )
  }else{
    return(
      <Container>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <Title>OUR PRODUCTS</Title>
          </div>
        <Row>
            <Category onClick={()=>rootCategory(50000)}><Image src={`./catalog/Categories/CAN-JAR-PRODUCTS.jpg`}  ></Image></Category>
            <Category onClick={()=>rootCategory(50000)}><Image src={`./catalog/Categories/CONFECTIONARY0DNUTS-SEEDS-.jpg`}  ></Image></Category>
            <Category onClick={()=>rootCategory(50000)}><Image src={`./catalog/Categories/DAIRY-CHILLED.jpg`}  ></Image></Category>
        </Row>
        <Row>
            <Category onClick={()=>rootCategory(50000)}><Image src={`./catalog/Categories/DRINKS-BEVERAGES.jpg`}  ></Image></Category>
            <Category onClick={()=>rootCategory(50000)}><Image src={`./catalog/Categories/FROZEN-PRODUCTS.jpg`}  ></Image></Category>
            <Category onClick={()=>rootCategory(50000)}><Image src={`./catalog/Categories/PASTA-NOODLES-BREAD0DGRAINS-FLOURS.jpg`}  ></Image></Category>
        </Row>
        <Row>
            <Category onClick={()=>rootCategory(50000)}><Image src={`./catalog/Categories/POULTRY-MEAT-FISH.jpg`}  ></Image></Category>
            <Category onClick={()=>rootCategory(50000)}><Image src={`./catalog/Categories/SEASONING-HERBS-0DOTHER-AMBIENT.jpg`}  ></Image></Category>
            <Category onClick={()=>rootCategory(50000)}><Image src={`./catalog/Categories/TEA-COFFEE-INSTANT-DRINKS.jpg`}  ></Image></Category>
        </Row>
      </Container>
    )
  }

}

export default IntroCategoryContainer;
