import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary'

const withErrorHandler = (WrappedComponenet,axios) => {
    return class extends Component {
        state = {error: null}

        componentDidMount () {
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }

        errorConfirmHandler = () =>  {
            this.setState({
                error : null
            })
        }
        render() {
            return (
                <Auxiliary>
                    <Modal show={this.state.error}
                    modalClosed={this.errorConfirmHandler}
                    > 
                        <p style={{textAlign: "center"}}>{this.state.error ? this.state.error.message : null}</p>
                    </Modal>
    
                    <WrappedComponenet{...this.props} />
                </Auxiliary>
            );
        }
    }
}

export default withErrorHandler;