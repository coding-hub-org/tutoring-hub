import React from 'react';
import './Review.css';

import NavBar from '../../Components/NavBar/NavBar';
import Title from '../../Components/Title/Title';
import QuestionTile from '../../Components/QuestionTile/QuestionTile';
import Subheading from '../../Components/Subheading/Subheading';
// import Course from '../../Components/Course/Course';

class Review extends React.Component {


    state = {
        author: "Anonymous",
        course: "BIO 102",
        content: undefined,
        methodology: undefined,
        organization: undefined,
        preparation: undefined,
        clarity: undefined,
        knowlege: undefined,
    }


    handleClick = () => {
        const {author, course, content, methodology, organization, preparation, clarity, knowlege} = this.state;
        if (author && course && content && methodology && organization && preparation && clarity && knowlege) {
            const url = this.props.match.url;
            const data = {
                "author": author,
                "course": course,
                "content": content,
                "statistics": {
                    "methodology":  methodology,
                    "organization":  organization,
                    "preparation": preparation,
                    "clarity":  clarity,
                    "knowlege":  knowlege
                }
            }
            fetch(`http://137.142.172.24:3001${url.substring(0, url.lastIndexOf("/"))}`, {
            method: 'PUT', 
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
            }).then(res => res.json())
            .then(response => {
                console.log('Success')
                window.location.href = "/";
            })
            .catch(error => console.error('Error:', error));
        }
        else {console.log("ERROR", this.state)};
    }

    updateStats = (score) => {
        const cathegory = score.target.name;
        switch(cathegory) {
            case 'methodology':
                this.setState({
                    methodology: Number(score.target.value)
                });
                break;
            case 'organization':
                this.setState({
                    organization: Number(score.target.value)
                });
                break;
            case 'preparation':
                this.setState({
                    preparation: Number(score.target.value)
                });
                break;
            case 'clarity':
                this.setState({
                    clarity: Number(score.target.value)
                });
                break;
            default:
                this.setState({
                    knowlege: score.target.value
                });
                break;
        }
    }

    handleComment = (e) => {
        this.setState({
            content: e.target.value
        });
    }

    handleChange = (e) => {
        console.log(e.target.value);
    }
    
    render() {
        return(
            <div className={'review-section'}>
                <NavBar/>  
                <div className={'review-section--wrapper'}>
                    <Title title={'Rate Gaurav'}/>

                    <QuestionTile parameter={"methodology"} updateStats={this.updateStats} />
                    <QuestionTile parameter={"organization"} updateStats={this.updateStats} />
                    <QuestionTile parameter={"preparation"} updateStats={this.updateStats} />
                    <QuestionTile parameter={"clarity"} updateStats={this.updateStats} />
                    <QuestionTile parameter={"knowlege"} updateStats={this.updateStats} />

                    <Subheading title={'About your session'}/>
                    <div>
                        <p>Would you book this tutor again? </p>
                        <div onChange={this.handleChange} className={"review-section--bookagain"}>   
                                <input type="radio" className={"option-input radio"} value="yes" name="book-again" />
                            <label>
                                YES
                            </label>
                                <input type="radio" className={"option-input radio"} value="no" name={"book-again"} />
                            <label>
                                NO
                            </label>
                        </div>
                
                    </div>
                    <p>Class tutored </p>
                    <Subheading title={'Comments'}/>
                    <textarea onChange={this.handleComment} placeholder={"How was your session? Help this tutor to improve "}></textarea>
                    <button onClick={this.handleClick}>SUBMIT REVIEW</button>
                </div>        
            </div>
        );
    }
}

export default Review;