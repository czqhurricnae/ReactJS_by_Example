import React, {Component} from "react";
import AlertTimeoutModal from "./AlertTimeoutModal";


export var IntervalEnhance = ComposeComponent => class extends Component{
    static displayName = "ComponentEnhanceWithIntervalHOC";

    constructor (props) {
        super(props);
        this.inject = this.inject.bind(this);
    }

    componentWillMount () {
        console.log("IntervalEnhance.componentWillMount");
        this.intervals = [];
    }

    componentDidMount () {
        console.log("IntervalEnhance.componentDidMount");
    }

    componentWillReceiveProps (nextProps) {
        console.log("IntervalEnhance.componentWillReceiveProps");
    }

    shouldComponentUpdate (nextProps, nextState) {
        console.log("IntervalEnhance.shouldComponentUpdate");
        return true;
    }

    componentWillUpdate () {
        console.log("IntervalEnhance.componentWillUpdate");
    }

    componentDidUpdate (prevProps, prevState) {
        console.log("IntervalEnhance.componentDidUpdate")
    }

    componentWillUnmount () {
        console.log("IntervalEnhance.componentWillUnmount")
        this.intervals.map(clearInterval);
    }

    inject(func, argument) {
        console.log("IntervalEnhance.inject");
        this.intervals.push(setInterval(func, argument));
    }

    render() {
        console.log("IntervalEnhance.render");
        return (<ComposeComponent inject={this.inject} intervals={this.intervals} {...this.props} {...this.state}/>);
    }
}

export var CartTimeoutEnhance = ComposeComponent => class extends Component {
    static displayName = "ComponentEnhanceWithCartTimeoutHOC";

    constructor (props) {
        super(props);
        this.state = {cartTimeout: this.props.cartTimeout};
    }

    componentWillMount () {
        console.log("CartTimeoutEnhance.componentWillMount");
    }

    componentDidMount () {
        console.log("CartTimeoutEnhance.componentDidMount");
        this.props.inject(this.decrementCartTimer.bind(this), 1000);
    }

    componentWillReceiveProps (nextProps) {
        console.log("CartTimeoutEnhance.componentWillReceiveProps");
    }

    shouldComponentUpdate (nextProps, nextState) {
        console.log("CartTimeoutEnhance.shouldComponentUpdate");
        return true;
    }

    componentWillUpdate () {
        console.log("CartTimeoutEnhance.componentWillUpdate");
    }

    componentDidUpdate (prevProps, prevState) {
        console.log("CartTimeoutEnhance.componentDidUpdate")
    }

    componentWillUnmount () {
        console.log("CartTimeoutEnhance.componentWillUnmount")
    }

    decrementCartTimer() {
        console.log("CartTimeoutEnhance.decrementCartTimer");
        if (this.state.cartTimeout == 0) {
            this.props.alertCartTimeout();
            this.props.intervals.map(clearInterval);
        }
        else {
            this.setState({cartTimeout: this.state.cartTimeout - 1});
        }
    }

    render() {
        console.log("CartTimeoutEnhance.render");
        return (<ComposeComponent {...this.props} {...this.state}/>);
    }
}

/* export function IntervalEnhance(WrappedComponent) {
 *     return class extends Component {
 *         constructor (props) {
 *             super(props);
 *             this.inject = this.inject.bind(this);
 *         }
 *
 *         componentWillMount () {
 *             this.intervals = [];
 *         }
 *
 *         componentWillUnMount() {
 *             this.intervals.map(clearInterval);
 *         }
 *
 *         inject(func, arg) {
 *             this.intervals.push(setInterval(func, arg));
 *         }
 *
 *         render() {
 *             return <WrappedComponent inject={this.inject} {...this.props} {...this.state}/>;
 *
 *         }
 *     }
 * }
 *
 * export function CartTimeoutEnhance(WrappedComponent) {
 *     return class extends Component {
 *         constructor (props) {
 *             super(props);
 *             this.state = {cartTimeout: this.props.cartTimeout};
 *         }
 *
 *         componentDidMount () {
 *             this.props.inject(this.decrementCartTimer.bind(this), 1000);
 *         }
 *
 *         decrementCartTimer() {
 *             if (this.state.cartTimeout == 0) {
 *                  this.props.alertCartTimeout();
 *                  return;
 *             }
 *             else {
 *                 this.setState({cartTimeout: this.state.cartTimeout - 1});
 *                 console.log(this.state.cartTimeout);
 *             }
 *         }
 *
 *        render() {
 *             return <WrappedComponent {...this.props} {...this.state}/>;
 *         }
 *
 *     }
 * } */
