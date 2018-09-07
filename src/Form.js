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

    _renderswitch(step, callback) {
        switch(step) {
        case 1: return <booklist updateformdata={callback}/>;
        case 2: return <shippingdetails updateformdata={callback} carttimeout = {this.state.carttimeout}/>;
        case 3: return <deliverydetails updateformdata={callback}/>;
        case 4: return <confirmation updateformdata={callback} data={this.state.formvalues}/>;
        case 5: return <success data={this.state.formvalues}/>;
        default: return <booklist updateformdata={callback}/>;
        }
    }

    /**
     * @param
     *   formdata:  子组件传回来的数据
     * @param
     *   formvalues:  父组件存储子组件的数据
     */
    _updateformdata(formdata) {
        let formvalues = object.assign({}, formdata, this.state.formvalues);
        let nextstep = this.state.currentstep + 1;
        this.setstate({formvalues: formvalues, currentstep: nextstep}, () =>
                      console.log("file:form.js,\
                               function: bookstore._updateformdata,\
                                   line:34",this.state));
    }

    render() {
        return(<div>
               {this._renderswitch(this.state.currentstep, this._updateformdata)}
               </div>
              );
    }
}

export class booklist extends component {
    constructor(props) {
        super(props);
        this.state = {
            books: [
                {id:1, name: 'zero to one', author: 'peter thiel' },
                {id:2, name: 'monk who sold his ferrari', author: 'robin sharma' },
                {id:3, name: 'wings of fire', author: 'a.p.j. abdul kalam' }
            ],
            selectedbooks:[],
            error: false,
        };
    }

    _renderbook(book) {
        return(
                <div classname="checkbox" key={book.id}>
                <label>
                <input type="checkbox"
                value={book.name}
                onchange={this.handleselectedbooks.bind(this)}/>
                        {book.name}-{book.author}
                </label>
            </div>
        );
    }

    _rendererror() {
        if (this.state.error) {
            return(
                    <div classname="alert alert-danger">
                        {this.state.error}
                    </div>
            );
        }
    }

    handleselectedbooks(event) {
        let selectedbooks = this.state.selectedbooks;
        let index = selectedbooks.indexof(event.target.value);

        if(event.target.checked) {
            if(-1 === index) {
                selectedbooks.push(event.target.value);
            }
        }
        else {
            selectedbooks.splice(index, 1);
        }

        this.setstate({selectedbooks: selectedbooks}, () =>
                      console.log("file:form.js,\
                               function: booklist.handleselectedbooks,\
                                   line:96", this.state));
    }

    handlesubmit(event) {
        event.preventdefault();
        if (0 === this.state.selectedbooks.length) {
            this.setstate({error: "please choose at lease one book to continue!"});
        }
        else {
            this.setstate({error: false});
            this.props.updateformdata({"selectedbooks": this.state.selectedbooks});
        }
    }

    render() {
        let errormessage = this._rendererror();
        return(<div>
                   <h3>
                       choose fromwide variety of books available in our store.
                   </h3>
                   {errormessage}
                   <form onsubmit={this.handlesubmit.bind(this)}>
                       {
                           this.state.books.map((book) => {
                               return(this._renderbook(book));
                           })
                       }
                       <input type="submit" classname="btn btn-success"/>
                   </form>
                </div>
        );
    }
}

export class shippingdetails1 extends component {
    constructor(props) {
        super(props);
        this.state = {
                      fullname:        "",
                      contactnumber:   "",
                      shippingaddress: "",
                      error:           false};
    }

    componentdidmount() {
       this.setstate({carttimeout: this.props.carttimeout});
    }

    _rendererror() {
        if (this.state.error) {
            return(<div classname="alert alert-danger">
                       {this.state.error}
                   </div> );
        }
    }

    _validateinput() {
        if (this.state.fullname === "") {
            this.setstate({error: "please enter full name"});
        }
        else if (this.state.contactnumber === "") {
            this.setstate({error: "please enter contact number"});
        }
        else if (this.state.shippingaddress === "") {
            this.setstate({error: "please enter shipping address"});
        }
        else {
            this.setstate({error: false});
            return true;
        }
    }

    handlesubmit(event) {
        event.preventdefault();
        let formdata = {
            fullname:        this.state.fullname,
            contactnumber:   this.state.contactnumber,
            shippingaddress: this.state.shippingaddress
        }

        if (this._validateinput()) {
            this.props.updateformdata(formdata);
        }
    }

    handlechange(event, attribute) {
        let newstate = this.state;
        newstate[attribute] = event.target.value;
        this.setstate(newstate, () => console.log("file:form.js,\
                                         function: shippingdetails.handlechange,\
                                             line:208", this.state));
    }

    render() {
        var errormessage = this._rendererror();
        var minutes = math.floor(this.state.carttimeout / 60);
        var seconds = this.state.carttimeout - minutes * 60;
        console.log(this.intervals);
        return(
            <div>
                <h1>
                    enter your shipping information.
                </h1>
                {errormessage}
                <div style={{width: 200, margin: "auto"}}>
                    <form onsubmit={this.handlesubmit.bind(this)}>
                        <div classname="form-group">
                            <input
                                classname    ="form-control"
                                type        ="text"
                                placeholder ="full name"
                                value       ={this.state.fullname}
                                onchange    ={(event) => this.handlechange(event, "fullname")}
                            />
                        </div>
                        <div classname="form-group">
                            <input
                                classname   ="form-control"
                                type        ="text"
                                placeholder ="contact number"
                                value       ={this.state.contactnumber}
                                onchange    ={(event) => this.handlechange(event, 'contactnumber')}
                            />
                        </div>
                        <div classname="form-group">
                            <input
                                classname   ="form-control"
                                type        ="text"
                                placeholder ="shipping address"
                                value       ={this.state.shippingaddress}
                                onchange    ={(event) => this.handlechange(event, 'shippingaddress')}
                            />
                        </div>
                        <div classname="form-group">
                            <button
                                type      ="submit"
                                ref       ="submit"
                                classname ="btn btn-success">
                                submit
                            </button>
                        </div>
                    </form>
                </div>
                <div classname="well">
                    <span classname="glyphicon glyphicon-time" aria- hidden="true">
                    </span>you have {minutes} minutes, {seconds} seconds, before confirming order.
                </div>
            </div> );
    }
}

let shippingdetails = compose(carttimeoutenhance, intervalenhance)(shippingdetails1);

    class deliverydetails extends component {
    constructor(props) {
        super(props);
        this.state = {
            delivery: "primary",
        };
    }

    handlechange(event) {
        this.setstate({delivery: event.target.value}, () => console.log("file:form.js,\
                                                               function: deliverydetails.handlechange,\
                                                                   line:249", this.state));
    }

    handlesubmit(event) {
        event.preventdefault();
        this.props.updateformdata(this.state);
    }

    render () {
        return(
                <div>
                    <h1>
                        choose your delivery options here.
                    </h1>
                    <div style={{with:200}}>
                        <form onsubmit={this.handlesubmit.bind(this)}>
                            <div classname="radio">
                                <label>
                                    <input type = "radio"
                                          value = "primary"
                                        checked = {this.state.delivery ==="primary"}
                                       onchange = {this.handlechange.bind(this)}/>
                                    delivery in 1-2 days
                                </label>
                            </div>
                            <div classname="radio">
                                <label>
                                    <input type = "radio"
                                          value = "normal"
                                        checked = {this.state.delivery==="normal"}
                                       onchange = {this.handlechange.bind(this)}/>
                                    delivery in 3-4 days
                                </label>
                            </div>
                            <button classname="btn btn-success">submit</button>
                        </form>
                    </div>
                </div>
        );
    }
}

class confirmation extends component {
    constructor(props) {
        super(props);
    }

    handlesubmit(event) {
        event.preventdefault();
        this.props.updateformdata(this.props.data);
    }

    render() {
        return(
                <div>
                    <h1>
                        are you sure to submit these datas?
                    </h1>
                    <form onsubmit={this.handlesubmit.bind(this)}>
                        <div>
                            <strong>full name</strong> : { this.props.data.fullname }
                        </div>
                        <br/>
                        <div>
                            <strong>contact number</strong> : { this.props.data.contactnumber }
                        </div>
                        <br/>
                        <div>
                            <strong>shipping address</strong> : { this.props.data.shippingaddress }
                        </div>
                        <br/>
                        <div>
                            <strong>selected books</strong> : { this.props.data.selectedbooks.join(",")}
                        </div>
                        <br/>
                            <button classname="btn btn-success">
                                place order
                            </button>
                    </form>
                </div>
        );
    }
}

class success extends component {
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
                    thank you for shopping whit us {this.props.data.fullname}.
                </h2>
                <h4>
                    you will soon get {this.props.data.selectedbooks.join(",")} at {this.props.data.shippingaddress} in approximately {numberofdays} days.
                </h4>
            </div>
        )
    }
}

export default bookstore;
