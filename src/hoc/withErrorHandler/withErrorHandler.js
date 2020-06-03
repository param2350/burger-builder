import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary'

const withErrorHandler = (WrappedComponenet,axios) => {
    return class extends Component {
        constructor(props) {

            super(props);
    
            this.state = {
                error: null
            }
    
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })

            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }

        componentWillUnmount() {
            
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptors);
            
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