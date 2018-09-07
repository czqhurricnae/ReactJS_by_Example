import React, {Component} from 'react'

export var IntervalEnhance = ComposeComponent => class extends Component{
    static displayName = "ComponentEnhanceWithIntervalHOC";

    constructor(props) {
        super(props);
        this.inject = this.inject.bind(this);
    }

    componentWillMount() {
        this.intervals = [];
        console.log('IntervalEnhance.componentWillMount');
    }

    componentDidMount() {
        console.log('IntervalEnhance.componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        console.log('IntervalEnhance.componentWillReceiveProps');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('IntervalEnhance.shouldComponentUpdate');
        return true;
    }

    componentWillUpdate() {
        console.log('IntervalEnhance.componentWillUpdate');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('IntervalEnhance.componentDidUpdate')
    }

    componentWillUnmount() {
        console.log('IntervalEnhance.componentWillUnmount')
        this.intervals.map(clearInterval);
    }

   inject(func, argument) {
            this.intervals.push(setInterval(func, argument));
        }

    render() {
        return (<ComposeComponent {...this.props} {...this.state} inject={this.inject}/>);
    }
}

export var CartTimeoutEnhance = ComposeComponent => class extends Component {
    static displayName = "ComponentEnhanceWithCartTimeoutHOC";

    constructor(props) {
        super(props);
        this.state = {cartTimeout: this.props.cartTimeout};
    }

    componentWillMount() {
        console.log('CartTimeoutEnhance.componentWillMount');
    }

    componentDidMount() {
        this.props.inject(this.decrementCartTime, 1000);
        console.log('CartTimeoutEnhance.componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        console.log('CartTimeoutEnhance.componentWillReceiveProps');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('CartTimeoutEnhance.shouldComponentUpdate');
        return true;
    }

    componentWillUpdate() {
        console.log('CartTimeoutEnhance.componentWillUpdate');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('CartTimeoutEnhance.componentDidUpdate')
    }

    componentWillUnmount() {
        console.log('CartTimeoutEnhance.componentWillUnmount')
    }

    decrementCartTimer() {
        if (this.state.cartTimeout == 0) {
            this.props.alertCartTimeout();
            return;
        }
        else {
            this.setState({cartTimeout: this.state.cartTimeout - 1});
        }
    }

   render() {
        return (<ComposeComponent {...this.props} {...this.state}/>);
    }
}
