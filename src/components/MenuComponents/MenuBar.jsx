import { useEffect } from "react";
import { Divider } from "@material-ui/core";
import { LocalOffer, Menu } from "@material-ui/icons";
import styled from "styled-components";
import DropDownMenu from "./DropDownMenu";
import MenuBarCategoriesContent from "./MenuBarCategoriesContent";
import MenuBarCountriesContent from "./MenuBarCountriesContent";
import MobileMenuBarContent from "./MobileMenuBarContent";
import { colors } from "../../res/values/values";
import { useNavigate } from "react-router-dom";
import  useWindowWidthAndHeight  from "../../utilities/hooks/useWindowWidthAndHeight";

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.primaryColor};
  color: ${colors.whiteColor};
  padding: 10px;
  position: relative;
`;
const MenuItem = styled.div`
  font-size: 22px;
  font-weight: 300;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

function MenuBar() {
  const navigate = useNavigate();
  const { height, width } = useWindowWidthAndHeight();
  useEffect(() => {
    console.log('MemuBar : '+width);
  }, []);
  const renderMenuBarComponent = () => {
    let renderMenuBar;

    if (width > 480) {
      renderMenuBar = (
        <Container>
          <DropDownMenu
            icon={<Menu />}
            text="CATEGORIES"
            contentLinks={<MenuBarCategoriesContent />}
          />
          <Divider
            orientation="vertical"
            style={{ margin: "0 10px", background: "#f2f2f2" }}
          />
          <DropDownMenu
            icon={<Menu />}
            text="COUNTRIES"
            contentLinks={<MenuBarCountriesContent />}
          />
          <Divider
            orientation="vertical"
            style={{ margin: "0 10px", background: "#f2f2f2" }}
          />
          <MenuItem
            onClick={() => {
              navigate("/route=search?filter=weboffers");
            }}
          >
            <LocalOffer style={{ paddingRight: "10px" }} /> <p>OFFERS</p>
          </MenuItem>
          <Divider
            orientation="vertical"
            style={{ marginLeft: "10px", background: "#f2f2f2" }}
          />
        </Container>
      );
    } else {
      renderMenuBar = (
        <Container>
          <DropDownMenu
            icon={<Menu />}
            text=""
            contentLinks={<MobileMenuBarContent />}
          />
        </Container>
      );
    }

    return renderMenuBar;
  };
  return (
    <div>
      {renderMenuBarComponent()}
    </div>
  );
}

export default MenuBar;
