import React, { Component } from 'react';
import './RatingBar.css';
class RatingBar extends Component{
    state={
        selectedOption: 0
    }
    handleOptionChange=(e)=>{
        if (parseInt(e.target.value,10) !== this.state.selectedOption) 
            this.setState({selectedOption: parseInt(e.target.value,10)});
        else
            this.setState({selectedOption: 0});
        }
    render(){
        const barLabel = this.props.barLabel || "label";
        return(
            <div id="rating-bar-form">
                <div id="rating-bar-label">
                   {barLabel}
                </div>
                <div>
                    <form id="rating-bar">
                        <input type="checkbox" value={1} checked={this.state.selectedOption >= 1} 
                        onChange={this.handleOptionChange}></input>  
                        <input type="checkbox" value={2} checked={this.state.selectedOption >= 2} 
                        onChange={this.handleOptionChange}></input>  
                        <input type="checkbox" value={3} checked={this.state.selectedOption >= 3} 
                        onChange={this.handleOptionChange}></input>  
                        <input type="checkbox" value={4} checked={this.state.selectedOption >= 4} 
                        onChange={this.handleOptionChange}></input>  
                        <input type="checkbox" value={5} checked={this.state.selectedOption >= 5} 
                        onChange={this.handleOptionChange}></input>  
                        <input type="checkbox" value={6} checked={this.state.selectedOption >= 6} 
                        onChange={this.handleOptionChange}></input>
                        <input type="checkbox" value={7} checked={this.state.selectedOption >= 7} 
                        onChange={this.handleOptionChange}></input>  
                        <input type="checkbox" value={8} checked={this.state.selectedOption >= 8} 
                        onChange={this.handleOptionChange}></input>  
                        <input type="checkbox" value={9} checked={this.state.selectedOption >= 9} 
                        onChange={this.handleOptionChange}></input>  
                        <input type="checkbox" value={10} checked={this.state.selectedOption >= 10} 
                        onChange={this.handleOptionChange}></input> 
                        {this.state.selctedOption} 
                    </form>
                </div>
            </div>
        )
    }
}
export default RatingBar;