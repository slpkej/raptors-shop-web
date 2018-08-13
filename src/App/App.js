import React, { Component } from 'react';
//import logo from './logo.svg';
import logo from './raptors.jpg'; 
import './App.css';

//Services
import HttpService from '../services/http.service';

//Components
import Product from '../product/product.js';
import WishList from '../wishlist/wishlist.js';

const http = new HttpService();

class App extends Component {
  constructor(props){
      super(props);

      //State holds different properties. 
      this.state = {products: []};
      //this apparently binds the function ins es6 syntax
      this.loadData = this.loadData.bind(this);
      //Have to bind the functions again.
      this.productList = this.productList.bind(this);

      this.loadData();
  }

  loadData = () => {
    var self = this; //Refers to the component, this is needed for promsies
    http.getProducts().then(data => {
        self.setState({products: data}) //setState will reload everytime it is called
        //When you want to refresh, call setState
    }, err => {



     });
  }

  productList = () => {
    const list = this.state.products.map((product) => 
          <div className = "col-sm-3" key={product._id}>
              <Product product = {product}/>
          </div>
    );

    return (list);

}
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Jack's Raptor Fan Shop</h1>
        </header>
        <div className="container-fluid App-main"> 
            <div className = "row">
                <div className = "col-sm-8">
                <div className = "row">
                     {this.productList()}
                </div>
                   
                </div>
                <div className = "col-sm-4">
                  <WishList/>        
                </div>
            </div>

            

        </div>
      </div>
    );
  }
}

export default App;


