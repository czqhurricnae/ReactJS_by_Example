import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {IntervalEnhance, CartTimeoutEnhance} from './Enhance';
import {compose} from 'redux';

export class BookStore extends Component {
    constructor(props) {
        super(props);
        this.state = {currentStep: 1,
                      formValues: {},
                      cartTimeout: 60*15,
                     };
        this._updateFormData = this._updateFormData.bind(this);
    }

    _renderSwitch(step, callback) {
        switch(step) {
        case 1: return <BookList updateFormData={callback}/>;
        case 2: return <ShippingDetailsEnhance updateFormData={callback} cartTimeout = {this.state.cartTimeout}/>;
        case 3: return <DeliveryDetails updateFormData={callback}/>;
        case 4: return <Confirmation updateFormData={callback} data={this.state.formValues}/>;
        case 5: return <Success data={this.state.formValues}/>;
        default: return <BookList updateFormData={callback}/>;
        }
    }

    /**
     * @param
     *   formData:  子组件传回来的数据
     * @param
     *   formValues:  父组件存储子组件的数据
     */
    _updateFormData(formData) {
        let formValues = Object.assign({}, formData, this.state.formValues);
        let nextStep = this.state.currentStep + 1;
        this.setState({formValues: formValues, currentStep: nextStep}, () =>
                      console.log("file:form.js,\
                               function: BookStore._updateFormData,\
                                   line:34",this.state));
    }

    render() {
        return(<div>
               {this._renderSwitch(this.state.currentStep, this._updateFormData)}
               </div>
              );
    }
}

export class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [
                {id:1, name: 'zero to one', author: 'peter thiel' },
                {id:2, name: 'monk who sold his ferrari', author: 'robin sharma' },
                {id:3, name: 'wings of fire', author: 'a.p.j. abdul kalam' }
            ],
            selectedBooks:[],
            error: false,
        };
    }

    _renderBook(book) {
        return(
                <div className="checkbox" key={book.id}>
                <label>
                <input type="checkbox"
                value={book.name}
                onChange={this.handleSelectedBooks.bind(this)}/>
                        {book.name}-{book.author}
                </label>
            </div>
        );
    }

    _renderError() {
        if (this.state.error) {
            return(
                    <div className="alert alert-danger">
                        {this.state.error}
                    </div>
            );
        }
    }

    handleSelectedBooks(event) {
        let selectedBooks = this.state.selectedBooks;
        let index = selectedBooks.indexOf(event.target.value);

        if(event.target.checked) {
            if(-1 === index) {
                selectedBooks.push(event.target.value);
            }
        }
        else {
            selectedBooks.splice(index, 1);
        }

        this.setState({selectedBooks: selectedBooks}, () =>
                      console.log("file:form.js,\
                               function: BookList.handleSelectedBooks,\
                                   line:96", this.state));
    }

    handleSubmit(event) {
        event.preventDefault();
        if (0 === this.state.selectedBooks.length) {
            this.setState({error: "please choose at lease one book to continue!"});
        }
        else {
            this.setState({error: false});
            this.props.updateFormData({"selectedBooks": this.state.selectedBooks});
        }
    }

    render() {
        let errorMessage = this._renderError();
        return(<div>
                   <h3>
                       choose fromwide variety of books available in our store.
                   </h3>
                   {errorMessage}
                   <form onSubmit={this.handleSubmit.bind(this)}>
                       {
                           this.state.books.map((book) => {
                               return(this._renderBook(book));
                           })
                       }
                       <input type="submit" className="btn btn-Success"/>
                   </form>
                </div>
        );
    }
}

export class ShippingDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
                      fullName:        "",
                      contactNumber:   "",
                      shippingAddress: "",
                      error:           false};
    }

    Componentdidmount() {
       this.setState({cartTimeout: this.props.cartTimeout});
    }

    _renderError() {
        if (this.state.error) {
            return(<div className="alert alert-danger">
                       {this.state.error}
                   </div> );
        }
    }

    _validateInput() {
        if (this.state.fullName === "") {
            this.setState({error: "please enter full name"});
        }
        else if (this.state.contactNumber === "") {
            this.setState({error: "please enter contact number"});
        }
        else if (this.state.shippingAddress === "") {
            this.setState({error: "please enter shipping address"});
        }
        else {
            this.setState({error: false});
            return true;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let formData = {
            fullName:        this.state.fullName,
            contactNumber:   this.state.contactNumber,
            shippingAddress: this.state.shippingAddress
        }

        if (this._validateInput()) {
            this.props.updateFormData(formData);
        }
    }

    handleChange(event, attribute) {
        let newState = this.state;
        newState[attribute] = event.target.value;
        this.setState(newState, () => console.log("file:form.js,\
                                         function: ShippingDetails.handleChange,\
                                             line:208", this.state));
    }

    render() {
        var errorMessage = this._renderError();
        var minutes = Math.floor(this.state.cartTimeout / 60);
        var seconds = this.state.cartTimeout - minutes * 60;
        console.log(this.intervals);
        return(
            <div>
                <h1>
                    enter your shipping information.
                </h1>
                {errorMessage}
                <div style={{width: 200, margin: "auto"}}>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <input
                                className    ="form-control"
                                type        ="text"
                                placeholder ="full name"
                                value       ={this.state.fullName}
                                onChange    ={(event) => this.handleChange(event, "fullName")}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className   ="form-control"
                                type        ="text"
                                placeholder ="contact number"
                                value       ={this.state.contactNumber}
                                onChange    ={(event) => this.handleChange(event, 'contactNumber')}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className   ="form-control"
                                type        ="text"
                                placeholder ="shipping address"
                                value       ={this.state.shippingAddress}
                                onChange    ={(event) => this.handleChange(event, 'shippingAddress')}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                type      ="submit"
                                ref       ="submit"
                                className ="btn btn-Success">
                                submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className="well">
                    <span className="glyphicon glyphicon-time" aria- hidden="true">
                    </span>you have {minutes} minutes, {seconds} seconds, before confirming order.
                </div>
            </div> );
    }
}

class DeliveryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delivery: "primary",
        };
    }

    handleChange(event) {
        this.setState({delivery: event.target.value}, () => console.log("file:form.js,\
                                                               function: DeliveryDetails.handleChange,\
                                                                   line:249", this.state));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.updateFormData(this.state);
    }

    render () {
        return(
                <div>
                    <h1>
                        choose your delivery options here.
                    </h1>
                    <div style={{with:200}}>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="radio">
                                <label>
                                    <input type = "radio"
                                          value = "primary"
                                        checked = {this.state.delivery ==="primary"}
                                       onChange = {this.handleChange.bind(this)}/>
                                    delivery in 1-2 days
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type = "radio"
                                          value = "normal"
                                        checked = {this.state.delivery==="normal"}
                                       onChange = {this.handleChange.bind(this)}/>
                                    delivery in 3-4 days
                                </label>
                            </div>
                            <button className="btn btn-Success">submit</button>
                        </form>
                    </div>
                </div>
        );
    }
}

class Confirmation extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.updateFormData(this.props.data);
    }

    render() {
        return(
                <div>
                    <h1>
                        are you sure to submit these datas?
                    </h1>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div>
                            <strong>full name</strong> : { this.props.data.fullName }
                        </div>
                        <br/>
                        <div>
                            <strong>contact number</strong> : { this.props.data.contactNumber }
                        </div>
                        <br/>
                        <div>
                            <strong>shipping address</strong> : { this.props.data.shippingAddress }
                        </div>
                        <br/>
                        <div>
                            <strong>selected books</strong> : { this.props.data.selectedBooks.join(",")}
                        </div>
                        <br/>
                            <button className="btn btn-Success">
                                place order
                            </button>
                    </form>
                </div>
        );
    }
}

class Success extends Component {
    constructor(props) {
        super(props);
    }

    render() {
       var numberofdays = "1 to 2";
        if (this.props.data.deliveryoption === "normal") {
            numberofdays = "3 to 4";
        }

        return(
            <div>
                <h2>
                    thank you for shopping whit us {this.props.data.fullName}.
                </h2>
                <h4>
                    you will soon get {this.props.data.selectedBooks.join(",")} at {this.props.data.shippingAddress} in approximately {numberofdays} days.
                </h4>
            </div>
        )
    }
}

let ShippingDetailsEnhance = compose(CartTimeoutEnhance, IntervalEnhance)(ShippingDetails);
export default BookStore;
