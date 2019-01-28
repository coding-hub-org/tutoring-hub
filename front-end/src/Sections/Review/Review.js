import React from 'react';
import './Review.css';

import NavBar from '../../Components/NavBar/NavBar';
import Title from '../../Components/Title/Title';
import Questions from '../../Components/Questions/Questions';
import Subheading from '../../Components/Subheading/Subheading';
// import Course from '../../Components/Course/Course';

class Review extends React.Component {

    state = {
        author: "Anonymous",
        course: "BIO 102",
        content: undefined,
        overall: 0
    }

    handleClick = () => {
        let url = this.props.match.url;
        const {author, course, content, overall} = this.state;
        if (author && course && content && overall) {
            fetch(`http://localhost:3001${url.substring(0, url.lastIndexOf("/"))}`, {
            method: 'PUT', 
            body: JSON.stringify(this.state), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
            }).then(res => res.json())
            .then(response => console.log('Success'))
            .catch(error => console.error('Error:', error));
        } else {
            console.log(author, course, content, overall);
        }
    }

    updateStatsState = (stats) => {

        if (!stats.includes(undefined)) {
            console.log("CALLED")
            const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
            const total = average(stats);
            console.log(total);
        }
    }

    handleComment = (e) => {
        this.setState({
            content: e.target.value
        });
    }


    render() {
        return(
            <div className={'review-section'}>
                <NavBar/>  
                <div className={'review-section--wrapper'}>
                    <Title title={'Rate Gaurav'}/>
                    <Questions updateStatsState={this.updateStatsState}/>             
                    <Subheading title={'About your session'}/>
                    <div>
                        <p>Would you book this tutor again? </p>
                        <div className={"review-section--wrapper__bookagain"}>     
                            <div>
                                <p>YES</p> 
                                <span></span>
                            </div>
                            <div>
                                <p>NO</p> 
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <p>Class tutored </p>
                    <Subheading title={'Comments (Optional)'}/>
                    <textarea onChange={this.handleComment}></textarea>
                    <button onClick={this.handleClick}>SUBMIT REVIEW</button>
                </div>        
            </div>
        );
    }
}

export default Review;