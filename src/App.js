import React,{ Component} from 'react';
import FormFilter from './components/Form/FilterForm';
import './App.css';
import axios from "axios/index";
import Base_Url from './config/BaseUrl';
class App extends Component{

    state = {
        symbols:null
    }

    componentDidMount()
    {
        axios.get(Base_Url+'symbols')
            .then(response=>{
                this.setState(state=>({
                    ...state,
                    symbols:response.data})
                )
            });
    }
    render(){
        return (
            <div className="App">
                <FormFilter symbols={this.state.symbols}/>
            </div>
        );
    }

}

export default App;
