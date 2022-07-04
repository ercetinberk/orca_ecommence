import { useState, useEffect } from "react";
import { FiberManualRecordRounded,KeyboardArrowLeftOutlined,KeyboardArrowRightOutlined } from "@material-ui/icons";
import styled from "styled-components";
import {colors} from "../res/values/values"
//#region Styles
const Container = styled.div`
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  box-shadow: ${(props) => ((props.type === "home" ) && "2px 2px 5px rgba(0, 0, 0, 0.3)")};
  margin: ${(props) => (props.type === "home" ? "10px 10px":"5px 0px 5px 5px")};
`;

const View = styled.div``;
const Image = styled.img`
  width: 100%;
  height: 25rem;
  object-fit: contain;
`;
const RightButton = styled.div`
  position: absolute;
  color: ${(props) => (props.color === "black" ? "#000" : "#000")};
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  top: ${(props) => props.heightPosition}%;
  right: ${(props) => props.widthPosition}%;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.4);
  height: 35px;
`;
const LeftButton = styled.div`
  position: absolute;
  color: ${(props) => (props.color === "black" ? "#000" : "#000")};
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  top: ${(props) => props.heightPosition}%;
  left: ${(props) => props.widthPosition}%;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.4);
  height: 35px;
`;
const Buttons = styled.div`
  position: absolute;
  bottom: 2%;
  left: 47%;
  display: flex;
`;
const Button = styled.div`
  color: ${(props) => (props.color === "black" ? colors.primaryColor : "gray")};
`;
//#endregion

function ImageSlider(props) {
  const [bannerImages, setBannerImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [timeId,setTimeId]=useState("")
  useEffect(() => {
    const getBanners = async () => {
      let url = "http://localhost:3000/api/banners";
      await fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setBannerImages(res.message.data);
          setLoading(false);
        });
        if(timeId!=="")
          clearTimeout(timeId)
        let id = setTimeout(() => {
          if(bannerImages.length>0){
            if(selectedIndex===(bannerImages.length-1))
              setSelectedIndex(0)
            else
            setSelectedIndex(selectedIndex+1)
          }
        }, 4000)
        setTimeId(id)
    }
    getBanners()
    
  }, [bannerImages.length, selectedIndex]);
  const rightSide = () =>{
    if(bannerImages.length>0){
      if(selectedIndex===(bannerImages.length-1))
        setSelectedIndex(0)
      else
        setSelectedIndex(selectedIndex+1)
    }
  }
  const leftSide = () =>{
    if(bannerImages.length>0){
      if(selectedIndex===0)
        setSelectedIndex(bannerImages.length-1)
      else
        setSelectedIndex(selectedIndex-1)
    }
  }
  return (
    <Container type={props.type}>
      {loading ? (
        <View />
      ) : (
        <View>
          <Image src={`./${bannerImages[selectedIndex].link}`} />
          {(props.type==="home") && <LeftButton onClick={()=>leftSide()} heightPosition={40} widthPosition={1}><KeyboardArrowLeftOutlined  fontSize="large" /></LeftButton>} 
          {(props.type==="home") && <RightButton onClick={()=>rightSide()} heightPosition={40} widthPosition={1}><KeyboardArrowRightOutlined  fontSize="large"/></RightButton>}
          {(props.type==="home") && 
            <Buttons>
              {bannerImages.map((banner, index) => {
                return (
                  <Button key={index} onClick={()=>{setSelectedIndex(index)}} color={(index === selectedIndex)?"black":"white"}>
                    <FiberManualRecordRounded />
                  </Button>
                )
              })}
            </Buttons>}
          
        </View>
      )}
    </Container>
  );
}

export default ImageSlider;
