import styled from "styled-components";
import ProductCardView from "./ProductCardView";
import TablePagination from "@mui/material/TablePagination";
import GridViewIcon from '@mui/icons-material/GridViewSharp';
import TableRowsSharpIcon from '@mui/icons-material/TableRowsSharp';
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../redux/actions/productActions";
import { colors } from "../res/values/values";
import  useWindowWidthAndHeight  from "../utilities/hooks/useWindowWidthAndHeight";
//#region Styles
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 1rem 0.3rem;
  align-items: center;
  min-height: 40vw; 
`;
const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: 600px) {
    flex-direction:column ;
    justify-content:center ;
  }
`;
const EmptyProductList = styled.div`
  font-size:1rem;
  font-weight:600 ;
  color:${colors.primaryColor};
`;
const ListType = styled.div`
  display:flex ;
  flex-direction:center ;
  align-items:center ;
  border: 1.5px solid lightgray;
  border-color: ${(props) => props.selected && colors.primaryColor};
  margin:5px ;
`;
const TablePaginationContent =styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  width:100%;
`; 

//#endregion

function Products(props) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [changePageStatus, setChangePageStatus] = useState(false);
  const [listType,setListType] = useState('Grid')
  const { width } = useWindowWidthAndHeight();
  useEffect(() => {
    if(changePageStatus)
      setChangePageStatus(false)
    else{
      setPage(0)
      setRowsPerPage(10)
    }
    //setLoading(true);
    props.actions.getProducts(
      props.categoryid,
      props.productid,
      props.filter,
      page,
      rowsPerPage,
      props.currentUser,
      props.brand,
      props.country
    )
    
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setLoading(false);
    return () => {
      //setLoading(true);
      //props.actions.clearProducts();
    };
  }, [page, rowsPerPage, props.filter, props.productid, props.categoryid,props.brand,props.country]);

  const handleChangePage = (event, newPage) => {
    setChangePageStatus(true)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setChangePageStatus(true)
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Container>
      {loading ? (
        <Container>LOADING</Container>
      ) : (
          (props.products.length>0) ?
            <Container>
         
          <TablePaginationContent>
             <ListType selected={listType==='Grid'} onClick={()=>setListType('Grid')}><GridViewIcon sx={{color: colors.darkcolor }} /></ListType>
            <ListType selected={listType==='List'} onClick={()=>setListType('List')}><TableRowsSharpIcon sx={{ color: colors.darkcolor }}/></ListType>
           
            
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={props.productCount}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={'Rows:'}
            />
          </TablePaginationContent>
          <ProductList>
            {props.products.map((p) => {
                return( <ProductCardView key={p.itemno} product={p} viewType={listType} />);
              /*
              if(listType==='Grid')
                return( <ProductCard key={p.itemno} product={p} />);
              else
                return( <ProductCardForListView key={p.itemno} product={p} />);
              */
            })}
          </ProductList>
          <TablePaginationContent>
            <ListType selected={listType==='Grid'} onClick={()=>setListType('Grid')}><GridViewIcon sx={{color: colors.darkcolor }} /></ListType>
            <ListType selected={listType==='List'} onClick={()=>setListType('List')}><TableRowsSharpIcon sx={{ color: colors.darkcolor }}/></ListType>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={props.productCount}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TablePaginationContent>
            </Container>
          :
            <EmptyProductList>
              Sorry, there were no results matching your search or filter.
            </EmptyProductList>
      )}
    </Container>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      getFilterProducts: bindActionCreators(
        productActions.getFilterProducts,
        dispatch
      ),
      clearProducts: bindActionCreators(
        productActions.clearProductsSuccess,
        dispatch
      ),
    },
  };
}

function mapStateToProps(state) {
  return {
    products: state.productListReducer,
    search: state.changeSearchReducer,
    productCount: state.productCountReducer,
    currentUser: state.currentUserReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Products);
