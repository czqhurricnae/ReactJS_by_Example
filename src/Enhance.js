import React from 'react'

export var IntervalEnhance = ComposeComponent => class extends ComposeComponent {
    static displayName = "ComponentEnhanceWithIntervalHOC";

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.intervals = [];

    }

    inject(func, argument) {
        this.intervals.push(setInterval(func, argument));
    }

    componentWillUnmount() {
        this.intervals.map(clearInterval);
    }

    render() {
        return (<ComposeComponent {...this.props} {...this.state}/>);
    }
}

export var CartTimeoutEnhance = ComposeComponent => class extends ComposeComponent {
    static displayName = "ComponentEnhanceWithCartTimeoutHOC";

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.inject(this.decrementCartTime, 1000);
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
