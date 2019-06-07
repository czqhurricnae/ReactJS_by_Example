import React, {Component} from "react";
import ReactDOM from "react-dom";


export default class AlertTimeoutModal extends Component {
    constructor (props) {
        super(props);
        this._unMountComponent = this._unMountComponent.bind(this);
    }

    _unMountComponent () {
        this.props.resetCartTimeout();
    }

    render() {
        return (
            <div className="modal fade show" tabIndex="-1" style={{display: "block"}} ref={(div) => this.timeoutModals = div}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Timeout</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this._unMountComponent}>
                            <span aria-hidden="true">x</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>The cart has timed-out, Please try again.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
